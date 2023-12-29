import PropTypes from "prop-types"
import React, { useRef, useEffect, useState } from "react"
import { Container, Row, Col, Card } from "reactstrap"
import { withTranslation } from "react-i18next"
import {
  getStrikePrice,
  geIntradayDataLimit,
  shortGraphList,
  shortProductListDataList,
  fnoranking,
} from "services/api/api-service"
import CardDrag from "./components/CardDrag"
import dragula from "dragula"
import _, { isEmpty, result, set } from "lodash"
import BarChart from "../AllCharts/barchart"
import BuildBarChart from "../AllCharts/buildBarChart"
import IntradayTableDeshboad from "../../components/Common/derivativesComponent/IntradayTableDeshboad"
const Dashboard = props => {
  document.title = "Dashboard | Trendsarthi- React Admin & Dashboard Template"
  const [nifty, setNifty] = useState({})
  const [bankNifty, setBankNifty] = useState({})
  const [intradayList, setintradayList] = useState([])
  const [intradayListBank, setintradayListBank] = useState([])
  const [ProductData, setProductData] = useState([])
  const [ProductName, setProductName] = useState([])
  const [ProductDataOption, setProductDataOption] = useState([])
  const [ioData, setIoData] = useState([])
  const [LabelName, setLabelName] = useState([])
  const [ioDataPrice, setIoDataPrice] = useState([])
  const [ProductNameOption, setProductNameOption] = useState([])
  const [typeFilter, setTypeFilter] = useState("Long Buildup")
  const [typeOIpriceFilter, setTypeOIpriceFilter] = useState("Long Unwinding")
  const [fetureBuild] = useState(["Long Buildup", "Short Buildup"])
  const [fetureIO] = useState(["Long Unwinding", "Short Covering"])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const niftyResult = await getStrikePrice("NIFTY")
        if (!_.isEmpty(niftyResult)) {
          setNifty(niftyResult.StrikePrice)
        }
        const bankNiftyResult = await getStrikePrice("BANKNIFTY")
        if (!_.isEmpty(bankNiftyResult)) {
          setBankNifty(bankNiftyResult.StrikePrice)
          console.log("BANKNIFTY", bankNiftyResult.StrikePrice)
        }
        getIntraday("NIFTY", setintradayList)
        getIntraday("BANKNIFTY", setintradayListBank)
        console.log("NIFTY List", intradayList)
        console.log("BANKNIFTY List", intradayListBank)
        const shortGraphResult = await shortGraphList()
        if (!isEmpty(shortGraphResult)) {
          const data = shortGraphResult.map(item => item.OPEN - item.CLOSE)
          const label = shortGraphResult.map(item => item.INSTRUMENTIDENTIFIER)
          setProductName(label)
          setProductData(data)
          console.log(ProductData)
          console.log(ProductName)
        }
        const rankingResult = await fnoranking()
        console.log("list data", rankingResult)
        getProductFilter(typeFilter)
        getOIFilter(typeOIpriceFilter)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
    const intervalId = setInterval(fetchData, 10000)
    dragula([
      document.getElementById("left"),
      document.getElementById("right"),
      document.getElementById("left1"),
      document.getElementById("right2"),
      document.getElementById("left3"),
      document.getElementById("right3"),
    ])
    return () => clearInterval(intervalId)
  }, [fetureBuild, typeFilter, typeOIpriceFilter]) // Include relevant dependencies

  function getIntraday(type, list) {
    geIntradayDataLimit(type, 5)
      .then(result => {
        if (!_.isEmpty(result)) {
          const IntraDay = []
          result.map(item => {
            IntraDay.push({
              time: item.time,
              call: item.callTotal,
              put: item.putTotal,
              difference: Number(item.putTotal) - Number(item.callTotal),
              pcr: (Number(item.putTotal) / Number(item.callTotal)).toFixed(2),
              optionSignal:
                Number(Number(item.putTotal) / Number(item.callTotal)).toFixed(
                  2
                ) > 0.5
                  ? "BUY"
                  : "SELL",
              vwap: item.AVERAGETRADEDPRICE,
              price: item.BUYPRICE,
              vwapSignal:
                Number(
                  Number(item.AVERAGETRADEDPRICE) < Number(item.BUYPRICE)
                ).toFixed(2) > 0.5
                  ? "BUY"
                  : "SELL",
            })
          })
          list(IntraDay)
        }
      })
      .catch(err => {
        console.error("Error fetching getStrikePrice:", err)
      })
  }
  function getProductFilter(type) {
    shortProductListDataList().then(result => {
      if (!isEmpty(result)) {
        const data = []
        const dataPrice = []
        const dataOIPrice = []
        const label = []
        console.log("result", result)
        // Assuming result is an array of objects with properties OPEN, CLOSE, and INSTRUMENTIDENTIFIER
        result.forEach(item => {
          data.push(item.OPEN - item.CLOSE)
          dataPrice.push(item.SELLPRICE - item.BUYPRICE)
          label.push(item.INSTRUMENTIDENTIFIER)
        })
        const productList2 = dataPrice.map((value, index) => ({
          oiPrice: dataOIPrice[index],
          data: value,
          label: label[index],
        }))
        // Create an array of objects with data and label properties
        const productList = data.map((value, index) => ({
          data: value,
          label: label[index],
        }))

        // Sort the array in ascending order based on the 'data' property
        const sortedAsc = productList.slice().sort((a, b) => a.data - b.data)

        // Get the top 10 items in ascending order
        const top10Asc = sortedAsc.slice(0, 10)

        // Sort the array in descending order based on the 'data' property
        const sortedDesc = productList.slice().sort((a, b) => b.data - a.data)

        // Get the top 10 items in descending order
        const top10Desc = sortedDesc.slice(0, 10)
        const sortedAscPrice = productList2
          .slice()
          .sort((a, b) => a.data - b.data)
        const top10AscPrice = sortedAscPrice.slice(0, 10)
        const sortedDescPrice = productList2
          .slice()
          .sort((a, b) => b.data - a.data)
        const top10DescPrice = sortedDescPrice.slice(0, 10)

        if (type === "Long Buildup") {
          setProductDataOption(top10Desc.map(item => item.data))
          setProductNameOption(top10Desc.map(item => item.label))
        } else if (type === "Short Buildup") {
          setProductNameOption(top10Asc.map(item => item.label))
          setProductDataOption(top10Asc.map(item => item.data))
        } else if (type === "Short Covering") {
          setProductDataOption(top10AscPrice.map(item => item.data))
          setProductNameOption(top10AscPrice.map(item => item.label))
        } else if (type === "Long Unwinding") {
          setProductDataOption(top10DescPrice.map(item => item.data))
          setProductNameOption(top10DescPrice.map(item => item.label))
        }
      }
    })
  }
  function getOIFilter(type) {
    shortProductListDataList().then(result => {
      if (!isEmpty(result)) {
        const iO = []
        const iOChange = []
        const label = []
        console.log("result", result)
        // Assuming result is an array of objects with properties OPEN, CLOSE, and INSTRUMENTIDENTIFIER
        result.forEach(item => {
          iO.push(item.OPEN)
          iOChange.push(item.SELLPRICE)
          label.push(item.INSTRUMENTIDENTIFIER)
        })
        // Create an array of objects with data and label properties
        const productList = iOChange.map((value, index) => ({
          iO: value,
          iOChange: iOChange[index],
          label: label[index],
        }))

        // Sort the array in ascending order based on the 'data' property
        const sortedAsc = productList.slice().sort((a, b) => a.iO - b.iO)

        // Get the top 10 items in ascending order
        const top10Asc = sortedAsc.slice(0, 10)

        // Sort the array in descending order based on the 'data' property
        const sortedDesc = productList.slice().sort((a, b) => b.iO - a.iO)

        // Get the top 10 items in descending order
        const top10Desc = sortedDesc.slice(0, 10)
        if (type === "Short Covering") {
          setIoData(top10Asc.map(item => item.iO))
          setIoDataPrice(top10Asc.map(item => item.iOChange))
          setLabelName(top10Asc.map(item => item.label))
        } else if (type === "Long Unwinding") {
          setIoData(top10Desc.map(item => item.iO))
          setIoDataPrice(top10Asc.map(item => item.iOChange))
          setLabelName(top10Desc.map(item => item.label))
        }
      }
    })
  }
  const buildHandler = type => {
    setTypeFilter(type)
    getProductFilter(type)
  }
  const buildIOHandler = type => {
    setTypeOIpriceFilter(type)
    getOIFilter(type)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="card border-bottom">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <div className="me-3"></div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2 h1 bold text-gradient">
                          Welcome to Trendsarthi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-self-center col-lg-4">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <div className="row">
                      <div className="col-6">
                        <div>
                          <p className="text-muted text-truncate mb-2 h5">
                            Nifty Index
                          </p>
                          <h5 className="mb-0">{nifty.value}</h5>
                        </div>
                      </div>
                      <div className="col-6">
                        <div>
                          <p className="text-muted text-truncate mb-2 h5">
                            BankNifty Index
                          </p>
                          <h5 className="mb-0">{bankNifty.value}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col md={6} id="right">
              <CardDrag header={"Nifty Intraday Data"}>
                <IntradayTableDeshboad data={intradayList} />
              </CardDrag>
            </Col>
            <Col md={6} id="left">
              <CardDrag header={"Bank Nifty Intraday Data"}>
                <IntradayTableDeshboad data={intradayListBank} />
              </CardDrag>
            </Col>

            <Col md={6} id="left2">
              <CardDrag header={"Product Movment Chart"}>
                {fetureBuild.map(item => (
                  <button
                    type="button"
                    className="btn btn-info m-1"
                    onClick={e => buildHandler(item)}
                  >
                    {item}
                  </button>
                ))}
                <BarChart
                  ProductName={ProductNameOption}
                  Productdata={ProductDataOption}
                />
              </CardDrag>
            </Col>
            <Col md={6} id="left2">
              <CardDrag header={"Option Movment Chart"}>
                <BarChart ProductName={ProductName} Productdata={ProductData} />
              </CardDrag>
            </Col>
            <Col md={12} id="right2">
              <CardDrag header={"Movment Chart"}>
                {fetureIO.map(item => (
                  <button
                    type="button"
                    className="btn btn-info m-1"
                    onClick={e => buildIOHandler(item)}
                  >
                    {item}
                  </button>
                ))}
                <BuildBarChart
                  dataLabel={LabelName}
                  dataIOPrice={ioData}
                  dataIOPriceChange={ioDataPrice}
                  titleName={"Product Movment Chart"}
                  horizontal={true}
                  dataColors='["#643c9d","#cfbfe3"]'
                />
              </CardDrag>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
