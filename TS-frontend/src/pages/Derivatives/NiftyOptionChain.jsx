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
import NiftyIntradayTrend from 'components/Common/derivativesComponent/NiftyIntradayTrend';


const NiftyOptionChain = () => {

  //meta title
  document.title = "Derivatives | Nifty Option Chain";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Nifty Option Chain" />


        <Row>
            <Col xl={2}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 text-center">PCR</CardTitle>
                  <div className="table-responsive">
                    <Table className="table mb-0 table-bordered ">

                      <thead>
                        <tr>
                          <th>PCR</th>
                          <th>PCR Strength</th>
                        </tr>
                      </thead>

                      <tbody className='table-striped'>
                        <tr>
                          <th scope="row">1</th>
                          <td>Bearish</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


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

        

      </div>
    </div>
  )
}




NiftyOptionChain.propTypes = {
  preGlobalFilteredRows: PropTypes.any, 

};


export default NiftyOptionChain