import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
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

let bgvector = './images/vector2.png';


const IndexMover = (props) => {
    useEffect(() => {
        document.title = "Index Mover | Trendsarthi";

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
                        <div className="card-body px-0 pt-0">
                            <div className="row d-flex justify-content-end">
                                <div className="col-6 col-md-8 pb-3">
                                    <div className="fs-1 fw-bold text-white">Index Mover</div>
                                </div>
                                <div className="col-6 col-md-4 d-flex justify-content-end">
                                    <div className="dropdown">
                                        <button className="btn btn-black dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                                            border: '1px solid transparent',
                                            borderRadius: '5px',
                                            boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                            padding: '10px 20px',
                                        }}>
                                            Index: Nift50
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Nift50</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Row>
                        <Col md={3} >
                            <Card
                                className="my-2 Drag "
                                style={{
                                    border: '1px solid transparent',
                                    borderRadius: '14px',
                                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33",
                                    backgroundImage: `url(${bgvector})`,
                                    backgroundPosition: "bottom -1px right -1px",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                <CardBody className='d-flex justify-content-between rounded-4  '>
                                    <div className="pb-3">
                                        <div className="fs-1 fw-bold text-gradient w-100">Nift50</div>
                                    </div>
                                    <div className="fs-3 text-white">
                                        UP 132 pts <br />
                                        +0.55%
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                        <Col md={9} >
                            <Card
                                className="my-2 Drag "
                                style={{
                                    border: '1px solid transparent',
                                    borderRadius: '14px',
                                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='d-flex justify-content-between rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div className="w-100">
                                        <div className="fw-bold mb-2 text-white">Gainers / Losers</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "64%" }} aria-valuenow="64" aria-valuemin="0" aria-valuemax="100"></div>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: "36%" }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-2 text-white">
                                            <div>
                                                <i className='bx bxs-circle text-success'></i> Gainers: 32
                                            </div>
                                            <div>
                                                <i className='bx bxs-circle text-danger'></i> Losers: 18
                                            </div>
                                        </div>
                                    </div>

                                </CardBody>

                            </Card>
                        </Col>

                    </Row>

                    <Row>
                        <Col md={2} xs={6} >
                            <Card
                                className="my-2 Drag border border-white"
                                style={{
                                    // border: '1px solid transparent',
                                    borderRadius: '14px',
                                    // boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='p-0 rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div >
                                        <div className="text-center" >
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgiz41maa34mpQoVYhRyZ8wk8XOMZfHvIrA&s" alt="hdfc" className="rounded-pill bg-white p-2" width={75} />
                                        </div>
                                        <div className="p-3 pb-0 text-center">
                                            <div className="fs-5 fw-bold text-white">HDFCBANK</div>
                                            <div className="text-success">Nift50</div>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                        <Col md={2} xs={6} >
                            <Card
                                className="my-2 Drag border border-white"
                                style={{
                                    // border: '1px solid transparent',
                                    borderRadius: '14px',
                                    // boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='p-0 rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div >
                                        <div className="text-center" >
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgiz41maa34mpQoVYhRyZ8wk8XOMZfHvIrA&s" alt="hdfc" className="rounded-pill bg-white p-2" width={75} />
                                        </div>
                                        <div className="p-3 pb-0 text-center">
                                            <div className="fs-5 fw-bold text-white">HDFCBANK</div>
                                            <div className="text-success">Nift50</div>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                        <Col md={2} xs={6} >
                            <Card
                                className="my-2 Drag border border-white"
                                style={{
                                    // border: '1px solid transparent',
                                    borderRadius: '14px',
                                    // boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='p-0 rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div >
                                        <div className="text-center" >
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgiz41maa34mpQoVYhRyZ8wk8XOMZfHvIrA&s" alt="hdfc" className="rounded-pill bg-white p-2" width={75} />
                                        </div>
                                        <div className="p-3 pb-0 text-center">
                                            <div className="fs-5 fw-bold text-white">HDFCBANK</div>
                                            <div className="text-success">Nift50</div>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                        <Col md={2} xs={6} >
                            <Card
                                className="my-2 Drag border border-white"
                                style={{
                                    // border: '1px solid transparent',
                                    borderRadius: '14px',
                                    // boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                                    padding: '10px',
                                    backgroundColor: "#181a33"
                                }}
                            >
                                <CardBody className='p-0 rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                                    <div >
                                        <div className="text-center" >
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgiz41maa34mpQoVYhRyZ8wk8XOMZfHvIrA&s" alt="hdfc" className="rounded-pill bg-white p-2" width={75} />
                                        </div>
                                        <div className="p-3 pb-0 text-center">
                                            <div className="fs-5 fw-bold text-white">HDFCBANK</div>
                                            <div className="text-success">Nift50</div>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

IndexMover.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(IndexMover);
