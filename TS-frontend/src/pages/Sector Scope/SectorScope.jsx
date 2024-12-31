import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import SectorList from "./SectorList";
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
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY 50"} tableId={'pow1'} listType={'NIFTY BANK'} />
                        </Col>
                        <Col md={6} id="left" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY MEDIA"} tableId={'pow2'} listType={'NIFTY MEDIA'} />
                        </Col>
                        <Col md={6} id="left1" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY PHARMA"} tableId={'pow3'} listType={'NIFTY PHARMA'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"AUTO"} tableId={'pow4'} listType={'NIFTY AUTO'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"IT"} tableId={'pow4'} listType={'NIFTY IT'} />
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
