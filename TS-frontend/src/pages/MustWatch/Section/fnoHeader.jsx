import React from 'react'
import { Row, Col, Card, CardBody, CardHeader,CardFooter } from 'reactstrap';
export default function FnoHeader({ product, strikePrice }) {
    return (
        <Card className='bg-warning'>
            <Row className='ms-4 p-1 m-3'>
                <Col md={12} className='align-items-center d-flex'>
                    <h1 style={{ color:'#fff',backgroundColor:'#0a951b',padding:'10px',borderRadius:'10px'}}>{product} {"  "}</h1><span className='ms-4 text-black h1' style={{fontWeight:'bold'}}>{strikePrice} <i className="bx bxs-up-arrow"></i></span>
                </Col>
            </Row>
            <CardFooter>
            <div className='align-items-center d-flex'>
                        <div className='flex-fill d-grid'>
                            <span className='me-4 fs-6 mb-2'>Technical Indicators</span>
                            <span className='me-4 fs-6 fw-bold text-white'>-</span>
                        </div>
                        <div className='flex-fill d-grid me-1'>
                            <span className='me-4 fs-6 mb-2'>Highest Delivery</span>
                            <span className='me-4 fs-6 fw-bold text-white'>No Signal @(0)</span>
                        </div>
                        <div className='flex-fill d-grid me-1'>
                            <span className='me-4 fs-6 mb-2'>Sentiments (Average)</span>
                            <span className='me-4 fs-6 fw-bold text-white'>Buy 60% / Sell 40%</span>
                        </div>
                        <div className='flex-fill d-grid me-1'>
                            <span className='me-4 fs-6 mb-2'>Derivative Option OI</span>
                            <span className='me-4 fs-6 fw-bold text-white'>Max Call @2400(Resistance) / Max Put @2300(Support)</span>
                        </div>
                    </div>
            </CardFooter>
        </Card>
    )
}
