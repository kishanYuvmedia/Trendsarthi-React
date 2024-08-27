import React from 'react'
import { Card, CardHeader, CardBody } from "reactstrap"

const StockCard = () => {
    return (
        <div>
            <Card
                className="my-2 Drag"
                style={{
                    border: '1px solid transparent',
                    borderRadius: '14px',
                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                    padding: '10px',
                }}
            >
                <CardHeader className='d-flex justify-content-between rounded-4 p-md-2 p-0 bg-black position-relative' style={{
                    zIndex: "1",
                }}>
                    <div>
                        <div className="text-white fs-3 fw-bold "></div>
                        <div className="text-white mb-2">
                            How to use
                            <span className="badge fs-6 ms-2" style={{ backgroundColor: "#F31C1C" }}>
                                <i className='bx bx-play me-1'></i>
                                LIVE
                            </span>
                        </div>
                    </div>
                    <div>

                    </div>
                </CardHeader>
                <CardBody className="p-2 pt-0 position-relative">
                    <div className="border p-3 rounded-4 table-responsive" style={{ backgroundColor: "#292B42" }}>
                        qwe
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default StockCard