import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

let negativeStatus = 'https://img.icons8.com/isometric/50/bearish.png';
let positiveStatus = 'https://img.icons8.com/isometric/50/bullish.png';


// Example usage with sample data
const sampleData = [
    {
        symbol: "HDFCBANK",
        symbolSrc: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg",
        breakoutText: "5 Days High",
        breakoutStatus: "positive",
        percentChange: 1.3,
        turnover: 1113.41,
        pcrText: "Bullish",
        pcrStatus: "positive"
    },
    {
        symbol: "IDEA",
        symbolSrc: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg",
        breakoutText: "5 Days Low",
        breakoutStatus: "negative",
        percentChange: -0.89,
        turnover: 1120,
        pcrText: "Bearish",
        pcrStatus: "negative"
    }
];

const TableCard = ({ header, tableId,  }) => {

    useEffect(() => {
        // Initialize DataTable when the component mounts
        const tableElement = document.querySelector(`#${tableId}`);
        if ($.fn.DataTable.isDataTable(tableElement)) {
            // Destroy the existing DataTable before reinitializing
            $(tableElement).DataTable().destroy();
        }

        // Initialize DataTable with options to disable search and pagination
        $(tableElement).DataTable({
            searching: true,
            paging: false,
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
                        <div className="text-white fs-3 fw-bold">{header}</div>
                        <div className="text-white mb-2">
                            How to use
                            <span className="badge fs-6 ms-2" style={{ backgroundColor: "#F31C1C" }}>
                                <i className='bx bx-play me-1'></i>
                                LIVE
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-0 position-relative">
                    <div className="border p-2 rounded-4 table-responsive" style={{ backgroundColor: "#292B42" }}>
                        <table id={tableId} className="table table-sm">
                            <thead>
                                <tr>
                                    <th className="fw-bold p-2 ps-3 text-white fw-light" style={{ borderRadius: "10px 0 0 10px" }}>Symbol</th>
                                    <th className="fw-bold p-2 text-white fw-light text-center w-25">P.R. Breakout</th>
                                    <th className="fw-bold text-center p-2 text-white fw-light">%</th>
                                    <th className="fw-bold text-center p-2 text-white fw-light">T.O.</th>
                                    <th className="fw-bold p-2 text-white fw-light text-center w-25" style={{ borderRadius: "0px 10px 10px 0" }}>PCR</th>
                                </tr>
                            </thead>
                            <tbody className="fs-5 fw-light text-white">
                                {sampleData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-white fs-6">
                                            <img src={item.symbolSrc} className="me-2" alt={item.symbol} style={{ borderRadius: "50%" }} />
                                            <span>{item.symbol}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill fs-6 border-${item.breakoutStatus === 'positive' ? 'success' : 'danger'} border p-0 px-3`}>
                                                {item.breakoutText}
                                                <img src={item.breakoutStatus === 'positive' ? positiveStatus : negativeStatus} width={25} alt={item.symbol} />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill w-100 p-2 fs-6`} style={{ backgroundColor: item.percentChange > 0 ? "#19C141" : "#F31C1C" }}>
                                                {item.percentChange}
                                            </div>
                                        </td>
                                        <td className="text-white text-center fs-6">
                                            {item.turnover}
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill fs-6 border-${item.pcrStatus === 'positive' ? 'success' : 'danger'} border p-0 px-3`}>
                                                {item.pcrText}
                                                <img src={item.pcrStatus === 'positive' ? positiveStatus : negativeStatus} width={25} alt={item.symbol} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TableCard ;
