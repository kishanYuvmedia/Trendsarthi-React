import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody } from "reactstrap"

let candles = './images/candle-sticks.png';

export default function TableCard({ header, cssStyle, tableId }) {

    useEffect(() => {
        // Initialize DataTable when the component mounts
        const tableElement = document.querySelector(`#${tableId}`);
        if ($.fn.DataTable.isDataTable(tableElement)) {
            // Destroy the existing DataTable before reinitializing
            $(tableElement).DataTable().destroy();
        }

        // Initialize DataTable with options to disable search and pagination
        $(tableElement).DataTable({
            searching: false,   // Disable search
            paging: false,      // Disable pagination
        });
    }, [tableId]);

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
                <CardHeader className='d-flex justify-content-between rounded-4 bg-black '>
                    <div>
                        <div className="text-white fs-3 fw-bold">{header}</div>
                        <div className="text-white">
                            How to use
                            <span className="badge fs-6 ms-2" style={{ backgroundColor: "#F31C1C" }}>
                                <i className='bx bx-play me-1'></i>
                                LIVE
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 border border-white bg-black">
                            <div className="input-group ">
                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light rounded rounded-pill bg-black" />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-primary">
                                        <i className="fa fa-search text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-3 pt-0">
                    <div className="border p-3 rounded-4 table-responsive" style={{ backgroundColor: "#292B42" }}>
                        <table id={tableId} className="table ">

                            <thead>
                                <tr >
                                    <th className="p-2 ps-3 text-white fw-light" style={{ borderRadius: "10px 0 0 10px" }}>Symbol</th>
                                    <th className="p-2 text-white fw-light"></th>
                                    <th className="text-center p-2 text-white fw-light">%</th>
                                    <th className="p-2 text-white fw-light text-center" style={{ borderRadius: "0px 10px 10px 0" }}>T.O.</th>
                                </tr>
                            </thead>

                            <tbody className="fs-5 fw-light text-white">
                                <tr>
                                    <td className="text-white">
                                        <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="hdfc" style={{ borderRadius: "50%" }} />
                                        <span>
                                            HDFCBANK
                                        </span>

                                    </td>
                                    <td className="text-white">
                                        <div>
                                            <img src={candles} className="" alt="hdfc" />

                                            <i className='btn bx bxs-bookmark-plus fs-4 p-0' ></i>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="badge rounded-3 w-100 p-2 fs-5" style={{ backgroundColor: "#19C141" }}>
                                            1.3
                                        </div>
                                    </td>
                                    <td className="text-white text-center">
                                        1113.41
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-white">
                                        <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg" className="me-2" alt="hdfc" style={{ borderRadius: "50%" }} />
                                        <span>
                                            IDEA
                                        </span>
                                    </td>
                                    <td className="text-white">
                                        <div>
                                            <img src={candles} className="" alt="hdfc" />

                                            <i className='btn bx bxs-bookmark-plus fs-4 p-0' ></i>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge rounded-3 w-100 p-2 fs-5" style={{ backgroundColor: "#F31C1C" }}>
                                            -0.89
                                        </div>
                                    </td>
                                    <td className="text-white text-center">1120</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
