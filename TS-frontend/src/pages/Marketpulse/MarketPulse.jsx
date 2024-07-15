import PropTypes from "prop-types"
import React, { useRef, useEffect, useState } from "react"
import { Container, Row, Col, Card } from "reactstrap"
import { withTranslation } from "react-i18next"
import {
    getStrikePrice,
    geIntradayDataLimit,
    shortGraphList,
    shortProductListDataList,
    fnoranking,
} from "services/api/api-service"
import CardDrag from "pages/Dashboard/components/CardDrag"
import dragula from "dragula"
import _, { isEmpty, result, set } from "lodash"
import BarChart from "../AllCharts/barchart"
import ProgressBar from "components/Common/ProgressBar"
import BuildBarChart from "../AllCharts/buildBarChart"


const MarketPulse = props => {
    document.title = "Market Pulse | Trendsarthi"

    const buildIOHandler = type => {
        setTypeOIpriceFilter(type)
        getOIFilter(type)
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="card border-bottom">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="d-flex">
                                        <div className="me-3"></div>
                                        <div className="flex-grow-1 align-self-center">
                                            <div className="text-muted">
                                                <p className="mb-2 h1 bold text-gradient">
                                                    Welcome to Trendsarthi
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="align-self-center col-lg-4">
                                    <div className="text-lg-center mt-4 mt-lg-0">
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    <p className="text-muted text-truncate mb-2 h5">
                                                        Nifty Index
                                                    </p>
                                                    <h5 className="mb-0"></h5>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    <p className="text-muted text-truncate mb-2 h5">
                                                        BankNifty Index
                                                    </p>
                                                    <h5 className="mb-0"></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col md={6} id="right">
                            <CardDrag header={"Option Movment Chart"}>
                                option
                            </CardDrag>
                        </Col>
                        <Col md={6} id="left">
                            <CardDrag header={"Progress Chart"}>
                                table 1 
                            </CardDrag>
                        </Col>
                        <Col md={12} id="left">
                            <CardDrag header={"Movment Chart"}>
                                table 2
                            </CardDrag>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
MarketPulse.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(MarketPulse)
