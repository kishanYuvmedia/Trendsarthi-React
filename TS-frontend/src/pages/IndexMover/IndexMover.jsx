import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import _, { isEmpty, result, set } from "lodash";
let bgvector = './images/vector2.png';
import Badge from 'react-bootstrap/Badge';
import { Chart } from "react-google-charts";
const IndexMover = () => {
    const [selectedValue, setSelectedValue] = useState('NIFTY 50');
    const [list, setList] = useState([]);
    const [mata, setMata] = useState(null); // Assuming mata is an object
    const [advances, setAdvances] = useState(0);
    const [declines, setDeclines] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState(null);
    const [datalist, setDatalist] = useState([]);
    const fetchData = async (value) => {
        console.log("data value", value);
        try {
            const url = `/api/equity-stockIndices?index=${value}`;
            const headers = {
                Referer: `https://www.nseindia.com/market-data/live-equity-market?symbol=${value}`,
                'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            };

            const response = await axios.get(url, { headers });

            // Check for successful response (status code 200)
            if (response.status === 200) {
                setList(response.data.data);

                // Handle potential data structure variations
                const outputData = [
                    ["symbol", "Price Change"], // Header row
                    ...response.data.data.slice(1, 10).map(item => [item.symbol, item.pChange || 0])
                ];

                setDatalist(outputData);
                setMata(response.data.metadata || {});

                // Handle potential data structure variations for advance/decline data
                const advanceData = response.data.advance || {};
                const total =
                    Number(advanceData.advances || 0) +
                    Number(advanceData.declines || 0) +
                    Number(advanceData.unchanged || 0);

                setAdvances(Number(advanceData.advances || 0));
                setDeclines(Number(total) - Number(advanceData.advances || 0));

                // Calculate percentage with default value if advanceData.advances is 0 or undefined
                const advancesCount = Number(advanceData.advances || 0);
                setPercentage(advancesCount === 0 ? 0 : (advancesCount / total) * 100);

            } else {
                // Handle non-200 status codes (e.g., 404, 500)
                setError(`Failed to fetch data: Server responded with status ${response.status}`);
            }

        } catch (error) {
            setError(`Failed to fetch data: ${error.message}`);
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchData(selectedValue);
    }, []);
    const handleChange = (event) => {
        console.log("data event", event.target.value);
        setSelectedValue(event.target.value);
        fetchData(event.target.value);
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (list.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>

                    <div className="card mb-0">
                        <div className="card-body px-0 pt-0">
                            <div className="row d-flex justify-content-end">
                                <div className="col-6 col-md-8 pb-3">
                                    <div className="fs-1 fw-bold text-white">Index Mover</div>
                                </div>
                                <div className="col-6 col-md-4 d-flex justify-content-end">
                                    <select value={selectedValue}
                                        onChange={handleChange} className="form-select form-select-sm" aria-label="Default select example">
                                        <option selected value="NIFTY 50">NIFTY 50</option>
                                        <option value="NIFTY BANK">BANKNIFTY</option>
                                        <option value="NIFTY FINANCIAL SERVICES">FINNIFTY</option>
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
                                    padding: '10px',
                                    backgroundColor: "#181a33",
                                    backgroundImage: `url(${bgvector})`,
                                    backgroundPosition: "bottom -1px right -1px",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                <CardBody className='d-flex justify-content-between rounded-4  '>
                                    <div className="pb-3">
                                        <div className="fs-1 fw-bold text-gradient w-100">{selectedValue}</div>
                                    </div>
                                    <div className="fs-3 text-white">
                                        UP {Math.round(mata?.change)} pts <br />
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
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='d-flex justify-content-between rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div className="w-100">
                                        <div className="fw-bold mb-2 text-white">Gainers / Losers</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: `60%` }} aria-valuenow={advances} aria-valuemin="0" aria-valuemax={100}></div>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: `40%` }} aria-valuenow={declines} aria-valuemin="0" aria-valuemax={100}></div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-2 text-white">
                                            <div>
                                                <i className='bx bxs-circle text-success'></i> Gainers: {advances}
                                            </div>
                                            <div>
                                                <i className='bx bxs-circle text-danger'></i> Losers: {declines}
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
                                    {datalist.length > 0 && <Chart chartType="PieChart" width="100%"
                                        height="400px"
                                        legendToggle data={datalist} />}

                                </Col>
                                <Col md={4}>
                                    <h4>{selectedValue} is down by {Math.round(mata.change)} pts</h4>
                                    {list?.slice(1, 10)
                                        .sort((a, b) => b.priority - a.priority)  // Sorting by priority, assuming higher priority comes first
                                        .map((item, index) => (
                                            <p key={index} style={{ color: 'white', fontSize: '12px' }}>
                                                {item.symbol} added <Badge bg={`${item.pChange > 0 ? 'success' : 'danger'}`}>{item.pChange}</Badge> pts
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

IndexMover.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(IndexMover);
