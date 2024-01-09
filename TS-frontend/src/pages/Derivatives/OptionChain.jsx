import React, { useEffect, useState } from "react"
// src/components/filter.
import PropTypes from "prop-types"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col } from "reactstrap"
import OptionChainTableContainer from "../../components/Common/derivativesComponent/OptionChainTableContainer"
import IntradayTableContainer from "../../components/Common/derivativesComponent/IntradayTableContainer"
import { columnsNiftyOption } from "./optionChainData.js"
import NiftyIntradayChart from "components/Common/derivativesComponent/NiftyIntradayChart"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
  geIntradayData,
} from "../../services/api/api-service"
const OptionChain = props => {
  //meta title
  document.title = `Derivatives | ${props.type} Option Chain`
  const type = props.type
  const [strickPrice, setStrikePrice] = useState(0)
  const [list, setlist] = useState([])
  const [intradayList, setintradayList] = useState([])
  const [dataArray, setDataArray] = useState([])
  const [timeArray, setTimeArray] = useState([])
  const [zerolistArray, setzerolistArray] = useState([])
  useEffect(() => {
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
                })
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
        if (!_.isEmpty(result)) {
          console.log("database", result)
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

            dataValue.push(Number(item.putTotal) - Number(item.callTotal))
            timevalue.push(item.time)
            zerolist.push(0)
          })
          setintradayList(IntraDay)
          setDataArray(dataValue)
          setTimeArray(timevalue)
          setzerolistArray(zerolist)
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
          breadcrumbItem={`${type} Option Chain`}
        />
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
          PCRstatus={true}
        />
        <IntradayTableContainer data={intradayList} />
        <Row>
          <Col md={6}>
            <NiftyIntradayChart
              title={type}
              datalist={dataArray}
              timeValue={timeArray}
              zerolist={zerolistArray}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

OptionChain.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default OptionChain
