import PropTypes from "prop-types"
import React, { useRef, useEffect, useState } from "react"
import { Container, Row, Col, Card } from "reactstrap"
import { withTranslation } from "react-i18next"
import {
  getStrikePrice,
  geIntradayDataLimit,
  shortGraphList,
  shortProductListDataList,
} from "services/api/api-service"
import CardDrag from "./components/CardDrag"
import dragula from "dragula"
import _, { isEmpty, result, set } from "lodash"
import BarChart from "../AllCharts/barchart"
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
  const [ProductNameOption, setProductNameOption] = useState([])
  const [fetureBuild] = useState([
    "Long Buildup",
    "Short Buildup",
    "Long Unwinding",
    "Short Covering",
  ])
  useEffect(() => {
    // Define your function to be called every 1 minute
    const yourFunction = () => {
      getStrikePrice("NIFTY").then(result => {
        setNifty(result.StrikePrice)
        console.log("NIFTY", result.StrikePrice)
      })
      getStrikePrice("BANKNIFTY").then(result => {
        setBankNifty(result.StrikePrice)
        console.log("BANKNIFTY", result.StrikePrice)
      })
      getIntraday("NIFTY", setintradayList)
      getIntraday("BANKNIFTY", setintradayListBank)
      console.log("NIFTY List", intradayListBank)
      console.log("BANKNIFTY List", intradayList)
      shortGraphList().then(result => {
        if (!isEmpty(result)) {
          const data = []
          const label = []
          console.log("short Image", result)
          result.map(item => {
            data.push(item.OPEN - item.CLOSE)
            label.push(item.INSTRUMENTIDENTIFIER)
          })
          setProductName(label)
          setProductData(data)
          console.log(ProductData)
          console.log(ProductName)
        }
      })
    }
    yourFunction()
    const intervalId = setInterval(yourFunction, 10000)
    return () => clearInterval(intervalId)
  }, [fetureBuild])
  useEffect(() => {
    dragula([document.getElementById("left"), document.getElementById("right")])
  }, [])
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
        const label = []

        // Assuming result is an array of objects with properties OPEN, CLOSE, and INSTRUMENTIDENTIFIER
        result.forEach(item => {
          data.push(item.OPEN - item.CLOSE)
          label.push(item.INSTRUMENTIDENTIFIER)
        })

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

        // Use top10Asc and top10Desc as needed
        console.log("Top 10 Ascending:", top10Asc)
        console.log("Top 10 Descending:", top10Desc)
        // Assuming setProductName and setProductData are state-setting functions
        setProductNameOption(top10Asc.map(item => item.label))
        if (type === "Long Buildup") {
          setProductDataOption(top10Desc.map(item => item.data))
        } else if (type === "Short Buildup") {
          setProductDataOption(top10Asc.map(item => item.data))
        }
      }
    })
  }
  const buildHandler = type => {
    getProductFilter(type)
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
          </Row>
          <Row>
            <Col md={6}>
              <CardDrag header={"Movment Chart"}>
                <BarChart ProductName={ProductName} Productdata={ProductData} />
              </CardDrag>
            </Col>
            <Col md={6}>
              <CardDrag header={"IO Chart"}>
                {fetureBuild.map(item => (
                  <button
                    type="button"
                    className="btn btn-info m-1"
                    onClick={() => buildHandler(item)}
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
