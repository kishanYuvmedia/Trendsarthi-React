import React from 'react'
import { Row, Col, Card, CardBody, CardHeader,CardFooter } from 'reactstrap';
export default function FnoHeader({ product, strikePrice,signal }) {
    return (
        <Card className='bg-default'>
            <Row className='ms-4 p-1 m-3'>
                <Col md={12} className='align-items-center d-flex'>
                    <h1 style={{ color:'#fff',padding:'10px',borderRadius:'10px'}}>{product} {"  "}</h1><span className='ms-4 text-white h1' style={{fontWeight:'bold'}}>{strikePrice} <i className="bx bxs-up-arrow"></i></span>
                </Col>
            </Row>
            <CardFooter className='bg-black'>
            <div className='align-items-center d-flex'>
                        <div className='flex-fill d-grid'>
                            <span className='me-4 fs-6 mb-2'>Technical Indicators</span>
                            <span className='me-4 fs-6 fw-bold text-white'>{signal}</span>
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
                            <span className='me-4 fs-6 fw-bold text-white'>Max Call @{strikePrice}(Resistance) / Max Put @{strikePrice}(Support)</span>
                        </div>
                    </div>
            </CardFooter>
        </Card>
    )
}
