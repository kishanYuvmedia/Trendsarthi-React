import React, { useEffect, useState } from "react"
// src/components/filter.
import PropTypes from "prop-types"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"

import OptionChainTableContainer from "../../components/Common/derivativesComponent/OptionChainTableContainer"
import IntradayTableContainer from "../../components/Common/derivativesComponent/IntradayTableContainer"

import { columnsNiftyIntraday, dataNiftyIntraday } from "./intradayData.js"
import { columnsNiftyOption, dataNiftyOption } from "./optionChainData.js"
import NiftyIntradayChart from "components/Common/derivativesComponent/NiftyIntradayChart"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
} from "../../services/api/api-service"
const OptionChain = props => {
  //meta title
  document.title = `Derivatives | ${props.type} Option Chain`
  const [strickPrice, setStrikePrice] = useState(0)
  const [list, setlist] = useState([])
  useEffect(() => {
    getStrikePrice(props.type)
      .then(resultStrike => {
        setTimeout(() => {
          //console.log(resultStrike.StrikePrice.value)
          getExpairDate(props.type)
            .then(result => {
              //console.log(result.today)
              getOptionDataTable(
                props.type,
                result.today,
                resultStrike.StrikePrice.value
              )
                .then(result1 => {
                  const data = []
                  result1.list.map(item => {
                    //console.log(item)
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
                  //console.log("data", result1.strike)
                  setStrikePrice(result1.strike)
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
  }, [props.type])
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title="Derivatives"
          breadcrumbItem={`${props.type} Option Chain`}
        />
        {/* Option chain table */}
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
        />

        {/* Intraday table */}
        <IntradayTableContainer
          columns={columnsNiftyIntraday}
          data={dataNiftyIntraday}
          isGlobalFilter={false}
          isAddOptions={false}
          customPageSize={10}
          isPagination={false}
          tableClass="align-middle table-nowrap table-check table-hover table"
          theadClass="table-light"
          tbodyClass="table-striped"
          paginationDiv="col-12"
          pagination="justify-content-center pagination pagination-rounded"
        />

        {/* graph */}

        <NiftyIntradayChart />
      </div>
    </div>
  )
}

OptionChain.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default OptionChain
