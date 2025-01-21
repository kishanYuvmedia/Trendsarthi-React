import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { withTranslation } from "react-i18next";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import { Chart } from "react-google-charts";
export const data = [
    ["Year", "Sales", "Expenses"],
    ["2018", 20000, -400],
    ["2019", 58000, 460],
    ["2020", 10000, -1120],
    ["2021", 63000, 540],
];
export const options = {
    title: "Company Performance",
    chartArea: { width: "80%", height: "70%" },
    backgroundColor: "#000", // Dark background color
    titleTextStyle: { color: "#FFFFFF" }, // Title color
    legend: { textStyle: { color: "#FFFFFF" } }, // Legend text color
    hAxis: {
        title: "Year",
        titleTextStyle: { color: "#FFFFFF" },
        textStyle: { color: "#FFFFFF",borderRadius: '14px', },
    },
    vAxis: {
        title: "Values",
        titleTextStyle: { color: "#FFFFFF",borderRadius: '14px', },
        textStyle: { color: "#FFFFFF" },
    },
    bar: { groupWidth: "75%" },
    colors: ["#1E88E5", "#D32F2F"], // Custom bar colors
};

const OptionClock = (props) => {
    const curTime = new Date();
    const timeMin = 9 * 60 + 15; // Start time in minutes (9:15)
    const timeMax = 15 * 60 + 30; // End time in minutes (15:30)
    const curMin = (curTime.getHours() % 12) * 60 + curTime.getMinutes();

    const [minTimeCaption, set_minTimeCaption] = useState("09:15");
    const [maxTimeCaption, set_maxTimeCaption] = useState("15:30");

    const handleTimeChange = (e) => {
        let h = Math.floor(e.minValue / 60);
        let m = e.minValue % 60;
        let minH = h.toString().padStart(2, "0");
        let minM = m.toString().padStart(2, "0");
        set_minTimeCaption(minH + ":" + minM);

        let hh = Math.floor(e.maxValue / 60);
        let mm = e.maxValue % 60;
        let maxH = hh.toString().padStart(2, "0");
        let maxM = mm.toString().padStart(2, "0");
        set_maxTimeCaption(maxH + ":" + maxM);
    };

    const getTimeLabels = () => {
        let arr = [];
        for (let i = timeMin; i <= timeMax; i += 30) { // Increment by 15 minutes
            let h = Math.floor(i / 60);
            let m = i % 60;
            arr.push(h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0"));
        }
        return arr;
    };
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
                        <div className="card-body px-0 row">
                            <div className="col-9">
                                <div className="fs-1 fw-bold text-gradient">Option Clock</div>
                            </div>
                            <div className="col-3" style={{ display: 'flex', justifyContent: 'space-around' }} >
                                <select name="optionType" id="optionType" className="form-select form-select-sm" aria-label="Default select example">
                                    <option value="NIFTY 50">NIFITY 50</option>
                                    <option value="NIFTY BANK">NIFTY BANK</option>
                                    <option value="NIFTY FINANCIAL SERVICES">NIFTY FINANCIAL SERVICES</option>
                                </select>
                                <select name="optionExpair" id="optionExpair" className="form-select form-select-sm" aria-label="Default select example">
                                    <option value="">Expair Date</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col md={11} className="p-3">
                            <Card
                                className="my-2 Drag "
                            >
                                <CardBody>
                                    <MultiRangeSlider
                                        labels={getTimeLabels()}
                                        min={0}
                                        max={timeMax}
                                        minValue={curMin}
                                        maxValue={timeMax}
                                        step={1}
                                        subSteps={true}
                                        minCaption={minTimeCaption}
                                        maxCaption={maxTimeCaption}
                                        onInput={handleTimeChange}
                                    />
                                    <div className="divOutput">
                                        <div>
                                            <span className="badge text-bg-primary m-1">Start Time: {minTimeCaption}</span>
                                            <span className="badge text-bg-primary m-1">End Time: {maxTimeCaption}</span>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                        <Col md={1} className="p-3">
                            <Button className="w-100" style={{ height: 70, backgroundColor: '#434242', fontSize: 25, marginTop: 20, }}>Go</Button>
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
                                    <Col md={12}>
                                        <div>
                                            <div className="d-flex justify-content-between border-bottom text-white ">
                                                <div className="fs-4 fw-bold ">
                                                    OI Clock
                                                </div>
                                                <div >
                                                    How to use
                                                </div>
                                            </div>
                                            <div className="p-1 mt-2 rounded-4">
                                                <Chart
                                                    // Bar is the equivalent chart type for the material design version.
                                                    chartType="BarChart"
                                                    width="100%"
                                                    height="400px"
                                                    data={data}
                                                    options={options}
                                                />
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
