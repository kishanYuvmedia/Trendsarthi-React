import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import {
    getStrikePrice,
    geIntradayDataLimit,
    shortGraphList,
    shortProductListDataList,
    fnoranking,
} from "services/api/api-service";
import CardDrag from "pages/Dashboard/components/CardDrag";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import BarChart from "../AllCharts/barchart";
import ProgressBar from "components/Common/ProgressBar";
import BuildBarChart from "../AllCharts/buildBarChart";
import TableCard from "pages/Dashboard/components/TableCard";

const MarketPulse = (props) => {
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
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="tradingview-widget-container h-0"  id="tradingview-widget">
                                <div className="tradingview-widget-container__widget"></div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="fs-1 fw-bold text-gradient">Market Pulse</div>
                        </div>
                    </div>
                    <Row>
                        <Col md={6} id="right">
                            <TableCard header={"HIGH POW. STOCKS"} />
                        </Col>
                        <Col md={6} id="left">
                            <CardDrag header={"Progress Chart"}>
                                table 1
                            </CardDrag>
                        </Col>
                        <Col md={12} id="left1">
                            <CardDrag header={"Movement Chart"}>
                                table 2
                            </CardDrag>
                        </Col>
                    </Row>
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
