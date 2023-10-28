import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { Table, Row, Col, Button } from "reactstrap"
const RankingTable = ({ type,limit,title }) => {
    const data=[];
    return (<>
      <Fragment>
      <Row className="mb-2">
        <Col md={12}>
        <Table responsive>
          <thead>
            <tr>
              <th colSpan={6}>
              {title} {limit==0?null:<strong style={{color:type==="Strongest"?'green':'red'}}>({type} top - {limit})</strong>} 
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Rank</th>
              <th>15Min (Intraday)</th>
              <th>30Min (Intraday)</th>
              <th>60Min</th>
              <th>Daily</th>
              <th>Weekly</th>
            </tr>
          </thead>
          <tbody>
            {data.map((list, index) => (
              <tr key={index}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Fragment>
    </>);
}
RankingTable.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
  }
export default RankingTable
