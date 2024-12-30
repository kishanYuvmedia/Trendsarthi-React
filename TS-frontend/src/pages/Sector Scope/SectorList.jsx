import { listeners } from "npm";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
let negativeStatus = 'https://img.icons8.com/isometric/50/bearish.png';
let positiveStatus = 'https://img.icons8.com/isometric/50/bullish.png';
const SectorList = ({ header, tableId }) => {
    const [list, setlist] = useState([]);
    const [error, setError] = useState(null);
    const [selectedValue, setSelectedValue] = useState('NIFTY 50');
    const fetchData = async () => {
        try {
            const url = `/api/equity-stockIndices?index=${selectedValue}`;
            const headers = {
                'Referer': `https://www.nseindia.com/market-data/live-equity-market?symbol=${selectedValue}`,
                'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            };
            const response = await axios.get(url, { headers });
            setlist(response.data.data);

        } catch (error) {
            setError(`Failed to fetch data: ${error.message}`);
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedValue]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!list) {
        return <div>Loading...</div>;
    }
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
                                {list.slice(1, 10).sort((a, b) => b.priority - a.priority).map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-white fs-6">
                                            <span>{item.symbol}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill fs-6 border-${item.pChange > 0 ? 'success' : 'danger'} border p-0 px-3`}>
                                                {item.breakoutText}
                                                <img src={item.pChange > 0 ? positiveStatus : negativeStatus} width={25} alt={item.symbol} />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill w-100 p-2 fs-6`} style={{ backgroundColor: item.pChange > 0 ? "#19C141" : "#F31C1C" }}>
                                                {item.pChange}
                                            </div>
                                        </td>
                                        <td className="text-white text-center fs-6">
                                            {item.lastPrice}
                                        </td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill fs-6 border-${item.pChange > 0 ? 'success' : 'danger'} border p-0 px-3`}>
                                                {item.lastPrice}
                                                <img src={item.pChange > 0 ? positiveStatus : negativeStatus} width={25} alt={item.symbol} />
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

export default SectorList;
