import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import { withTranslation } from "react-i18next";
import _, { isEmpty } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import CardSlider from "./CardSlider";
import { shortProductListDataList } from "services/api/api-service"
const MarketPulse = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        shortProductListDataList().then(result => {
            if (!isEmpty(result)) {
                console.log("result", result)
                setData(result);
            }
        })
    }, [])
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
                    {!isEmpty(data) &&
                        <Row>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => b.OPENINTEREST
                                    - a.OPENINTEREST
                                )} type={'highPowerd'} header={"Momentum Movers"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => b.PRICECHANGEPERCENTAGE
                                    - a.PRICECHANGEPERCENTAGE
                                )} type={'highPowerd'} header={"INTRADAY BOOST"} />


                                
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => b.AVERAGETRADEDPRICE - a.AVERAGETRADEDPRICE)} type={'highPowerd'} header={"Bull Force"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => a.OPENINTERESTCHANGE
                                    - b.OPENINTERESTCHANGE
                                )} type={'highPowerd'} header={"Bear Force"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => a.OPENINTERESTCHANGE
                                    - b.OPENINTERESTCHANGE
                                )} type={'highPowerd'} header={"Turbo Trades"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => a.OPENINTERESTCHANGE
                                    - b.OPENINTERESTCHANGE
                                )} type={'highPowerd'} header={"wealth Winners"} />
                            </Col>
                            <Col md={12} className="hideOnDesktop mb-3">
                                <CardSlider list={data.sort((a, b) => a.OPENINTERESTCHANGE
                                    - b.OPENINTERESTCHANGE
                                )} type={'highPowerd'} header={"wealth Loosers"} />
                            </Col>
                        </Row>
                    }
                    {!isEmpty(data) &&
                        <Row>
                            <Col md={6} id="right" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.OPENINTEREST
                                    - a.OPENINTEREST
                                )} type={'highPowerd'} header={"Momentum Movers"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGEPERCENTAGE
                                    - a.PRICECHANGEPERCENTAGE
                                )} type={'highPowerd'} header={"Bull Force"} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.AVERAGETRADEDPRICE - a.AVERAGETRADEDPRICE)} type={'highPowerd'} header={"Bear Force"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => a.OPENINTERESTCHANGE
                                    - b.OPENINTERESTCHANGE
                                )} type={'highPowerd'} header={"Turbo Trades"} tableId={'pow4'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"wealth Winners"} tableId={'pow5'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"wealth Loosers"} tableId={'pow5'} />
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
