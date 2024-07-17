import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import MultiRangeSlider from "multi-range-slider-react";
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


const OptionClock = (props) => {

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [minValue2, setMinValue2] = useState(0);
    const [maxValue2, setMaxValue2] = useState(0);

    useEffect(() => {
        document.title = "Option Clock | Trendsarthi";

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
                            <div className="fs-1 fw-bold text-gradient">Option Clock</div>
                        </div>
                    </div>
                    <Row>
                        <Col md={12}>
                            <div>
                                <Card
                                    className="my-2 Drag "
                                    style={{
                                        border: '1px solid transparent',
                                        borderRadius: '14px',
                                        boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                        padding: '10px',
                                        backgroundColor: "#181a33"
                                    }}
                                >
                                    <CardBody className="p-3">
                                        <MultiRangeSlider
                                            // disabled={true}
                                            onInput={(e) => {
                                                setMinValue(e.minValue);
                                                setMaxValue(e.maxValue);
                                            }}
                                            onChange={(e) => {
                                                setMinValue2(e.minValue);
                                                setMaxValue2(e.maxValue);
                                            }}
                                        ></MultiRangeSlider>
                                        <div className="divOutput">
                                            <div>onInput :</div>
                                            <div>
                                                <span>Min: {minValue}</span>
                                                <span>Max: {maxValue}</span>
                                            </div>
                                        </div>
                                        <div className="divOutput">
                                            <div>onChange :</div>
                                            <div>
                                                <span>Min: {minValue2}</span>
                                                <span>Max: {maxValue2}</span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>

                            <Card
                                className="my-2 Drag "
                                style={{
                                    border: '1px solid transparent',
                                    borderRadius: '14px',
                                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className="row p-3">
                                    <Col md={6}>
                                        <div>
                                            <div className="d-flex justify-content-between border-bottom text-white ">
                                                <div className="fs-4 fw-bold ">
                                                    OI Clock
                                                </div>
                                                <div >
                                                    How to use
                                                </div>

                                            </div>
                                            <div className="bg-secondary p-5 mt-2 rounded-4">
                                                asd
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between border-bottom text-white">
                                                <div className="fs-4 fw-bold ">
                                                    Net Position
                                                </div>

                                            </div>
                                            <div className="bg-secondary p-5 mt-2 rounded-4">
                                                asd
                                            </div>

                                        </div>
                                        <div>
                                            <div className="d-flex justify-content-between border-bottom text-white">
                                                <div className="fs-4 fw-bold ">
                                                    Distribution
                                                </div>
                                            </div>
                                            <div className="bg-secondary p-5 mt-2 rounded-4">
                                                asd
                                            </div>
                                        </div>
                                    </Col>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>



                </Container>
            </div>
        </React.Fragment>
    );
};

OptionClock.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(OptionClock);
