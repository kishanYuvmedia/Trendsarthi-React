import React from "react"

import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../Common/Breadcrumb"

// import chartJs

import LineChart from "../../../pages/AllCharts/chartjs/linechart"


const NiftyIntradayTrend = () => {
    //meta title
    document.title = "Chartjs Charts | Skote - React Admin & Dashboard Template"

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    {/* <Breadcrumbs title="Charts" breadcrumbItem="Chartjs Charts" /> */}
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Line Chart</CardTitle>
                                    <Row className="justify-content-center">
                                        <Col sm={4}>
                                            <div className="text-center">
                                                <h5 className="mb-0">86541</h5>
                                                <p className="text-muted text-truncate">Activated</p>
                                            </div>
                                        </Col>
                                        <Col sm={4}>
                                            <div className="text-center">
                                                <h5 className="mb-0">2541</h5>
                                                <p className="text-muted text-truncate">Pending</p>
                                            </div>
                                        </Col>
                                        <Col sm={4}>
                                            <div className="text-center">
                                                <h5 className="mb-0">102030</h5>
                                                <p className="text-muted text-truncate">Deactivated</p>
                                            </div>
                                        </Col>
                                    </Row>
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

export default NiftyIntradayTrend
