import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const links = [
    { to: "/marketpulsetabs", src: "https://img.icons8.com/3d-fluency/94/heart-with-pulse.png", alt: "heart-with-pulse", text: "Market Pulse" },
    { to: "/optionapex", src: "https://img.icons8.com/3d-fluency/94/combo-chart.png", alt: "combo-chart", text: "Option Apex" },
    { to: "/indexmover", src: "https://img.icons8.com/3d-fluency/94/candle-sticks.png", alt: "candle-sticks", text: "Index Mover" },
    { to: "/insiderstrategy", src: "https://img.icons8.com/3d-fluency/94/hard-to-find.png", alt: "hard-to-find", text: "Insider Strategy" },
    { to: "/sectorscope", src: "https://img.icons8.com/3d-fluency/94/statistic.png", alt: "statistic", text: "Sector Scope" },
    { to: "/optionclock", src: "https://img.icons8.com/3d-fluency/94/alarm-clock--v1.png", alt: "alarm-clock--v1", text: "Option Clock" },
    { to: "/swingspectrum", src: "https://img.icons8.com/3d-fluency/94/line-chart.png", alt: "line-chart", text: "Swing Spectrum" },
    { to: "/#", src: "https://img.icons8.com/isometric/50/vertical-timeline.png", alt: "home", text: "Moving Average" },
];

const BoxNavMob = () => {
    return (
        <Container fluid>
            <Row className='p-2 rounded-4 g-2' style={{
                background: "linear-gradient(159.07deg, rgb(56 61 214 / 26%) -0.81%, rgb(18 18 20) 126.11%)"
            }}>
                {links.map((link, index) => (
                    <Col xs={3} className='p-0' key={index}>
                        <Link to={link.to}>
                            <div className='text-center py-2 px-1'>
                                <img src={link.src} alt={link.alt} width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 text-white fs-6 fw-bold'>
                                    {link.text}
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default BoxNavMob;
