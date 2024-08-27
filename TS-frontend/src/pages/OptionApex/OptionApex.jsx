import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import {
    getStrikePrice,
    geIntradayDataLimit,
    shortGraphList,
    shortProductListDataList,
    fnoranking,
} from "services/api/api-service";
import CardDrag from "pages/Dashboard/components/CardDrag";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import BarChart from "../AllCharts/barchart";
import ProgressBar from "components/Common/ProgressBar";
import BuildBarChart from "../AllCharts/buildBarChart";

import NiftyChart from "./NiftyChart";
import MoneyFlux from "./MoneyFlux";

const OptionApex = (props) => {
    useEffect(() => {
        document.title = "Option Apex | Trendsarthi";

        dragula([
            document.getElementById("left"),
            document.getElementById("right"),
            document.getElementById("left1"),
            document.getElementById("right2"),
            document.getElementById("left3"),
            document.getElementById("right3"),
        ]);


    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <div className="card mb-0">
                        <div className="card-body px-0 pt-0">
                            <div className="row d-flex justify-content-between">
                                <div className="col-md-8 pb-3">
                                    <div className="fs-1 fw-bold text-gradient">Option Apex</div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-around">
                                    <div className="dropdown">
                                        <button className="btn btn-black  dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                                            border: '1px solid transparent',
                                            borderRadius: '5px',
                                            boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                            padding: '10px 20px',
                                        }}>
                                            Index: Nift50
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Nift50</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown ">
                                        <button className="btn btn-black  dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                                            border: '1px solid transparent',
                                            borderRadius: '5px',
                                            boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                            padding: '10px 20px',
                                        }}>
                                            Time: 3m
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-black  dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                                            border: '1px solid transparent',
                                            borderRadius: '5px',
                                            boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                            padding: '10px 20px',
                                        }}>
                                            Exp: Jul - 4 wk
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col md={6} id="right">
                            <NiftyChart header={"Nift 50"} />
                        </Col>
                        <Col md={6} id="left">

                            <MoneyFlux header={"Money Flux"} />

                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

OptionApex.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(OptionApex);
