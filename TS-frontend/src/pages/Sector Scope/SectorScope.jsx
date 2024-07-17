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
import TableCard from "pages/Marketpulse/TableCard";
import MomentumSpike from "pages/InsiderStrategy/MomentumSpike";
import SectorBarScope from "./SectorBarScope";


const SectorScope = (props) => {
    useEffect(() => {
        document.title = "Sector Scope | Trendsarthi";

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
                        <div className="card-body px-0">
                            <div className="fs-1 fw-bold text-gradient">Sector Scope</div>
                        </div>
                    </div>
                    <Row>
                        <Col md={12}>
                            <MomentumSpike />
                        </Col>
                        <Col md={12}>
                            <SectorBarScope header={"Sector Scope"} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} id="right">
                            <TableCard header={"HIGH POW. STOCKS"} tableId={'pow1'} />
                        </Col>
                        <Col md={6} id="left">
                            <TableCard header={"INTRADAY BOOST"} tableId={'pow2'} />
                        </Col>
                        <Col md={6} id="left1">
                            <TableCard header={"TOP LEVEL STOCKS"} tableId={'pow3'} />
                        </Col>
                        <Col md={6} id="left3">
                            <TableCard header={"LOW LEVEL STOCKS"} tableId={'pow4'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

SectorScope.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(SectorScope);
