import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSSR, withTranslation } from "react-i18next";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import { symbolStock } from "services/api/api-service";
import CardSlider from "./CardSlider";
const MarketPulse = (props) => {
    const [list, setlist] = useState([]);
    useEffect(() => {
        document.title = "Market Pulse | Trendsarthi";
        dragula([
            document.getElementById("left"),
            document.getElementById("right"),
            document.getElementById("left1"),
            document.getElementById("right2"),
            document.getElementById("left3"),
            document.getElementById("right3"),
        ]);

        if (!document.getElementById("tradingview-script")) {
            const script = document.createElement("script");
            script.id = "tradingview-script";
            script.type = "text/javascript";
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                symbols: [
                    { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
                    { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
                    { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
                    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                ],
                isTransparent: false,
                showSymbolLogo: true,
                displayMode: "adaptive",
                colorTheme: "dark",
                locale: "en",
            });
            document.getElementById("tradingview-widget").appendChild(script);
        }
        fetch();
    }, []);
    function fetch() {
        symbolStock('NSE')
            .then(result => {
                if (!isEmpty(result)) {
                    console.log('Result is not empty:', result.symbolStock?.Item); // Log the symbol list
                    setlist(result.symbolStock?.Item);
                } else {
                    console.log('Result is empty');
                }
            })
            .catch(error => {
                console.error('Error fetching symbol list:', error); // Log any errors
            });
    }
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
                                <TableCard list={list}  type={'highPowerd'} header={"HIGH POW. STOCKS"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={list}  type={'highPowerd'} header={"INTRADAY BOOST"} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={list}  type={'highPowerd'} header={"TOP LEVEL STOCKS"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={list}  type={'highPowerd'} header={"LOW LEVEL STOCKS"} tableId={'pow4'} />
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
