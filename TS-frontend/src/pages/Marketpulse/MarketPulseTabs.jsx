import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import { withTranslation } from "react-i18next";
import dragula from "dragula";
import TableCard from "pages/Marketpulse/TableCard";
import { NavLink } from "react-router-dom";
import { shortProductListDataList } from "services/api/api-service"
import _, { isEmpty } from "lodash";
const MarketPulseTabs = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    useEffect(() => {
        document.title = "Market Pulse Tabs | Trendsarthi";
        dragula([
            document.getElementById("left"),
            document.getElementById("right"),
            document.getElementById("left1"),
            document.getElementById("right2"),
            document.getElementById("left3"),
            document.getElementById("right3"),
        ]);
    }, []);

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
   const [data, setData] = useState([]);
    useEffect(() => {
        shortProductListDataList().then(result => {
            if (!isEmpty(result)) {
                console.log("result MarketPulseTabs", result)
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
                            <div className="fs-1 fw-bold text-gradien text-center">Market Pulse</div>
                        </div>
                    </div>
                    <Row>
                        <div className="my-3">
                            <Nav card fill pills tabs className="nav-tabs-custom">
                                <NavItem>
                                    <NavLink
                                        className={activeTab === '1' ? "active bg-success px-3 py-2 rounded-3 border border-seccuss" : "px-3 py-2 border border-secondary rounded-3"}
                                        onClick={() => toggleTab('1')}
                                    >
                                        HIGH POW. STOCKS
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === '2' ? "active bg-success px-3 py-2 rounded-3 border border-seccuss" : "px-3 py-2 border border-secondary rounded-3"}
                                        onClick={() => toggleTab('2')}
                                    >
                                        INTRADAY BOOST
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === '3' ? "active bg-success px-3 py-2 rounded-3 border border-seccuss" : "px-3 py-2 border border-secondary rounded-3"}
                                        onClick={() => toggleTab('3')}
                                    >
                                        TOP LEVEL STOCKS
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === '4' ? "active bg-success px-3 py-2 rounded-3 border border-seccuss" : " px-3 py-2 border border-secondary rounded-3"}
                                        onClick={() => toggleTab('4')}
                                    >
                                        LOW LEVEL STOCKS
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab} className="mt-3">
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12" className="p-0">
                                        <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"LOM SHORT TERM"} tableId={'pow1'} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12" className="p-0">
                                        <TableCard list={data.sort((a, b) => b.PRICECHANGEPERCENTAGE- a.PRICECHANGEPERCENTAGE )} type={'highPowerd'} header={"LOM LONG TERM"} tableId={'pow2'} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col sm="12" className="p-0">
                                        <TableCard list={data.sort((a, b) => b.AVERAGETRADEDPRICE - a.AVERAGETRADEDPRICE )} type={'highPowerd'} header={"CONTRACTION BO"} tableId={'pow3'} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="4">
                                    <Row>
                                        <Col sm="12" className="p-0">
                                        <TableCard list={data.sort((a, b) => a.OPENINTERESTCHANGE - b.OPENINTERESTCHANGE)} type={'highPowerd'} header={"DAY H/L REVERSAL"} tableId={'pow4'} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

MarketPulseTabs.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(MarketPulseTabs);
