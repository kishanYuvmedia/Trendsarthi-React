import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

let negativeStatus = 'https://img.icons8.com/isometric/50/bearish.png';
let positiveStatus = 'https://img.icons8.com/isometric/50/bullish.png';
const TableCard = ({ header, tableId, list }) => {
    useEffect(() => {
        const searchInputs = document.querySelectorAll('.dt-search input[type="search"]');
        searchInputs.forEach(input => {
            input.placeholder = 'Search...';
        });

    }, [tableId]);
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        setDataList(list)
        console.log("desktop", list);
    }, [])
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
                        <table id={tableId} className="table table-sm table-scroll">
                            <thead>
                                <tr>
                                    <th className="fw-bold p-2 ps-3 text-white fw-light" style={{ borderRadius: "10px 0 0 10px" }}>Symbol</th>
                                    <th className="fw-bold p-2 text-white fw-light text-center w-25">Price</th>
                                    <th className="fw-bold text-center p-2 text-white fw-light">change</th>
                                    <th className="fw-bold text-center p-2 text-white fw-light">AI Signal</th>
                                    <th className="fw-bold p-2 text-white fw-light text-center w-25" style={{ borderRadius: "0px 10px 10px 0" }}>Sentiment</th>
                                </tr>
                            </thead>
                            <tbody className="fs-5 fw-light text-white">
                                {dataList?.map((item, index) => (
                                    <tr key={index} style={{ display: item.PRICECHANGE === 0 ? "none" : "flex" }}>
                                        <td className="text-white fs-6">
                                            <span>{item.INSTRUMENTIDENTIFIER.slice(0, -2)}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill fs-6 border-${item.PRICECHANGE > 0 ? 'success' : 'danger'} border p-0 px-3`}>
                                                {item.breakoutText}
                                                <img src={item.PRICECHANGE > 0 ? positiveStatus : negativeStatus} width={25} alt={item.PRICECHANGE} />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill w-100 p-2 fs-6`} style={{
                                                backgroundColor: item.PRICECHANGEPERCENTAGE
                                                    > 0 ? "#19C141" : "#F31C1C"
                                            }}>{item.PRICECHANGEPERCENTAGE}</div>
                                        </td>
                                        <td className="text-white text-center fs-6">
                                            {(parseFloat((item.PRICECHANGE * 0.5) + (item.OPENINTERESTCHANGE * 0.3) + (item.VALUE * 0.0001))).toFixed(2)}
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill fs-6 border-${item.CHANGE_PERCENT > 0 ? 'success' : 'danger'} border p-0 px-3`}>
                                                {item.CHANGE_PERCENT > 0 ? "Bullish" : item.CHANGE_PERCENT > 0 ? "Neutral" : "Bearish"}
                                                <img src={item.CHANGE_PERCENT > 0 ? positiveStatus : negativeStatus} width={25} alt={item.CHANGE_PERCENT} />
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

export default TableCard;
