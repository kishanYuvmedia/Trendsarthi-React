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
import { calculateMFI } from 'services/utilty';
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
  geIntradayData,
  getOptionDataList
} from "../../services/api/api-service"
import { isEmpty } from 'lodash';
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
  const [signal, setSignal] = useState('');
  const [setPriceing, getPricing] = useState([]);
  let [callPers, setcallPers] = useState(0)
  let [putPers, setputPers] = useState(0)
  const [dataStrikItem,setdataStrikItem]=useState([]);
  useEffect(() => {
    setdatacall([])
    setdataput([])
    getStrikePrice(type)
      .then(resultStrike => {
        setdataStrikItem(resultStrike.StrikePrice.item);
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
                getTechIndicator(pricingList);
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
  }, [type])
  function getIntraday() {
    geIntradayData(type)
      .then(result => {
        console.log("result", result);
        if (!_.isEmpty(result)) {
          const timevalue = [];
          const dataValue = [];
          const zerolist = [];
          const IntraDay = [];
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
      console.log("Technical Indicatorsqqq",setPriceing);
     
  }
  function getTechIndicator(priceData) {
    // Define the SMA period
    const smaPeriod = 5;

    // Calculate SMA
    const smaData = calculateSMA(priceData, smaPeriod);

    // Calculate the latest SMA value
    const latestSMAValue = smaData[smaData.length - 1];

    // Generate buy and sell signals (example: crossover strategy)
    let generatedSignal = '';
    if (priceData[priceData.length - 1] > latestSMAValue) {
      generatedSignal = 'Buy';
    } else if (priceData[priceData.length - 1] < latestSMAValue) {
      generatedSignal = 'Sell';
    }

    // You can return or use the generatedSignal as needed
    setSignal(generatedSignal);
  }

  // Function to calculate SMA
  function calculateSMA(values, period) {
    const smaValues = [];
    for (let i = 0; i < values.length; i++) {
      if (i < period - 1) {
        smaValues.push(null); // SMA not available for initial values
      } else {
        const sum = values.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val, 0);
        smaValues.push(sum / period);
      }
    }
    return smaValues;
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title="Derivatives"
          breadcrumbItem={`${product} FNO Dashboard`}
        />
        <FnoHeader product={`${product}EQ`} strikePrice={strickPrice} callPers={callPers} putPers={putPers} signal={signal} strickData={dataStrikItem} />
        <Row>
          <Col md={6}>
            <FnoIntradayTableContainer data={intradayList} />
          </Col>
          <Col md={6}>
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
