import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import SectorList from "./SectorList";
import SectorBarScope from "./SectorBarScope";
import MomentumSpikeMulti from "pages/InsiderStrategy/MomentumSpikemulti";
import { shortProductListDataList } from "services/api/api-service";
import { sector } from "../dataType/sector";
const SectorScope = (props) => {
    const [sectorData, setSectorData] = useState([]);
    let [mergedData, setMergedData] = useState([
        ["Symbol", "Parent", "Price"],
        ['ALL', null, 0],
        ['Financial Services', 'ALL', 0],
        ['Pharmaceuticals', 'ALL', 0],
        ['Consumer Goods', 'ALL', 0],
        ['Automotive', 'ALL', 0],
        ['Construction & Infrastructure', 'ALL', 0],
        ['Energy', 'ALL', 0],
        ['Metals & Mining', 'ALL', 0],
        ['Telecommunications', 'ALL', 0],
        ['Airlines', 'ALL', 0],
        ['Media & Entertainment', 'ALL', 0],
        ['Technology', 'ALL', 0],
        ['Logistics', 'ALL', 0],
        ['Chemicals & Fertilizers', 'ALL', 0],
        ['Engineering', 'ALL', 0],
        ['Textiles', 'ALL', 0],
        ['Sugar', 'ALL', 0],
        ['Hotels & Tourism', 'ALL', 0],
        ['Other', 'ALL', 0],
        ['Information Technology', 'ALL', 0],
    ]);
    useEffect(() => {
        const symbolToSector = {};
        sector.forEach(stock => {
            symbolToSector[stock.symbol] = stock.sector;
        });
        document.title = "Sector Scope | Trendsarthi";
        shortProductListDataList().then(result => {
            const enrichedData = [];
            let filteredData = [];
            if (!isEmpty(result)) {
                sector.forEach(stock => {
                    filteredData = result.filter(item => `${stock.symbol}-I` === item.INSTRUMENTIDENTIFIER);
                    // Check if filteredData is not empty before adding to enrichedData
                    if (filteredData.length > 0) {  // Or if (filteredData[0]) if you only expect one match.
                        enrichedData.push({ ...filteredData[0], sector: stock.sector });
                    } else {
                        console.warn(`No match found for symbol: ${stock.symbol}`); // Optional warning
                        // or enrichedData.push({ symbol: stock.symbol, sector: stock.sector, not_found: true }); // Add a flag
                    }
                });
                setSectorData(enrichedData);
                const formattedData = enrichedData
                    .sort((a, b) => b.PRICECHANGE - a.PRICECHANGE)
                    .map(({ INSTRUMENTIDENTIFIER, PRICECHANGE, sector }) => {
                        const symbol = INSTRUMENTIDENTIFIER.slice(0, -2); // Extract symbol
                        const priceChange = Number(PRICECHANGE); // Convert to number (handle potential errors)
                        if (isNaN(priceChange)) {
                            console.warn(`Invalid PRICECHANGE value for ${symbol}: ${PRICECHANGE}. Using 0.`);
                            return null; // Or return a default value: [symbol, sector, 0]
                        }
                        return [symbol, sector, priceChange]; // Return the correctly formatted row
                    })
                    .filter(row => row !== null); // Remove any rows with invalid PRICECHANGE

                setMergedData(prevData => {
                    return [...prevData, ...formattedData];
                });
            }
        })
    }, []);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="card mb-0">
                        <div className="card-body px-0">
                            <div className="fs-1 fw-bold text-gradient">Sector Scope</div>
                        </div>
                    </div>
                    <Row>
                        <Col md={12}>
                            <MomentumSpikeMulti header={"Sector Scope"} data={mergedData} />
                        </Col>
                        <Col md={12}>
                            <SectorBarScope header={"Sector Scope"} data={[]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"Financial Services"} tableId={'pow1'} lists={sectorData.filter(item => item.sector === 'Financial Services')} />
                        </Col>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"Pharmaceuticals"} tableId={'pow1'} lists={sectorData.filter(item => item.sector === 'Pharmaceuticals')} />
                        </Col>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"Automotive"} tableId={'pow1'} lists={sectorData.filter(item => item.sector === 'Automotive')} />
                        </Col>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"Information Technology"} tableId={'pow1'} lists={sectorData.filter(item => item.sector === 'Information Technology')} />
                        </Col>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"Energy"} tableId={'pow1'} lists={sectorData.filter(item => item.sector === 'Energy')} />
                        </Col>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"Technology"} tableId={'pow1'} lists={sectorData.filter(item => item.sector === 'Technology')} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

SectorScope.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(SectorScope);
