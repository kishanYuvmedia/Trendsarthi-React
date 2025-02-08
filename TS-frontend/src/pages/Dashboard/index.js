import PropTypes from "prop-types"
import React, { useRef, useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap"
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
import ProgressBar from "components/Common/ProgressBar"
import BuildBarChart from "../AllCharts/buildBarChart"
import BoxNavMob from "./components/BoxNavMob"
const Dashboard = props => {
  document.title = "Dashboard | Trendsarthi"
  const [nifty, setNifty] = useState({})
  const [bankNifty, setBankNifty] = useState({})
  const [intradayList, setintradayList] = useState([])
  const [intradayListBank, setintradayListBank] = useState([])
  const [ProductData, setProductData] = useState([])
  const [ProductName, setProductName] = useState([])
  const [ioData, setIoData] = useState([])
  const [LabelName, setLabelName] = useState([])
  const [ioDataPrice, setIoDataPrice] = useState([])
  const [typeOIpriceFilter, setTypeOIpriceFilter] = useState("Long Buildup")
  const [fetureIO] = useState([
    "Long Buildup",
    "Short Buildup",
    "Long Unwinding",
    "Short Covering",
  ])
  const [typeList] = useState(["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"])
  const [optionType, setOptionType] = useState("NIFTY")
  useEffect(() => {
    getOIFilter(typeOIpriceFilter)
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
          const data = shortGraphResult.map(item => item.PRICECHANGEPERCENTAGE)
          const label = shortGraphResult.map(item => item.INSTRUMENTIDENTIFIER)
          setProductName(label)
          setProductData(data)
          console.log(ProductData)
          console.log(ProductName)
        }
        fnoranking().then(result => {
          console.log("list data", result)
        })
        getProductFilter(typeFilter)
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
  }, []) // Include relevant dependencies
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
  function getOIFilter(type) {
    shortProductListDataList()
      .then(result => {
        if (isEmpty(result)) {
          return
        }

        const dataOI = []
        const dataPrice = []
        const dataLabel = []

        // Push the data that satisfies the conditions
        result.forEach(item => {
          const oiChange = item.OPENINTERESTCHANGE
          const priceChange = item.PRICECHANGE
          const oilabel = item.INSTRUMENTIDENTIFIER
          if (
            (oiChange > 0 && priceChange > 0 && type === "Long Buildup") ||
            (oiChange > 0 && priceChange < 0 && type === "Short Buildup") ||
            (oiChange < 0 && priceChange < 0 && type === "Long Unwinding") ||
            (oiChange < 0 && priceChange > 0 && type === "Short Covering")
          ) {
            dataOI.push(oiChange)
            dataPrice.push(priceChange)
            dataLabel.push(oilabel)
          }
        })
        // Sort the arrays based on OPENINTERESTCHANGE
        const sortedIndices = dataOI
          .map((_, index) => index)
          .sort((a, b) => dataOI[a] - dataOI[b])

        const sortedDataOI = sortedIndices.map(index => dataOI[index])
        const sortedDataPrice = sortedIndices.map(index => dataPrice[index])
        const sortedDataLabel = sortedIndices.map(index => dataLabel[index])

        setIoDataPrice(sortedDataPrice.slice(0, 5))
        setLabelName(sortedDataLabel.slice(0, 5))
        setIoData(sortedDataOI.slice(0, 5))
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
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
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2 h1 bold w-100 text-gradient">
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

          <div>
            <BoxNavMob />
          </div>

          <Row>
            <Col md={6} id="right">
              <Card
                className="my-2 Drag "
                style={{
                  border: '1px solid transparent',
                  borderRadius: '14px',
                  boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                  padding: '10px',
                  backgroundColor: "#181a33"
                }}
              >
                <p className="text-gradient" style={{ fontSize: 20 }}>Option Movment Chart</p>

                <CardBody>

                  <BarChart ProductName={ProductName} Productdata={ProductData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={6} id="left">
              <Card
                className="my-2 Drag "
                style={{
                  border: '1px solid transparent',
                  borderRadius: '14px',
                  boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                  padding: '10px',
                  backgroundColor: "#181a33"
                }}
              >
                <p className="text-gradient" style={{ fontSize: 20 }}>Progress Chart</p>
                <div className="d-flex justify-content-center">
                  {typeList.map(item => (
                    <button
                      type="button"
                      className={`btn btn-sm m-1 ${optionType === item ? "btn-warning" : " btn-info"
                        }`}
                      onClick={e => setOptionType(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <ProgressBar type={optionType} />
              </Card>
            </Col>
            <Col md={12} id="left">

              <Card
                className="my-2 Drag "
                style={{
                  border: '1px solid transparent',
                  borderRadius: '14px',
                  boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                  padding: '10px',
                  backgroundColor: "#181a33"
                }}
              >
                <p className="text-gradient" style={{ fontSize: 20 }}>Movment Chart</p>
                <div className="d-flex justify-content-center">
                {fetureIO.map(item => (
                  <button
                    type="button"
                    className={`btn btn-sm m-1 ${typeOIpriceFilter === item ? "btn-warning" : " btn-info"
                      }`}
                    onClick={e => buildIOHandler(item)}
                  >
                    {item}
                  </button>
                ))}
                </div>
                <BuildBarChart
                  dataLabel={LabelName}
                  dataIOPrice={ioData}
                  dataIOPriceChange={ioDataPrice}
                  titleName={"Product OI/Price Movment Chart"}
                  horizontal={true}
                  dataColors={typeOIpriceFilter=='Long Buildup'?'["#32f07e", "#f0f0f0"]':typeOIpriceFilter=='Short Buildup'?'["#ff6363", "#f0f0f0"]':typeOIpriceFilter=='Long Unwinding'?'["#0581f5", "#f0f0f0"]':'["#c0ff9c", "#f0f0f0"]'}
                />
              </Card>
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
