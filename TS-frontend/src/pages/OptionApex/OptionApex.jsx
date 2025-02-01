import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Badge from 'react-bootstrap/Badge';
import { withTranslation } from "react-i18next";
import {
    shortProductListDataList,
} from "services/api/api-service";
import dragula from "dragula";
import { Chart } from "react-google-charts";
import _, { isEmpty, result, set } from "lodash";
import NiftyChart from "./NiftyChart";
import MoneyFlux from "./MoneyFlux";
import StockChart from "../Dashboard/components/StockChart";
import { getHistoryList } from "services/api/api-service";
import MomentumSpike from "../InsiderStrategy/MomentumSpike";
const OptionApex = (props) => {
     let [mergedData, setMergedData] = useState([
         ["Symbol", "Parent", "Price Change"],
         ["All Stocks", null, 0],
     ]);
    const [typeList] = useState(["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"])
    const [selectedValue, setSelectedValue] = useState("NIFTY");
    const [data, setData] = useState([]);
    const [DataChart, setDataChart] = useState([]);
    const [dataList, setDataList] = useState([]);
    const options = {
        backgroundColor: "#181a33", // Dark background
        pieHole: 0.4,
        chartArea: {
            backgroundColor: "#181a33", // Dark chart area
        },
        legend: {
            textStyle: { color: "white" }, // Legend text color
        },
        hAxis: {
            textStyle: { color: "white" }, // X-axis labels color
        },
        vAxis: {
            textStyle: { color: "white" }, // Y-axis labels color
        },
        titleTextStyle: {
            color: "white", // Title text color
        },
    };
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
                const formattedData = result
                .sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)
                .slice(0, 15)
                .map(({ INSTRUMENTIDENTIFIER, PRICECHANGE }) => [
                    INSTRUMENTIDENTIFIER.slice(0, -2),
                    "All Stocks",
                    PRICECHANGE,
                ]);
                console.log("Formatted Data:", formattedData);
        
                setMergedData((prevData) => [...prevData, ...formattedData]);
                console.log("outputData", outputData);
                setData(outputData);
            }
        })
        getProductDatalist(selectedValue)
    }, [selectedValue])
    function getProductDatalist(type) {
        getHistoryList("MINUTE", `${type}-I`, 5000, 5).then(result => {
            const dataResult = []
            if (!isEmpty(result)) {
                console.log("Product stock data", result)
                result.list.map(item =>
                    dataResult.push({
                        Close: item.CLOSE,
                        Date: item.LASTTRADETIME,
                        High: item.HIGH,
                        Low: item.LOW,
                        Open: item.OPEN,
                    })
                )
            }
            setDataChart(dataResult)
        })
    }
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
                                <CardBody className='justify-content-between rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <StockChart dataList={DataChart} />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6}>
                        <MomentumSpike header={"Money Flux"} data={mergedData} />
                          

                        </Col>

                    </Row>
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
                        <CardBody className='d-flex justify-content-between rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                            <Row style={{ width: '100%' }}>
                                <Col md={8}>
                                    {data?.length > 0 &&
                                        <Chart chartType="PieChart" width="100%" height="400px" options={options} data={data} key={JSON.stringify(data)} />}
                                </Col>
                                <Col md={4}>
                                    <h4>{selectedValue}</h4>
                                    {dataList?.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE).slice(1, 10)  // Sorting by priority, assuming higher priority comes first
                                        .map((item, index) => (
                                            <p key={index} style={{ color: 'white', fontSize: '15px' }}>
                                                {item.INSTRUMENTIDENTIFIER.slice(0, -1)} added <Badge bg={`${item.PRICECHANGE > 0 ? 'success' : 'danger'}`}>{item.PRICECHANGE}</Badge> pts
                                            </p>
                                        ))}
                                </Col>
                            </Row>

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
