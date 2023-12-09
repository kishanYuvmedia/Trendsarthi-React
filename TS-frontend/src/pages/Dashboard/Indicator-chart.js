import React, { useRef, useEffect, useState } from "react"
import { Container, Row, Col, Card } from "reactstrap"
import CardDrag from "./components/CardDrag"
import _ from "lodash"
import StockChart from "./components/StockChart"
export default function IndicatorChart() {
  return (
    <div>
          <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={12}>
            <CardDrag header={"Stock Chart"}>
                <StockChart />
              </CardDrag>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
    </div>
  )
}
