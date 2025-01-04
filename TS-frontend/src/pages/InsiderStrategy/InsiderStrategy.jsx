import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import _, { isEmpty, result, set } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import MomentumSpike from "./MomentumSpike";
import axios from 'axios';
const InsiderStrategy = (props) => {
    const [list, setlist] = useState([]);
    const [dataTime, setDataTime] = useState([]);
    useEffect(() => {
        document.title = "Insider Strategy | Trendsarthi";
    }, []);
    const [selectedValue, setSelectedValue] = useState('NIFTY 50');
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const url = `/api/equity-stockIndices?index=${selectedValue}`;
            const headers = {
                'Referer': `https://www.nseindia.com/market-data/live-equity-market?symbol=${selectedValue}`,
                'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            };
            const response = await axios.get(url, { headers });
            setlist(response.data.data);
            const dataTime1 = [
                ...response.data.data.slice(1, 10).map(item => [item.symbol, item.pChange])
            ];
            //console.log('Data:', response.data.data);
            setDataTime(dataTime1);
        } catch (error) {
            setError(`Failed to fetch data: ${error.message}`);
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
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
                        <div className="card-body px-0">
                            <div className="fs-1 fw-bold text-gradient">Insider Strategy</div>
                        </div>
                    </div>
                    <Row>
                        <Col md={12}>
                            <MomentumSpike header={"5 Min Momentum Spike"} data={dataTime} />
                        </Col>
                        <Col md={12}>
                            <MomentumSpike header={"10 Min Momentum Spike"} data={dataTime} />
                        </Col>
                    </Row>
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

InsiderStrategy.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(InsiderStrategy);
