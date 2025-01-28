import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import axios from 'axios';
import _, { isEmpty, result, set } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import { shortProductListDataList } from "services/api/api-service"
const SwingSpectrum = (props) => {
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
                            <div className="fs-1 fw-bold text-gradient">Swing Spectrum</div>
                        </div>
                    </div>
                    {!isEmpty(data) &&
                        <Row>
                            <Col md={6} id="right" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"10 DAY BO"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => a.PRICECHANGE
                                    - b.PRICECHANGE
                                )} type={'highPowerd'} header={"50 DAY BO"} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"REVERSAL RADAR"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"CHANNEL BO"} tableId={'pow4'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE
                                    - a.PRICECHANGE
                                )} type={'highPowerd'} header={"NR7"} tableId={'pow4'} />
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col md={12} >
                            {/* <MomentumSpike header={"Weekly Watch"} /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} >
                            {/* <DailyScanner list={list} header={"Delivery Scanner"} tableId={'delivery'} /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

SwingSpectrum.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(SwingSpectrum);
