import PropTypes from "prop-types";
import React, { useEffect,useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { withTranslation } from "react-i18next";
import dragula from "dragula";
import _, { isEmpty, result, set } from "lodash";
import TableCard from "pages/Marketpulse/TableCard";
import MomentumSpike from "pages/InsiderStrategy/MomentumSpike";
import SectorBarScope from "./SectorBarScope";
import { symbolStock } from "services/api/api-service";
const SectorScope = (props) => {
     const [list, setlist] = useState([]);
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

                    {!isEmpty(list) &&
                        <Row>
                            <Col md={6} id="right" className="hideOnMobile">
                                <TableCard list={list} type={'highPowerd'} header={"HIGH POW. STOCKS"} tableId={'pow1'} />
                            </Col>
                            <Col md={6} id="left" className="hideOnMobile">
                                <TableCard list={list} type={'highPowerd'} header={"INTRADAY BOOST"} tableId={'pow2'} />
                            </Col>
                            <Col md={6} id="left1" className="hideOnMobile">
                                <TableCard list={list} type={'highPowerd'} header={"TOP LEVEL STOCKS"} tableId={'pow3'} />
                            </Col>
                            <Col md={6} id="left3" className="hideOnMobile">
                                <TableCard list={list} type={'highPowerd'} header={"LOW LEVEL STOCKS"} tableId={'pow4'} />
                            </Col>
                        </Row>
                    }
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
