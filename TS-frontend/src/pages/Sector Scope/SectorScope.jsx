import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import SectorList from "./SectorList";
import MomentumSpike from "pages/InsiderStrategy/MomentumSpike";
import SectorBarScope from "./SectorBarScope";

const SectorScope = (props) => {
    const [dataTime, setDataTime] = useState([]);
    const [mergedData, setMergedData] = useState([
        ["Symbol", "Parent", "Price Change"],
        ["All Stocks", null, 0],
    ]);

    const getSectorList = async () => {
        const sectors = [
            "NIFTY AUTO",
            "NIFTY BANK",
            "NIFTY ENERGY",
            "NIFTY FINANCIAL SERVICES",
            "NIFTY FINANCIAL SERVICES 25/50",
            "NIFTY FMCG",
            "NIFTY IT",
            "NIFTY MEDIA",
            "NIFTY METAL",
            "NIFTY PHARMA",
            "NIFTY PSU BANK",
            "NIFTY REALTY",
            "NIFTY PRIVATE BANK",
            "NIFTY HEALTHCARE INDEX",
            "NIFTY CONSUMER DURABLES",
            "NIFTY OIL & GAS",
            "NIFTY MIDSMALL HEALTHCARE",
            "NIFTY FINANCIAL SERVICES EX-BANK",
            "NIFTY MIDSMALL FINANCIAL SERVICES",
            "NIFTY MIDSMALL IT & TELECOM",
        ];
        try {
            const allData = [["Symbol", "Parent", "Price Change"], ["All Stocks", null, 0]];

            for (const sector of sectors) {
                try {
                    const response = JSON.parse(localStorage.getItem(`${sector}`));
                    if (response && response.data && response.data.data) {
                        const sectorData = response.data.data.slice(1, 10).map(item => [
                            item.symbol,
                            sector,
                            item.pChange,
                        ]);
                        allData.push(allData, ...sectorData);
                    } else {
                        console.warn(`No data found for sector: ${sector}`);
                    }
                } catch (error) {
                    console.error(`Error fetching data for sector: ${sector}`, error.message);
                }
            }

            setMergedData(allData); // Update the state once with all the data
            console.log("Merged Data:", allData);
        } catch (error) {
            console.error("Error fetching sector data:", error.message);
            throw new Error(`Failed to fetch sector data: ${error.message}`);
        }
    };
    useEffect(() => {
        getSectorList();
        document.title = "Sector Scope | Trendsarthi";
        dragula([
            document.getElementById("left"),
            document.getElementById("right"),
            document.getElementById("left1"),
            document.getElementById("right2"),
            document.getElementById("left3"),
            document.getElementById("right3"),
        ]);
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
                            <MomentumSpike header={"Sector Scope"} data={mergedData} />
                        </Col>
                        <Col md={12}>
                            <SectorBarScope header={"Sector Scope"} data={mergedData} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} id="right" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY 50"} tableId={'pow1'} listType={'NIFTY BANK'} />
                        </Col>
                        <Col md={6} id="left" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY MEDIA"} tableId={'pow2'} listType={'NIFTY MEDIA'} />
                        </Col>
                        <Col md={6} id="left1" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY PHARMA"} tableId={'pow3'} listType={'NIFTY PHARMA'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"AUTO"} tableId={'pow4'} listType={'NIFTY AUTO'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"IT"} tableId={'pow4'} listType={'NIFTY IT'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY FMCG"} tableId={'pow4'} listType={'NIFTY FMCG'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY PRIVATE BANK"} tableId={'pow4'} listType={'NIFTY PRIVATE BANK'} />
                        </Col>
                        <Col md={6} id="left3" className="hideOnMobile">
                            <SectorList type={'highPowerd'} header={"NIFTY PSE"} tableId={'pow4'} listType={'NIFTY PSE'} />
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
