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
            searching: true,   // Disable search
            paging: false,      // Disable pagination
        });
        // Add placeholder to the search input
        const searchInputs = document.querySelectorAll('.dt-search input[type="search"]');
        searchInputs.forEach(input => {
            input.placeholder = 'Search...';
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
                <CardHeader className='d-flex justify-content-between rounded-4 p-md-2 p-0 bg-black position-relative' style={{
                    zIndex: "1",
                }}>
                    <div>
                        <div className="text-white fs-3 fw-bold ">{header}</div>
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
                <CardBody className="p-0 position-relative">
                    <div className="border p-2 rounded-4 table-responsive" style={{ backgroundColor: "#292B42" }}>
                        <table id={tableId} className="table table-sm">

                            <thead>
                                <tr >
                                    <th className="p-2 ps-3 text-white fw-light" style={{ borderRadius: "10px 0 0 10px" }}>Symbol</th>
                                    <th className="p-2 text-white fw-light text-center">Bookmark</th>
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
                                    <td className="text-white text-center">
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
                                    <td className="text-white text-center">
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
