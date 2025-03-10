import React, { useState } from "react"
import { Container, Row, Col, Progress, Card } from "reactstrap"
import Settings from "./DashboardComponents/FilterTabs"
import Apaexlinecolumn from "./DashboardComponents/apaexlinecolumn"
import OptionChainTableContainer from "../../components/Common/derivativesComponent/OptionChainTableContainer"
import ProgressBar from "components/Common/ProgressBar"
import IntradayTableContainer from "../../components/Common/derivativesComponent/IntradayTableContainer"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { columnsNiftyOption } from "./optionChainData.js"
import { useEffect } from "react"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable, geIntradayData
} from "../../services/api/api-service"
const index = () => {
  //meta title
  const [intradayList, setintradayList] = useState([])
  const [strickPrice, setStrikePrice] = useState(0)
  const [list, setlist] = useState([])
  const [typeList] = useState(["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"])
  const [optionType, setOptionType] = useState("NIFTY")
  document.title = "Derivative Dashboard"
  const [dataCall, setdatacall] = useState([])
  const [dataPut, setdataput] = useState([])
  const [category, setcategory] = useState([])
  let [totalcal, setTotalCal] = useState(0)
  let [totalput, setTotalPut] = useState(0)
  let [callPers, setcallPers] = useState(0)
  let [putPers, setputPers] = useState(0)
  const [expdatelist, setExpDate] = useState([])
  useEffect(() => {
    console.log(optionType)
    setdatacall([])
    setdataput([])
    getStrikePrice(optionType)
      .then(resultStrike => {
        const explist = []
        setTimeout(() => {
          //console.log(resultStrike.StrikePrice.value)
          getExpairDate(optionType)
            .then(result => {
              result.list.map(item => explist.push({ value: item }))
              getOptionDataTable(
                optionType,
                result.today,
                resultStrike.StrikePrice.value
              )
                .then(result1 => {
                  const dataOption = []
                  result1.list.map(item => {
                    dataOption.push({
                      openIntCE: item.call.OPENINTEREST,
                      openInterestChangeCE: item.call.OPENINTERESTCHANGE,
                      totalQtyTradedCE: item.call.TOTALQTYTRADED,
                      priceChangeCE: item.call.PRICECHANGE,
                      lastTradedPriceCE: item.call.LASTTRADEPRICE,
                      strikePrice: item.call.value,
                      stricke: item.strike,
                      lastTradedPricePE: item.put.LASTTRADEPRICE,
                      priceChangePE: item.put.PRICECHANGE,
                      totalQtyTradedPE: item.put.LASTTRADEPRICE,
                      openInterestChangePE: item.put.OPENINTERESTCHANGE,
                      openIntPE: item.put.OPENINTEREST,
                    })
                  })
                  setlist(dataOption)
                  setStrikePrice(result1.strike)

                  const datacl = []
                  const datap = []
                  const cdata = []
                  let ctotal = 0
                  let ptotal = 0
                  let totalCP = 0
                  let callP = 0
                  let putP = 0
                  let ciototal = 0
                  let piogetotal = 0
                  result1.list.map(item => {
                    datacl.push(item.call.OPENINTERESTCHANGE)
                    datap.push(item.put.OPENINTERESTCHANGE)
                    cdata.push(item.put.value)
                    ctotal += Number(item.call.OPENINTERESTCHANGE)
                    ptotal += Number(item.put.OPENINTERESTCHANGE)
                    ciototal += Number(item.call.OPENINTEREST)
                    piogetotal += Number(item.put.OPENINTEREST)
                  })
                  totalCP = ciototal + piogetotal
                  callP = (ciototal / totalCP) * 100
                  putP = (piogetotal / totalCP) * 100
                  setdatacall(datacl)
                  setdataput(datap)
                  setcategory(cdata)
                  setTotalCal(ctotal)
                  setTotalPut(ptotal)
                  setcallPers(callP)
                  setputPers(putP)
                  setExpDate(explist)
                  console.log("expdate", expdatelist)
                })
                .catch(err => {
                  console.error("Error fetching getOptionDataTable:", err)
                })
            })
            .catch(err => {
              console.error("Error fetching getExpairDate:", err)
            })
        }, 1000)
      })
      .catch(err => {
        console.error("Error fetching getStrikePrice:", err)
      })
    getIntraday();
  }, [optionType])
  function getIntraday() {
    geIntradayData(optionType)
      .then(result => {
        if (!_.isEmpty(result)) {
          console.log("database", result);
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
          console.log("IntraDay", IntraDay)
          setintradayList(IntraDay)
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
          <Breadcrumbs
            title="Derivative"
            breadcrumbItem="Derivative Dashboard"
          />
          <Row>
            <Col md={8}>

              {totalcal != 0 && (
                <Settings
                  expdatelist={expdatelist}
                  totalcal={totalcal}
                  totalput={totalput}
                  putPers={putPers}
                  callPers={callPers}
                  settype={setOptionType}
                />
              )}
            </Col>
            <Col md={4} id="right">
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
                <p className="text-gradient" style={{ fontSize: 20 }}>{`${optionType} Progress Chart`}</p>
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
            <Col md={12}>
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
                <p className="text-gradient" style={{ fontSize: 20 }}>Intraday data chart</p>
                {!_.isEmpty(dataCall) && (
                  <Apaexlinecolumn
                    dataCallValue={dataCall}
                    dataPutValue={dataPut}
                    categoryValue={category}
                    titleName={"Intraday data chart"}
                    horizontal={true}
                    dataColors='["#ed0c00","#8afff3"]'
                  />
                )}
              </Card>
            </Col>

            <Col md={12}>
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
                <p className="text-gradient" style={{ fontSize: 20 }}>Call/Put</p>
                <OptionChainTableContainer
                  columns={columnsNiftyOption}
                  data={list}
                  isGlobalFilter={false}
                  isAddOptions={false}
                  strickP={strickPrice}
                  customPageSize={10}
                  isPagination={false}
                  tableClass="align-middle table-nowrap table-check table-hover table"
                  theadClass="table-light"
                  tbodyClass="table-striped"
                  paginationDiv="col-12"
                  pagination="justify-content-center pagination pagination-rounded"
                  PCRstatus={false}
                />
              </Card>
            </Col>
            <Col md={12}>
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
                <p className="text-gradient" style={{ fontSize: 20 }}>Intraday Today</p>
                <IntradayTableContainer data={intradayList} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default index
