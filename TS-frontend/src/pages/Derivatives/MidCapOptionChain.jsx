import React, { useMemo } from 'react'
// src/components/filter.
import PropTypes from 'prop-types';
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';

import OptionChainTableContainer from '../../components/Common/derivativesComponent/OptionChainTableContainer';
import IntradayTableContainer from '../../components/Common/derivativesComponent/IntradayTableContainer';

import {columnsNiftyIntraday, dataNiftyIntraday} from './intradayData.js'
import {columnsNiftyOption, dataNiftyOption} from './optionChainData.js'
import NiftyIntradayChart from 'components/Common/derivativesComponent/NiftyIntradayChart';
import PCR from 'components/Common/derivativesComponent/PCR';


const MidCapOptionChain = () => {

  //meta title
  document.title = "Derivatives | MidCap Option Chain";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Derivatives" breadcrumbItem="MidCap Option Chain" />

        {/* PCR Component */}
        <PCR />

        {/* Option chain table */}
        <OptionChainTableContainer
          columns={columnsNiftyOption}
          data={dataNiftyOption}
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




MidCapOptionChain.propTypes = {
  preGlobalFilteredRows: PropTypes.any, 

};


export default MidCapOptionChain