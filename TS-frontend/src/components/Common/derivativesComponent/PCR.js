import React, { useEffect, useState } from "react"

import { Table, Row, Col, Card, CardBody } from "reactstrap"

const PCR = props => {
  const [data, setData] = useState({
    PCR: 0,
    PCRStrength: "NON",
  })
  function calculatePCRStrength2(vtotalOpenIntCE, vtotalOpenIntPE) {
    let PCR = vtotalOpenIntPE / vtotalOpenIntCE
    if (PCR >= 3) {
      return {
        PCR: PCR,
        PCRStrength: "Strong Bullish (Strong Support)",
      }
    } else if (PCR > 1 && PCR < 3) {
      return {
        PCR: PCR,
        PCRStrength: "Bullish",
      }
    } else if (PCR === 1) {
      return {
        PCR: PCR,
        PCRStrength: "Neutral",
      }
    } else if (PCR > 0.33 && PCR < 1) {
      return {
        PCR: PCR,
        PCRStrength: "Bearish",
      }
    } else if (PCR <= 0.33) {
      return {
        PCR: PCR,
        PCRStrength: "Strong Bearish (Strong Resistance)",
      }
    } else {
      return {
        PCR: PCR,
        PCRStrength: "NOT A NUMBER",
      }
    }
  }
  useEffect(() => {
    setData(calculatePCRStrength2(props.totalOpenIntCE, props.totalOpenIntPE))
  }, [props.totalOpenIntCE, props.totalOpenIntPE])
  return (
    <div>
      <Row>
        <Col md="4">
          <Card className="mini-stats-wid">
            <CardBody>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium">PCR</p>
                  <h4 className="mb-0">{data.PCR.toFixed(2)}</h4>
                </div>
                <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                  <span className="avatar-title rounded-circle bg-success">
                    <i className={"bx bx-chart font-size-24"}></i>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="mini-stats-wid">
            <CardBody>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium">PCR Strength</p>
                  <h4 className="mb-0">{data.PCRStrength}</h4>
                </div>
                <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                  <span className="avatar-title rounded-circle bg-success">
                    <i className={"bx bx-chart font-size-24"}></i>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="mini-stats-wid">
            <CardBody>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium">Updated ?</p>
                  <h4 className="mb-0">Yes</h4>
                </div>
                <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                  <span className="avatar-title rounded-circle bg-success">
                    <i className={"bx bx-chart font-size-24"}></i>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PCR
