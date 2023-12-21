import PropTypes from "prop-types"
import React, { useRef, useEffect, useState } from "react"
import { Container, Row, Col, Card } from "reactstrap"
import { withTranslation } from "react-i18next"
import {
  getStrikePrice,
  geIntradayDataLimit,
  getNiftyRankingTime,
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
  const [ProductLabel, setProductLabel] = useState([])
  const [timelist] = useState(["MINUTE", "HOUR", "DAY", "WEEK", "MONTH"])
  const [fetureBuild] = useState(["Long Buildup", "Short Buildup", "Long Unwinding", "Short Covering"])
  const [time, setTime] = useState("MINUTE")
  useEffect(() => {
    getNiftyRankingTime(time).then(result => {
      if(!isEmpty(result)){
        const data=[];
        const label=[];
        console.log("resulte Product data",result);
        result.map(item=>{
          data.push(item.OPENINTEREST);
          label.push(item.type);
        })
        
        setProductData(data);
        setProductLabel(label);
      }
    });
  }, [time]);
  
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
    }
    yourFunction()
    const intervalId = setInterval(yourFunction, 10000)
    return () => clearInterval(intervalId)
  }, [])
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
            <Col md={12}>
              <CardDrag header={"IO Chart"}>
                {timelist.map(item => (
                  <button
                    type="button"
                    className="btn btn-info m-1"
                    onClick={e => setTime(item)}
                  >
                    {item}
                  </button>
                ))}
                {!isEmpty(ProductLabel) &&
                 <BarChart ProductData={ProductData} height={400} ProductLabel={ProductLabel} />
                 
                }
              </CardDrag>
            </Col>
            <Col md={12}>
              <CardDrag header={"Futures Build"}>
                {fetureBuild.map(item => (
                  <button
                    type="button"
                    className="btn btn-info m-1"
                    onClick={e => setTime(item)}
                  >
                    {item}
                  </button>
                ))}
               {!isEmpty(ProductLabel) &&
                 <BarChart ProductData={ProductData} height={400} ProductLabel={ProductLabel} />
                }
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
