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
const SectorScope = (props) => {
    const [mergedData, setMergedData] = useState([]);
    const [mergedDataAll, setMergedDataAll] = useState([]);
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
            "NIFTY HEALTHCARE INDEX",
            "NIFTY CONSUMER DURABLES",
            "NIFTY OIL & GAS",
            "NIFTY MIDSMALL HEALTHCARE",
            "NIFTY FINANCIAL SERVICES EX-BANK",
            "NIFTY MIDSMALL FINANCIAL SERVICES",
            "NIFTY MIDSMALL IT & TELECOM",
        ];
        try {
            const allData = [
                ["Element", "Sectors", { role: "style" }],
            ];
            const allDatalist = [];
            for (const sector of sectors) {
                try {
                    const response = JSON.parse(localStorage.getItem(`${sector}`) || []);
                    if (response.length > 0) {
                        const sectorData = response.slice(0, 1).sort((a, b) => b.pChange - a.pChange).map(item => [
                            item.symbol,
                            item.pChange,
                            '#1ED095',
                        ]);
                        const sectorDataList = response.slice(1, 20).sort((a, b) => b.pChange - a.pChange).map(item => [
                            item.symbol,
                            sector.replace("NIFTY ", ""),
                            item.pChange,
                        ]);
                        allData.push(...sectorData);
                        allDatalist.push(
                            {
                                type: sector.replace("NIFTY ", ""),
                                data: [["Symbol", "Parent", "Price"], [sector.replace("NIFTY ", ""), null, 0], ...sectorDataList]
                            }
                        );
                    } else {
                        console.warn(`No data found for sector: ${sector}`);
                    }
                } catch (error) {
                    console.error(`Error fetching data for sector: ${sector}`, error.message);
                }
            }
            setMergedData(allData); // Update the state once with all the data
            setMergedDataAll(allDatalist);
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
                            {/* <MomentumSpike header={"Sector Scope"} data={mergedData} /> */}
                            <MomentumSpikeMulti header={"Sector Scope"} data={mergedDataAll} />
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
