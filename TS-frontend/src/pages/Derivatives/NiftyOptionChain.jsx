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
} from "reactstrap"

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';


const NiftyOptionChain = () => {

  const columns = useMemo(
    () => [
      {
        Header: 'SR',
        accessor: 'sr',
      },
      {
        Header: 'Open Int.',
        accessor: 'openIntCE'
      },
      {
        Header: 'Open Interest Change',
        accessor: 'openInterestChangeCE'
      },
      {
        Header: 'Total Qty Traded',
        accessor: 'totalQtyTradedCE'
      },
      {
        Header: 'Price Change %',
        accessor: 'priceChangeCE'
      },
      {
        Header: 'Last Traded Price',
        accessor: 'lastTradedPriceCE'
      },
      {
        Header: 'Strike Price',
        accessor: 'strikePrice',
        
      },
      {
        Header: 'Last Traded Price',
        accessor: 'lastTradedPricePE'
      },
      {
        Header: 'Price Change %',
        accessor: 'priceChangePE'
      },
      {
        Header: 'Total Qty Traded',
        accessor: 'totalQtyTradedPE'
      },
      {
        Header: 'Open Interest Change',
        accessor: 'openInterestChangePE'
      },
      {
        Header: 'Open Int.',
        accessor: 'openIntPE'
      },
    ],
    []
  );

  const data = [
    {
      sr: "1",
      openIntCE: "4789",
      openInterestChangeCE: "35900",
      totalQtyTradedCE: "18987",
      priceChangeCE: "987%",
      lastTradedPriceCE: "9875",

      strikePrice: "18950",

      lastTradedPricePE: "19.65",
      priceChangePE: "43%",
      totalQtyTradedPE: "32883650",
      openInterestChangePE: "481100",
      openIntPE: "1658050",
    },
    {
      sr: "2",
      openIntCE: "4789",
      openInterestChangeCE: "35900",
      totalQtyTradedCE: "18987",
      priceChangeCE: "987%",
      lastTradedPriceCE: "9875",

      strikePrice: "18950",

      lastTradedPricePE: "19.65",
      priceChangePE: "43%",
      totalQtyTradedPE: "32883650",
      openInterestChangePE: "481100",
      openIntPE: "1658050",
    },
    {
      sr: "3",
      openIntCE: "4789",
      openInterestChangeCE: "35900",
      totalQtyTradedCE: "18987",
      priceChangeCE: "987%",
      lastTradedPriceCE: "9875",

      strikePrice: "18950",

      lastTradedPricePE: "19.65",
      priceChangePE: "43%",
      totalQtyTradedPE: "32883650",
      openInterestChangePE: "481100",
      openIntPE: "1658050",
    },
    {
      sr: "4",
      openIntCE: "4789",
      openInterestChangeCE: "35900",
      totalQtyTradedCE: "18987",
      priceChangeCE: "987%",
      lastTradedPriceCE: "9875",

      strikePrice: "18950",

      lastTradedPricePE: "19.65",
      priceChangePE: "43%",
      totalQtyTradedPE: "32883650",
      openInterestChangePE: "481100",
      openIntPE: "1658050",
    },

  ];

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
                          <td>Mark</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

          </Row>


        {/* <Table columns={columns} data={data} /> */}
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={true}
          isAddOptions={false}
          customPageSize={10}
          isPagination={true}
          tableClass="align-middle table-nowrap table-check table-hover table"
          theadClass="table-light"
          tbodyClass="table-striped"
          paginationDiv="col-12"
          pagination="justify-content-center pagination pagination-rounded"
        />

      </div>
    </div>
  )
}




NiftyOptionChain.propTypes = {
  preGlobalFilteredRows: PropTypes.any, 

};


export default NiftyOptionChain