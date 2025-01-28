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
    useEffect(() => {
        shortProductListDataList().then(result => {
            if (result && result.length > 0) {
                console.log("Result:", result);
                setData(result);
                if (result && result.length > 0) {
                    console.log("Processing result in chunks...");
                    const allFormattedData = []; // Array to store formatted data
                    result.forEach((chunk) => {
                        const formattedChunk = chunk.map(([INSTRUMENTIDENTIFIER, PRICECHANGE]) => [
                            typeof INSTRUMENTIDENTIFIER === "string" ? INSTRUMENTIDENTIFIER.slice(0, -2) : INSTRUMENTIDENTIFIER,
                            "All Stocks",
                            PRICECHANGE,
                        ]);

                        allFormattedData.push(...formattedChunk); // Append to the final result
                    });

                    setData(result.flat()); // Flatten original result for `setData`
                    setMergedData((prevData) => [...prevData, ...allFormattedData]);

                    console.log("Formatted Data:", allFormattedData);
                }
                console.log("final data", formattedData);
                setMergedData((prevData) => [...prevData, ...formattedData]);
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
                            <MomentumSpike header={"5 Min Momentum Spike"} data={mergedData} />
                        </Col>
                        <Col md={12}>
                            <MomentumSpike header={"10 Min Momentum Spike"} data={mergedData} />
                        </Col>
                    </Row>
                    {!isEmpty(data) &&
                        <Row>
                            <Col md={6} id="right" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)} type={'highPowerd'} header={"LOM SHORT TERM"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.PRICECHANGEPERCENTAGE
                                    - a.PRICECHANGEPERCENTAGE
                                )} type={'highPowerd'} header={"LOM LONG TERM"} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.VALUE
                                    - a.VALUE
                                )} type={'highPowerd'} header={"CONTRACTION BO"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => a.BUYQTY - b.BUYQTY
                                )} type={'highPowerd'} header={"DAY H/L REVERSAL"} tableId={'pow4'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={data.sort((a, b) => b.TOTALQTYTRADED - a.TOTALQTYTRADED)} type={'highPowerd'} header={"2 DAY H/L BO"} tableId={'pow5'} />
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
