import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import _, { isEmpty, result, set } from "lodash";
import { nifty, banknifty, finnifty, midcpnifty } from './type.js';
let bgvector = './images/vector2.png';
import Badge from 'react-bootstrap/Badge';
import { Chart } from "react-google-charts";
import { t } from "i18next";
import { shortProductListDataList } from "services/api/api-service";
import {
    getStrikePrice,
  } from "../../services/api/api-service"
const IndexMover = () => {
    const [typeList] = useState(["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"])
    const [selectedValue, setSelectedValue] = useState("NIFTY");
    const [data, setData] = useState([]);
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
    const [pts,setPts]=useState(0);
    const [priceChg,setpriceChg]=useState(0);
    const fetchData = async () => {
        try {
            const resultStrike = await getStrikePrice(selectedValue)
            console.log("resultStrike", resultStrike)
            let closePrice = resultStrike.StrikePrice.Item.CLOSE
            let openPrice = resultStrike.StrikePrice.Item.OPEN
            console.log("priceCloseopten", Number(closePrice)-Number(openPrice));
            setPts(closePrice-openPrice);
            setpriceChg(resultStrike.StrikePrice.Item.PRICECHANGEPERCENTAGE)
        } catch (err) {
            console.error("Error fetching data:", err)
        }
    }
    useEffect(() => {
        shortProductListDataList().then(result => {
            if (!isEmpty(result)) {
                console.log("result", result)
                setDataList(result);
                const outputData = [
                    ["symbol", "Price Change"], // Header row
                    ...result.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE).slice(1, 10).map(item => [item.INSTRUMENTIDENTIFIER, item.PRICECHANGEPERCENTAGE || 0])
                ];
                console.log("outputData", outputData);
                setData(outputData);
                fetchData();
            }
        })
        
    }, [selectedValue])
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="card mb-0">
                        <div className="card-body px-0 pt-0">
                            <div className="row d-flex justify-content-end">
                                <div className="col-9 col-md-9 pb-3">
                                    <div className="fs-1 fw-bold text-white">Index Mover</div>
                                </div>
                                <div className="col-3 col-md-3 d-flex justify-content-end">
                                    <select value={selectedValue}
                                        onChange={handleChange} className="form-select form-select-sm" aria-label="Default select example">
                                        {typeList.map(item => (
                                            <option selected value={item}>{item}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Row>
                        <Col md={3} >
                            <Card
                                className="my-2 Drag "
                                style={{
                                    border: '1px solid transparent',
                                    borderRadius: '14px',
                                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '8px',
                                    backgroundColor: "#181a33",
                                    backgroundImage: `url(${bgvector})`,
                                    backgroundPosition: "bottom -1px right -1px",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                <CardBody className='d-flex justify-content-between rounded-4  '>
                                    <div className="pb-3">
                                        <div className="fs-1 fw-bold text-gradient w-100">{selectedValue}</div>
                                        <div className="fs-1 fw-bold text-gradient w-100">{priceChg}</div>
                                    </div>
                                    <div className="fs-3 text-white">
                                        UP {pts.toFixed(2)}pts <br />
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                        <Col md={9} >
                            <Card
                                className="my-2 Drag "
                                style={{
                                    border: '1px solid transparent',
                                    borderRadius: '14px',
                                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    paddingTop:'30px',
                                    paddingBottom:'30px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='d-flex justify-content-between rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div className="w-100">
                                        <div className="fw-bold mb-2 text-white">Gainers / Losers</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: `60%` }} aria-valuenow={0} aria-valuemin="0" aria-valuemax={100}></div>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: `40%` }} aria-valuenow={0} aria-valuemin="0" aria-valuemax={100}></div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-2 text-white">
                                            <div>
                                                <i className='bx bxs-circle text-success'></i> Gainers: {0 || 0}
                                            </div>
                                            <div>
                                                <i className='bx bxs-circle text-danger'></i> Losers: {0 || 0}
                                            </div>
                                        </div>
                                    </div>

                                </CardBody>

                            </Card>
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
                                    <h4>{selectedValue} is down by {priceChg} pts</h4>
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
            {/* <FyersIntegration /> */}
        </React.Fragment>
    );
};
IndexMover.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(IndexMover);
