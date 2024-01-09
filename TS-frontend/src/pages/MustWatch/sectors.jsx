import React, { useState } from "react"
import { useParams } from "react-router-dom"
import FnoIntradayTableContainer from "../../components/Common/derivativesComponent/FnoIntradayTableContainer"
import FnoOptionChainTableContainer from "../../components/Common/derivativesComponent/FnoOptionChainTableContainer"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody, CardHeader, Table } from "reactstrap"
import { FnocolumnsNiftyOption } from "../Derivatives/optionChainData.js"
import { useEffect } from "react"
import Apaexlinecolumn from "pages/Derivatives/DashboardComponents/apaexlinecolumn"
import FnoHeader from "./Section/fnoHeader"
import { BiCaretDown, BiCaretUp } from "react-icons/bi"
import {_,isEmpty} from "lodash"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
  geIntradayData,
  getIndicatorDataList,
} from "../../services/api/api-service"
export default function Sectors() {
  const [dataCall, setdatacall] = useState([])
  const [dataPut, setdataput] = useState([])
  const [category, setcategory] = useState([])
  let { product } = useParams()
  //meta title
  document.title = `${product} FNO | ${product} Dashboard`
  const type = product
  const [shortTerm, setshortTerm] = useState({})
  const [strickPrice, setStrikePrice] = useState(0)
  const [list, setlist] = useState([])
  const [intradayList, setintradayList] = useState([])
  const [dataArray, setDataArray] = useState([])
  const [timeArray, setTimeArray] = useState([])
  const [zerolistArray, setzerolistArray] = useState([])
  const [signal, setSignal] = useState("")
  const [setPriceing, getPricing] = useState([])
  let [callPers, setcallPers] = useState(0)
  let [putPers, setputPers] = useState(0)
  const [dataStrikItem, setdataStrikItem] = useState([])
  const [intradayTable, setIntradayTable] = useState([])
  const [dayTerm, setdayTerm] = useState({})
  useEffect(() => {
    setdatacall([])
    setdataput([])
    getStrikePrice(type)
      .then(resultStrike => {
        setdataStrikItem(resultStrike.StrikePrice.Item)
        console.log("price1", resultStrike)
        getExpairDate(type)
          .then(result => {
            getOptionDataTable(
              type,
              result.today,
              resultStrike.StrikePrice.value
            )
              .then(result1 => {
                const data = []
                const datacl = []
                const datap = []
                const cdata = []
                const pricingList = []
                let ctotal = 0
                let ptotal = 0
                let totalCP = 0
                let callP = 0
                let putP = 0
                let ciototal = 0
                let piogetotal = 0
                console.log("result one data", result1)
                if (result1.length > 0) {
                  result1.list.map(item => {
                    data.push({
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
                    pricingList.push(item.call.BUYPRICE)
                    datacl.push(item.call.OPENINTERESTCHANGE)
                    datap.push(item.put.OPENINTERESTCHANGE)
                    cdata.push(item.put.value)
                    ctotal += Number(item.call.OPENINTERESTCHANGE)
                    ptotal += Number(item.put.OPENINTERESTCHANGE)
                    ciototal += Number(item.call.OPENINTEREST)
                    piogetotal += Number(item.put.OPENINTEREST)
                  })
                }
                getTechIndicator(pricingList)
                totalCP = ciototal + piogetotal
                callP = (ciototal / totalCP) * 100
                putP = (piogetotal / totalCP) * 100
                setdatacall(datacl)
                setdataput(datap)
                setcategory(cdata)
                setlist(data)
                setStrikePrice(result1.strike)
                setcallPers(callP)
                setputPers(putP)
              })
              .catch(err => {
                console.error("Error fetching getOptionDataTable:", err)
              })
          })
          .catch(err => {
            console.error("Error fetching getExpairDate:", err)
          })
      })
      .catch(err => {
        console.error("Error fetching getStrikePrice:", err)
      })
    getIntraday()
    getIndicatorData()
  }, [type])
  function getIntraday() {
    geIntradayData(type)
      .then(result => {
        console.log("result", result)
        if (!_.isEmpty(result)) {
          const timevalue = []
          const dataValue = []
          const zerolist = []
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
                ) > 1
                  ? "SELL"
                  : "BUY",
              vwap: item.AVERAGETRADEDPRICE,
              price: item.BUYPRICE,
              vwapSignal:
                Number(
                  Number(item.AVERAGETRADEDPRICE) < Number(item.BUYPRICE)
                ).toFixed(2) > 1
                  ? "SELL"
                  : "BUY",
            })
            dataValue.push(
              Number(item.putTotal) || 0 - Number(item.callTotal) || 0
            )
            timevalue.push(item.time)
            zerolist.push(0)
          })
          setintradayList(IntraDay)
          setDataArray(dataValue)
          setTimeArray(timevalue)
          setzerolistArray(zerolist)
          console.log("Zero", zerolistArray)
        }
      })
      .catch(err => {
        console.error("Error fetching getStrikePrice:", err)
      })
    console.log("Technical Indicatorsqqq", setPriceing)
  }
  function getTechIndicator(priceData) {
    // Define the SMA period
    const smaPeriod = 5

    // Calculate SMA
    const smaData = calculateSMA(priceData, smaPeriod)

    // Calculate the latest SMA value
    const latestSMAValue = smaData[smaData.length - 1]

    // Generate buy and sell signals (example: crossover strategy)
    let generatedSignal = ""
    if (priceData[priceData.length - 1] > latestSMAValue) {
      generatedSignal = "Buy"
    } else if (priceData[priceData.length - 1] < latestSMAValue) {
      generatedSignal = "Sell"
    }

    // You can return or use the generatedSignal as needed
    setSignal(generatedSignal)
  }
  // Function to calculate SMA
  function calculateSMA(values, period) {
    const smaValues = []
    for (let i = 0; i < values.length; i++) {
      if (i < period - 1) {
        smaValues.push(null) // SMA not available for initial values
      } else {
        const sum = values
          .slice(i - period + 1, i + 1)
          .reduce((acc, val) => acc + val, 0)
        smaValues.push(sum / period)
      }
    }
    return smaValues
  }
  async function getIndicatorData() {
    const timeFrames = ["MINUTE", "MINUTE", "MINUTE", "HOUR", "DAY"]
    const intervals = [5, 15, 30, 6, 1]
    const dataList = []
    for (let i = 0; i < timeFrames.length; i++) {
      const data = await getIndicatorDataList(
        product,
        timeFrames[i],
        intervals[i],
        100
      )
      if (!isEmpty(data)) {
        dataList.push(data.list)
      }
    }
    countUpDown(dataList)
    setIntradayTable(dataList)
  }
  function countUpDown(data) {
    const total = { UP: 0, DN: 0 }
    const totalDay = { UP: 0, DN: 0 }

    data.forEach(entry => {
      const time = entry.time
      if (time !== "DAY") {
        for (let i = 1; i <= 9; i++) {
          const key = `Int${i}`
          const value = entry[key]
          if (value === "UP") {
            total.UP++
          } else if (value === "DN") {
            total.DN++
          }
        }
      } else if (time === "DAY") {
        for (let i = 1; i <= 9; i++) {
          const key = `Int${i}`
          const value = entry[key]
          if (value === "UP") {
            totalDay.UP++
          } else if (value === "DN") {
            totalDay.DN++
          }
        }
      }
    })
    let down = (total.DN / (total.DN + total.UP)) * 100
    let downDay = (totalDay.DN / (totalDay.DN + totalDay.UP)) * 100
    setshortTerm({ downP: down, up: 100 - down })
    setdayTerm({ downP: downDay, up: 100 - downDay })
  }
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title="Derivatives"
          breadcrumbItem={`${product} FNO Dashboard`}
        />
        <FnoHeader
          product={`${product}EQ`}
          strikePrice={strickPrice}
          callPers={callPers}
          putPers={putPers}
          signal={signal}
          strickData={dataStrikItem}
        />
        <Row>
          <Col md={6}>
            <Card>
              <CardHeader>{product}</CardHeader>
              <CardBody>
                <Table dark responsive>
                  <thead>
                    <th>Time</th>
                    <th>IND-1</th>
                    <th>IND-2</th>
                    <th>IND-3</th>
                    <th>IND-4</th>
                    <th>IND-5</th>
                    <th>IND-6</th>
                    <th>IND-7</th>
                    <th>IND-8</th>
                    <th>IND-9</th>
                  </thead>
                  <tbody>
                    {intradayTable.map(item => (
                      <tr>
                        <th>{item.time}</th>
                        <td>
                          {item.Int1 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int2 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int3 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int4 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int5 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int6 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int7 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int8 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                        <td>
                          {item.Int9 == "UP" ? (
                            <BiCaretUp
                              style={{ fontSize: 25, color: "green" }}
                            />
                          ) : (
                            <BiCaretDown
                              style={{ fontSize: 25, color: "red" }}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Support & Resistance</CardHeader>
              <CardBody>
                <Table dark responsive>
                  <thead>
                    <th></th>
                    <th>S-3</th>
                    <th>S-2</th>
                    <th>S-1</th>
                    <th>PP</th>
                    <th>R-1</th>
                    <th>R-2</th>
                    <th>R-3</th>
                  </thead>
                </Table>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Sentiments</CardHeader>
              <CardBody>
                <Table dark responsive>
                  <thead>
                    <th></th>
                    <th>UP (%)</th>
                    <th>DOWN (%)</th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Sentiments (Average)</th>
                      <th>{Math.round(callPers).toFixed(2)}% </th>
                      <th>{Math.round(putPers).toFixed(2)}% </th>
                    </tr>
                    <tr>
                      <th>Short Term Sentiments (5,15,30,60)</th>
                      <th>{Math.round(shortTerm.downP).toFixed(2)}% </th>
                      <th>{Math.round(shortTerm.up).toFixed(2)}% </th>
                    </tr>
                    <tr>
                      <th>Sentiments (Average)</th>
                      <th>{Math.round(dayTerm.downP).toFixed(2)}% </th>
                      <th>{Math.round(dayTerm.up).toFixed(2)}% </th>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FnoIntradayTableContainer data={intradayList} />
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>OI-Concentration since Expiry</CardHeader>
              <CardBody>
                {!_.isEmpty(dataCall) && (
                  <Apaexlinecolumn
                    dataCallValue={dataCall}
                    dataPutValue={dataPut}
                    categoryValue={category}
                    horizontal={false}
                    titleName={""}
                    dataColors='["#ff0000","#00ff26"]'
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <FnoOptionChainTableContainer
          columns={FnocolumnsNiftyOption}
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
      </div>
    </div>
  )
}
