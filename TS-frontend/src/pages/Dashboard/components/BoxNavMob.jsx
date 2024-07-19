import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const BoxNavMob = () => {
    return (
        <>
            <Container fluid >
                <Row className='p-2 rounded-4' style={{
                    background: "linear-gradient(159.07deg, rgb(56 61 214 / 26%) -0.81%, rgb(18 18 20) 126.11%)"
                }}>
                    <Col xs={3} className='p-0'>
                        <Link to="/marketpulsetabs">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Market Pulse
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Link to="/optionapex">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Option Apex
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Link to="/indexmover">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Index Mover
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Link to="/insiderstrategy">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Insider Strategy
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Link to="/sectorscope">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Sector Scope
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Link to="/optionclock">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Option Clock
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={3} className='p-0'>
                        <Link to="/swingspectrum">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Swing Spectrum
                                </div>
                            </div>
                        </Link>
                    </Col>
                    {/* <Col xs={3} className='p-0'>
                        <Link to="/">
                            <div className='text-center py-2 px-1'>
                                <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="symbol" width={40} style={{ borderRadius: "50%" }} />
                                <div className='mt-2 fw-white fs-6 fw-bold'>
                                    Trade Tutor
                                </div>
                            </div>
                        </Link>
                    </Col> */}
                </Row>
            </Container>
        </>
    )
}

export default BoxNavMob