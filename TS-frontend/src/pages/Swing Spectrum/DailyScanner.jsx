import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody } from "reactstrap"
import axios from 'axios';
let candles = './images/candle-sticks.png';

export default function DailyScanner({ header, cssStyle, tableId }) {

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
    useEffect(() => {
        document.title = "Swing Spectrum | Trendsarthi";
        if (!document.getElementById("tradingview-script")) {
            const script = document.createElement("script");
            script.id = "tradingview-script";
            script.type = "text/javascript";
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                symbols: [
                    { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
                    { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
                    { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
                    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                ],
                isTransparent: false,
                showSymbolLogo: true,
                displayMode: "adaptive",
                colorTheme: "dark",
                locale: "en",
            });

            document.getElementById("tradingview-widget").appendChild(script);
        }
    }, []);
    const [list, setlist] = useState([]);
    useEffect(() => {
        document.title = "Insider Strategy | Trendsarthi";
    }, []);
    const [selectedValue, setSelectedValue] = useState('NIFTY 50');
    const [error, setError] = useState(null);
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
            console.log('Data:', response.data.data);

        } catch (error) {
            setError(`Failed to fetch data: ${error.message}`);
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
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
                <CardHeader className='d-flex justify-content-between rounded-4 p-md-2 p-0 bg-black position-relative '>
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
                <CardBody className="p-2 pt-0 position-relative">
                    <div className="border p-2 rounded-4 table-responsive" style={{ backgroundColor: "#292B42" }}>
                        <table id={tableId} className="table ">

                            <thead>
                                <tr>
                                    <th className="p-2 ps-3 text-white fw-light" style={{ borderRadius: "10px 0 0 10px" }}>Symbol</th>
                                    <th className="p-2 text-white fw-light text-center">Volume</th>
                                    <th className="p-2 text-white fw-light text-center">Value</th>
                                    <th className="p-2 text-white fw-light text-center">Avg. Del %</th>
                                    <th className="text-center p-2 text-white fw-light text-center">Delivery (%)</th>
                                    <th className="p-2 text-white fw-light"></th>
                                    <th className="p-2 text-white fw-light text-center" style={{ borderRadius: "0px 10px 10px 0" }}>Bookmark</th>
                                </tr>
                            </thead>

                            <tbody className="fs-5 fw-light text-white">
                                {list?.slice(1, 50).sort((a, b) => b.pChange - a.pChange).map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-white">
                                            <span>
                                                {item.symbol}
                                            </span>
                                        </td>
                                        <td className="text-white text-center">
                                            {item.totalTradedVolume}
                                        </td>
                                        <td className="text-white text-center">
                                            {item.totalTradedValue}
                                        </td>
                                        <td className="text-white text-center">
                                            {item.perChange30d}
                                        </td>

                                        <td >
                                            <div className="text-white text-center" >
                                                {item.pChange}
                                            </div>
                                        </td>
                                        <td className="text-center w-25">
                                            <div class="progress   ">
                                                <div class="progress-bar " role="progressbar" aria-label="Animated striped example" aria-valuenow={item.perChange30d} aria-valuemin="0" aria-valuemax="10" style={{ width: `${item.perChange30d}%` }}></div>
                                            </div>
                                        </td>
                                        <td className="text-white text-center">
                                            <div>
                                                <img src={candles} className="" alt={item.symbol} />
                                                <i className='btn bx bxs-bookmark-plus fs-4 p-0' ></i>
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
    )
}
