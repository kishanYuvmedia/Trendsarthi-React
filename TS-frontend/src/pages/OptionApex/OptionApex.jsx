import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import {
    shortProductListDataList,
} from "services/api/api-service";
import dragula from "dragula";
import _, { isEmpty } from "lodash";
import { geIntradayData } from "services/api/api-service";
import MomentumSpike from "../InsiderStrategy/MomentumSpike";
import NightingaleChart from "pages/AllCharts/NightingaleChart";
import CandlestickChart from "pages/AllCharts/chart-bar";
const OptionApex = (props) => {
    let [mergedData, setMergedData] = useState([
        ["Symbol", "Parent", "Price Change"],
        ["All Stocks", null, 0],
    ]);
    const [typeList] = useState(["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"])
    const [selectedValue, setSelectedValue] = useState("NIFTY");
    const [data, setData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [dataList1, setDataList1] = useState([]);
    const [dateList, setDateList] = useState([]);
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
    useEffect(() => {
        shortProductListDataList().then(result => {
            if (!isEmpty(result)) {
                console.log("result", result)
                setDataList(result);
                const outputData = [
                    ["symbol", "Price Change"], // Header row
                    ...result.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE).slice(1, 10).map(item => [item.INSTRUMENTIDENTIFIER, item.PRICECHANGEPERCENTAGE || 0])
                ];
                const outputData1 = [ // Header row
                    ...result.sort((a, b) => b.PRICECHANGEPERCENTAGE - a.PRICECHANGEPERCENTAGE).slice(1, 10).map(item => ({ value: item.PRICECHANGEPERCENTAGE, name: item.INSTRUMENTIDENTIFIER.slice(0, -2) }))
                ];

                const formattedData = result
                    .sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)
                    .slice(0, 10)
                    .map(({ INSTRUMENTIDENTIFIER, PRICECHANGE }) => [
                        INSTRUMENTIDENTIFIER.slice(0, -2),
                        "All Stocks",
                        PRICECHANGE,
                    ]);

                setMergedData((prevData) => [...prevData, ...formattedData]);
                //console.log("outputData", outputData);
                setData(outputData);
                console.log("outputData1", outputData1);
                setDataList1(outputData1);
            }
        })
        getProductDatalist(selectedValue)
    }, [selectedValue])
    function getProductDatalist(type) {
        geIntradayData(type)
            .then(result => {
                if (!_.isEmpty(result)) {
                    console.log("database", result)
                    let dataList = [['Time', 'OPEN', 'HIGH', 'LOW', 'CLOSE']];
                    result.map(item => (
                        dataList.push([item.time, item.OPEN, item.HIGH, item.LOW, item.CLOSE])
                    ));
                    setDateList(dataList)
                }
            })
            .catch(err => {
                console.error("Error fetching getStrikePrice:", err)
            })
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="card mb-0">
                        <div className="card-body px-0 pt-0">
                            <div className="row d-flex justify-content-between">
                                <div className="col-md-9 pb-3">
                                    <div className="fs-1 fw-bold text-gradient">Option Apex</div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-around">
                                    <select name="StockType" id="StockType" className="form-control">
                                        <option value="NIFTY">NIFTY</option>
                                        <option value="BANKNIFTY">BANKNIFTY</option>
                                        <option value="FINNIFTY">FINNIFTY</option>
                                        <option value="MIDCPNIFTY">MIDCPNIFTY</option>
                                        <option value="SENSEX">SENSEX</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col md={6}>
                            <Card
                                className="my-2"
                                style={{
                                    border: '1px solid transparent',
                                    borderRadius: '14px',
                                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='justify-content-between rounded-4' style={{ backgroundColor: "#181a33" }}>
                                    {/* <CandlestickChart dataList={dateList} /> */}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <MomentumSpike header={"Money Flux"} data={mergedData} />
                        </Col>
                    </Row>
                    <Card
                        className="my-2 Drag"
                        style={{
                            border: '1px solid transparent',
                            borderRadius: '14px',
                            boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                            padding: '10px',
                            backgroundColor: "#181a33"
                        }}
                    >
                        <CardBody className='d-flex justify-content-between rounded-4' style={{ backgroundColor: "#181a33" }}>
                            <NightingaleChart dataList={dataList1} title={selectedValue} />
                        </CardBody>
                    </Card>
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
