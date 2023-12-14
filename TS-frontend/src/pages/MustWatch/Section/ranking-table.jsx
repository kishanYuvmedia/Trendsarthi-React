import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { Table, Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
const RankingTable = ({ type, limit, title, data, top }) => {
  return (
    <>
      <Fragment>
        <Row className="mb-2">
          <Col md={12}>
            <Table responsive>
              <thead>
                <tr>
                  <th colSpan={6}>
                    {title}{" "}
                    {limit == 0 ? null : (
                      <strong
                        style={{
                          color: type === "Strongest" ? "green" : "red",
                        }}
                      >
                        ({type} top - {top})
                      </strong>
                    )}
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>5 Min (Intraday)</th>
                  <th>Hour (Intraday)</th>
                  <th>Day</th>
                  <th>Week</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(16, limit).map((list, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/sectors/${list.MINUTE}`}
                        style={{ color: "#fff", fontWeight: "300" }}
                      >
                        {list.MINUTE}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sectors/${list.HOUR}`}
                        style={{ color: "#fff", fontWeigh: "300" }}
                      >
                        {list.HOUR}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sectors/${list.DAY}`}
                        style={{ color: "#fff", fontWeight: "300" }}
                      >
                        {list.DAY}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sectors/${list.WEEK}`}
                        style={{ color: "#fff", fontWeigh: "300" }}
                      >
                        {list.WEEK}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sectors/${list.MONTH}`}
                        style={{ color: "#fff", fontWeight: "300" }}
                      >
                        {list.MONTH}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Fragment>
    </>
  )
}
RankingTable.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}
export default RankingTable
