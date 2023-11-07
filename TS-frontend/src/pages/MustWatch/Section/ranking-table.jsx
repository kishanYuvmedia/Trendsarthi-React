import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { Table, Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
const RankingTable = ({ type,limit,title,data,top }) => {
    return (<>
      <Fragment>
      <Row className="mb-2">
        <Col md={12}>
        <Table responsive>
          <thead>
            <tr>
              <th colSpan={6}>
              {title} {limit==0?null:<strong style={{color:type==="Strongest"?'green':'red'}}>({type} top - {top})</strong>} 
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
          {data.slice(16, limit).map((list, index) => (
              <tr key={index}>
              <td>{index+1}</td>
              <td><Link to={`/sectors/${list.fitMin}`} style={{color:'#fff',fontWeight:'300'}}>{list.fitMin}</Link></td>
              <td><Link to={`/sectors/${list.thartyMin}`} style={{color:'#fff',fontWeigh:'300'}}>{list.thartyMin}</Link></td>
              <td><Link to={`/sectors/${list.houreMin}`} style={{color:'#fff',fontWeight:'300'}}>{list.houreMin}</Link></td>
              <td><Link to={`/sectors/${list.Daily}`} style={{color:'#fff',fontWeigh:'300'}}>{list.Daily}</Link></td>
              <td><Link to={`/sectors/${list.Weekly}`} style={{color:'#fff',fontWeight:'300'}}>{list.fitMin}</Link></td>
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
