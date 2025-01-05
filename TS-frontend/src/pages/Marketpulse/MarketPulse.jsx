import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import { withTranslation } from "react-i18next";
import _, { isEmpty } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import CardSlider from "./CardSlider";
const MarketPulse = () => {
    const [selectedValue, setSelectedValue] = useState('NIFTY 50');
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const fetchData = async (value) => {
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
                localStorage.setItem("marketPulseData", JSON.stringify(response.data.data));
            } else {
                // Handle non-200 status codes (e.g., 404, 500)
                setError(`Failed to fetch data: Server responded with status ${response.status}`);
            }

        } catch (error) {
            setError(`Failed to fetch data: ${error.message}`);
            console.error('Error:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (list.length === 0) {
        return <div>Loading...</div>;
    }
    const loadFromLocalStorage = () => {
        const storedData = localStorage.getItem("marketPulseData");
        if (storedData) {
            setList(JSON.parse(storedData));
            setLoading(false);
        } else {
            fetchData("NIFTY 50");
        }
    };
    useEffect(() => {
        loadFromLocalStorage();
    }, []);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="card mb-0">
                        <div className="card-body p-0">
                            <div className="tradingview-widget-container h-0" id="tradingview-widget">
                                <div className="tradingview-widget-container__widget"></div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-0">
                        <div className="card-body px-0">
                            <div className="fs-1 fw-bold text-gradient">Market Pulse</div>
                        </div>
                    </div>
                    {!isEmpty(list) &&
                        <Row>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={list} type={'highPowerd'} header={"HIGH POWERED STOCKS"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={list} type={'highPowerd'} header={"INTRADAY BOOST"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={list} type={'highPowerd'} header={"TOP LEVEL STOCKS"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={list} type={'highPowerd'} header={"LOW LEVEL STOCKS"} />
                            </Col>
                        </Row>
                    }
                    {!isEmpty(list) &&
                        <Row>
                            <Col md={6} id="right" className="hideOnMobile">
                                <TableCard list={list.sort((a, b) => b.pChange - a.pChange)} type={'highPowerd'} header={"LOM SHORT TERM"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={list.sort((a, b) => b.perChange365d - a.perChange365d)} type={'highPowerd'} header={"LOM LONG TERM"} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={list.sort((a, b) => b.totalTradedVolume
                                    - a.totalTradedVolume
                                )} type={'highPowerd'} header={"CONTRACTION BO"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={list.sort((a, b) => a.dayHigh
                                    - b.dayHigh
                                )} type={'highPowerd'} header={"DAY H/L REVERSAL"} tableId={'pow4'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={list.sort((a, b) => b.perChange30d - a.perChange30d)} type={'highPowerd'} header={"2 DAY H/L BO"} tableId={'pow5'} />
                            </Col>
                        </Row>
                    }
                </Container>
            </div>
        </React.Fragment>
    );
};
MarketPulse.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(MarketPulse);
