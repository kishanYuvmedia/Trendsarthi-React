import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import _, { isEmpty } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import MomentumSpike from "./MomentumSpike";
import { shortProductListDataList } from "services/api/api-service"
const InsiderStrategy = (props) => {
    let [data, setData] = useState([]);
    useEffect(() => {
        document.title = "Insider Strategy | Trendsarthi";
    }, []);
    let [mergedData, setMergedData] = useState([
        ["Symbol", "Parent", "Price Change"],
        ["All Stocks", null, 0],
    ]);
    let [mergedData10, setMergedData10] = useState([
        ["Symbol", "Parent", "Price Change"],
        ["All Stocks", null, 0],
    ]);
    const calculateMomentumSpike = (stocks) => {
        return stocks.slice(2).map(stock => {
            const priceChange = stock.CLOSE - stock.OPEN;
            const volumeChange = stock.TOTALQTYTRADED - stock.LASTTRADEQTY;
            const turnoverChange = (stock.AVERAGETRADEDPRICE * stock.TOTALQTYTRADED) - (stock.LASTTRADEPRICE * stock.LASTTRADEQTY);

            const momentumScore = (priceChange * 0.5) + (volumeChange * 0.3) + (turnoverChange * 0.2);

            return { ...stock, MOMENTUM_SCORE: momentumScore.toFixed(2) };
        }).sort((a, b) => b.MOMENTUM_SCORE - a.MOMENTUM_SCORE);
    };
    const calculateLOM = (stocks) => {
        return stocks.slice(2).map(stock => {
            const typicalPrice = (stock.HIGH + stock.LOW + stock.CLOSE) / 3;
            const vwap = (typicalPrice * stock.TOTALQTYTRADED) / stock.TOTALQTYTRADED;

            const priceChange = stock.CLOSE - stock.OPEN;
            const volumeChange = stock.TOTALQTYTRADED - stock.LASTTRADEQTY;
            const vwapDeviation = (stock.CLOSE - vwap) / vwap;

            const currentMomentum = (priceChange * 0.5) + (volumeChange * 0.3) + (vwapDeviation * 0.2);
            const lom = stock.PREVIOUS_MOMENTUM
                ? ((stock.PREVIOUS_MOMENTUM - currentMomentum) / stock.PREVIOUS_MOMENTUM) * 100
                : 0;
            return {
                ...stock,
                CHANGE_PERCENT: lom.toFixed(2),
            };
        }).sort((a, b) => b.CHANGE_PERCENT - a.CHANGE_PERCENT);
    };
    useEffect(() => {
        shortProductListDataList().then(result => {
            if (result?.length > 0) {
                console.log("Result:", result);
                const value = calculateLOM(result);
                setData(value.flat()); // Flatten the original result for `setData`
                console.log("Processing result in chunks...", value);
                const calculateData = calculateMomentumSpike(result);
                const formattedData5Minute = result
                    .sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)
                    .slice(2)
                    .map(({ INSTRUMENTIDENTIFIER, PRICECHANGE }) => [
                        INSTRUMENTIDENTIFIER.slice(0, -2),
                        "All Stocks",
                        PRICECHANGE,
                    ]);
                const formattedData10Minute = calculateData
                    .sort((a, b) => b.MOMENTUM_SCORE - a.MOMENTUM_SCORE)
                    .slice(2)
                    .map(({ INSTRUMENTIDENTIFIER, PRICECHANGE }) => [
                        INSTRUMENTIDENTIFIER.slice(0, -2),
                        "All Stocks",
                        PRICECHANGE,
                    ]);
                console.log("Formatted 5 minute Data:", formattedData5Minute);
                console.log("Formatted 10 minute Data:", formattedData10Minute);
                setMergedData((prevData) => [...prevData, ...formattedData5Minute]);
                setMergedData10((prevData) => [...prevData, ...formattedData10Minute]);
            }
        })
    }, [])
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
                            <MomentumSpike header={"5 min Flash momentum"} data={mergedData} />
                        </Col>
                        <Col md={12}>
                            <MomentumSpike header={"10 min Flash momentum"} data={mergedData10} />
                        </Col>
                    </Row>
                    {!isEmpty(data) &&
                        <Row>
                            <Col md={6} id="right" className="hideOnMobile">
                                <TableCard list={data.map(stock => ({
                                    ...stock,
                                    CHANGE_PERCENT: ((stock.BUYPRICE-stock.LOW)/stock.LOW).toFixed(2) 
                                })).sort((a, b) => a.CHANGE_PERCENT - b.CHANGE_PERCENT)} type={'highPowerd'} header={"Short term track"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={data.map(stock => ({
                                    ...stock,
                                    CHANGE_PERCENT: ((stock.BUYPRICE-stock.LOW)/stock.LOW).toFixed(2) 
                                })).sort((a, b) => a.CHANGE_PERCENT - b.CHANGE_PERCENT)} type={'highPowerd'} header={"Long Term track "} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={data.map(stock => ({
                                    ...stock,
                                    CHANGE_PERCENT: ((stock.BUYPRICE-stock.LOW)/stock.LOW).toFixed(2) 
                                })).sort((a, b) => a.CHANGE_PERCENT - b.CHANGE_PERCENT)} type={'highPowerd'} header={"Contraction Signal"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.map(stock => ({
                                    ...stock,
                                    CHANGE_PERCENT: ((stock.BUYPRICE-stock.LOW)/stock.LOW).toFixed(2) 
                                })).sort((a, b) => a.CHANGE_PERCENT - b.CHANGE_PERCENT)} type={'highPowerd'} header={"Intraday Flip"} tableId={'pow4'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.map(stock => ({
                                    ...stock,
                                    CHANGE_PERCENT: ((stock.BUYPRICE-stock.LOW)/stock.LOW).toFixed(2) 
                                })).sort((a, b) => a.CHANGE_PERCENT - b.CHANGE_PERCENT)} type={'highPowerd'} header={"2D Breakout Trigger"} tableId={'pow5'} />
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
