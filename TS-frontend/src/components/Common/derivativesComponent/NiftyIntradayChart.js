import React from "react"

import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../Breadcrumb"

// import chartJs

import LineChart from "../derivativesComponent/IntradayLineChartData"


const NiftyIntradayChart = () => {
    //meta title
    // document.title = "Derivatives | NIFTY INTRADAY TREND"

    return (
        <React.Fragment>
            <div className="">
                <Container fluid={true} className="mt-3">
                    {/* <Breadcrumbs title="Derivatives" breadcrumbItem="NIFTY INTRADAY TREND" /> */}
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">NIFTY INTRADAY TREND</CardTitle>
                                    
                                    {/* NIFTY Chart */}
                                    <LineChart dataColors='["--bs-primary-rgb, 0.2", "--bs-primary", "--bs-light-rgb, 0.2", "--bs-light"]' />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">BANK NIFTY INTRADAY TREND</CardTitle>
                                    
                                    {/* Bank Nifty Chart */}
                                    <LineChart dataColors='["--bs-primary-rgb, 0.2", "--bs-primary", "--bs-light-rgb, 0.2", "--bs-light"]' />
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}

export default NiftyIntradayChart;
