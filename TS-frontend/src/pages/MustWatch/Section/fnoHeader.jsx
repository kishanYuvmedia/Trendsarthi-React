import React from 'react'
import { Row, Col, Card,CardFooter } from 'reactstrap';
export default function FnoHeader({ product, strikePrice,signal,callPers,putPers,strickData }) {
    console.log("price",strickData);
    return (
        <Card className='bg-default'>
            <Row className='ms-4 p-1 m-3'>
                <Col md={12} className='align-items-center d-flex'>
                    <h1 style={{ color:'#fff',padding:'10px',borderRadius:'10px'}}>{product} {"  "}</h1><span className='ms-4 text-white h1' style={{fontWeight:'bold'}}>{strikePrice}  <svg className="text-success me-1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
</svg></span>
                </Col>
            </Row>
            <CardFooter className='bg-black'>
            <div className='align-items-center d-flex'>
                        <div className='flex-fill d-grid'>
                            <span className='me-4 fs-6 mb-2'>Technical Indicators</span>
                            <span className='me-4 fw-bold text-success h1' style={{fontSize:20}}>{signal}</span>
                        </div>
                        <div className='flex-fill d-grid me-1'>
                            <span className='me-4 fs-6 mb-2'>Highest Delivery</span>
                            <span className='me-4 fs-6 fw-bold text-success'>{signal} @({strikePrice})</span>
                        </div>
                        <div className='flex-fill d-grid me-1'>
                            <span className='me-4 fs-6 mb-2'>Sentiments (Average)</span>
                            <span className='me-4 fs-6 fw-bold text-white'>Buy {Math.round(callPers).toFixed(2)}% / Sell {Math.round(putPers).toFixed(2)}%</span>
                        </div>
                        <div className='flex-fill d-grid me-1'>
                            <span className='me-4 fs-6 mb-2'>Derivative Option OI</span>
                            <span className='me-4 fs-6 fw-bold text-white'>Max Call {strickData.HIGH} @(Resistance) / Max Put {strickData.LOW} @(Support)</span>
                        </div>
                    </div>
            </CardFooter>
        </Card>
    )
}
