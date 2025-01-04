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
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
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

    const fetchData = async () => {
        const listType = ['NIFTY BANK', 'NIFTY MEDIA', 'NIFTY PHARMA', 'NIFTY AUTO', 'NIFTY IT'];
        try {
            const headers = {
                'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            };
            // Fetch all data in parallel
            const results = await Promise.allSettled(
                listType.map(async (type) => {
                    const url = `/api/equity-stockIndices?index=${type}`;
                    const customHeaders = {
                        Referer: `https://www.nseindia.com/market-data/live-equity-market?symbol=${type}`,
                        ...headers,  // Spread operator to merge headers
                    };
                    console.log("URL:", customHeaders);
                    return axios.get(url, { headers: customHeaders })
                        .then((response) => ({ type, data: response.data.data }))
                        .catch((error) => ({ type, data: null, error: error.message }));
                })
            );

            // Format results into an object
            const formattedData = results.reduce((acc, result) => {
                if (result.status === "fulfilled" && result.value.data) {
                    acc[result.value.type] = result.value.data;
                } else if (result.status === "rejected" || result.value.error) {
                    const failedType = result.status === "rejected" ? result.reason.config.url.split("=").pop() : result.value.type;
                    acc[failedType] = { error: result.value?.error || "Unknown error" };
                }
                return acc;
            }, {});

            console.log("Formatted Data:", formattedData);

            // Update state
            setError(null); // Clear any previous errors on successful fetch
            setData(formattedData); // Store the formatted data in state

        } catch (overallError) {
            console.error("Overall fetch error:", overallError);
            setError(`Failed to fetch data: ${overallError.message}`);
        } finally {
            setLoading(false); // Ensure loading state is always cleared
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

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
                            <MomentumSpike />
                        </Col>
                        <Col md={12}>
                            <SectorBarScope header={"Sector Scope"} />
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
