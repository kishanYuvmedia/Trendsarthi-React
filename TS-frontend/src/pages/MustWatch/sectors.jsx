import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import FnoIntradayTableContainer from "../../components/Common/derivativesComponent/FnoIntradayTableContainer"
import FnoOptionChainTableContainer from "../../components/Common/derivativesComponent/FnoOptionChainTableContainer"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody, CardHeader, } from 'reactstrap';
import { FnocolumnsNiftyOption } from "../Derivatives/optionChainData.js"
import { useEffect } from "react"
import Apaexlinecolumn from 'pages/Derivatives/DashboardComponents/apaexlinecolumn';
import FnoHeader from './Section/fnoHeader';
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
  geIntradayData,
} from "../../services/api/api-service"
import { BarChartFNO } from 'components/Common/BarChartFNO';
export default function Sectors() {
  const [dataCall, setdatacall] = useState([])
  const [dataPut, setdataput] = useState([])
  const [category, setcategory] = useState([])
  let { product } = useParams();
  //meta title
  document.title = `${product} FNO | ${product} Dashboard`
  const type = product
  const [strickPrice, setStrikePrice] = useState(0)
  const [list, setlist] = useState([])
  const [intradayList, setintradayList] = useState([])
  const [dataArray, setDataArray] = useState([])
  const [timeArray, setTimeArray] = useState([])
  const [zerolistArray, setzerolistArray] = useState([])
  useEffect(() => {
    setdatacall([])
    setdataput([])
    getStrikePrice(type)
      .then(resultStrike => {
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
                  datacl.push(item.call.OPENINTERESTCHANGE)
                  datap.push(item.put.OPENINTERESTCHANGE)
                  cdata.push(item.put.value)

                })
                setdatacall(datacl)
                setdataput(datap)
                setcategory(cdata)
                setlist(data)
                setStrikePrice(result1.strike)
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
  }, [type])
  function getIntraday() {
    geIntradayData(type)
      .then(result => {
        console.log("result",result);
        if (!_.isEmpty(result)) {
          const timevalue = [];
          const dataValue = [];
          const zerolist = [];
          const IntraDay=[];
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
  }
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title="Derivatives"
          breadcrumbItem={`${product} FNO Dashboard`}
        />
        <FnoHeader product={`${product}EQ`} strikePrice={strickPrice} />
        <FnoIntradayTableContainer data={intradayList} />
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
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                OI-Concentration since Expiry
              </CardHeader>
              <CardBody>
                {!_.isEmpty(dataCall) && (
                  <Apaexlinecolumn
                    dataCallValue={dataCall}
                    dataPutValue={dataPut}
                    categoryValue={category}
                    horizontal={false}
                    titleName={''}
                    dataColors='["#ff0000","#00ff26"]'
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
