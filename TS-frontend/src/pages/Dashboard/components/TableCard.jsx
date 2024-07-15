import React from "react"
import { Link } from "react-router-dom"
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa"
import { Card, CardHeader, CardBody } from "reactstrap"
import { useState } from "react"

let candles = './candle-sticks.png';

export default function TableCard({ header, children, cssStyle }) {
    const [light, setlight] = useState(false)
    return (
        <div>
            <Card className="my-2 Drag border border-2 rounded-4 m-3" style={cssStyle}>
                <CardHeader className='d-flex justify-content-between rounded-4 bg-black '>
                    <div>
                        <div className="text-white fs-3">{header}</div>
                        <div className="text-white">
                            How to use
                            <span className="badge text-bg-danger ms-2"><i class='bx bx-play me-1'></i>Live</span>
                        </div>
                    </div>
                    <div>
                        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div className="input-group">
                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light rounded rounded-pill " />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-primary">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="border p-2 rounded-4" style={{ backgroundColor: "#292B42" }}>
                        <table className="table ">
                            
                                <thead className="" >
                                    <tr >
                                        <th >Symbol</th>
                                        <th ></th>
                                        <th  className="text-center">%</th>
                                        <th >T.O.</th>
                                    </tr>
                                </thead>
                            
                            <tbody className="fs-5 fw-light text-white">
                                <tr>
                                    <td>
                                        <div >
                                            <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" class="rounded-pill" alt="hdfc" />
                                            <span>
                                                HDFCBANK
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img src={candles} class="" alt="hdfc" />

                                            <i class='btn bx bxs-bookmark-plus fs-4 p-0' ></i>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge rounded-3 w-100 p-2 fs-5" style={{ backgroundColor: "#19C141" }}>
                                            1.3
                                        </div>
                                    </td>
                                    <td>1113.41</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" class="rounded-pill" alt="hdfc" />
                                            <span>
                                                IDEA
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img src={candles} class="" alt="hdfc" />

                                            <i class='btn bx bxs-bookmark-plus fs-4 p-0' ></i>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge rounded-3 w-100 p-2 fs-5" style={{ backgroundColor: "#F31C1C" }}>
                                            -0.89
                                        </div>
                                    </td>
                                    <td>1113.41</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
