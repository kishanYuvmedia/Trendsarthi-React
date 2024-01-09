import React from "react"

import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"

import LineChart from "../derivativesComponent/IntradayLineChartData"

const NiftyIntradayChart = ({ datalist, timeValue, zerolist, title }) => {
  let dataItem = datalist
  let timeItem = timeValue
  let zerolistList = zerolist
  return (
    <React.Fragment>
      <div className="">
        <Container fluid={true} className="mt-3">
          {/* <Breadcrumbs title="Derivatives" breadcrumbItem="NIFTY INTRADAY TREND" /> */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">{title} INTRADAY TREND</CardTitle>
                  {/* NIFTY Chart */}
                  <LineChart
                    datalist={dataItem}
                    timelist={timeItem}
                    zerolistv={zerolistList}
                    dataColors='["--bs-primary-rgb, 0.2"]'
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default NiftyIntradayChart
