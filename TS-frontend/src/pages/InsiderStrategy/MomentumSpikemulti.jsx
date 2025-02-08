import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody } from "reactstrap"
import { Chart } from "react-google-charts";
export const options = {
    minColor: "#f00",
    midColor: "#ddd",
    maxColor: "#0d0",
    headerHeight: 15,
    fontColor: "black",
    showScale: true,
};
export default function MomentumSpikeMulti({ header, data }) {
    //console.log("MomentumSpikeMulti", data);
    const [mergedData, setMergedData] = useState([]);
    useEffect(() => {
        if (data && data.length > 0) {
            setMergedData(data);
        }
    }, [data]); // Add `data` as a dependency  
    useEffect(() => {
        console.log("Merged Data State:", mergedData);
    }, [mergedData]);  
    return (
        <div>
            <Card
                className="my-2 Drag"
                style={{
                    border: '1px solid transparent',
                    borderRadius: '14px',
                    boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
                    padding: '10px',
                    backgroundColor: "#181a33"
                }}
            >
                <CardHeader className='d-flex justify-content-between rounded-4  ' style={{ backgroundColor: "#181a33" }}>
                    <div>
                        <div className="text-gradient w-100 fs-3 fw-bold">
                            {header}
                        </div>
                        <div className="text-white">
                            How to use
                            <span className="badge fs-6 ms-2" style={{ backgroundColor: "#F31C1C" }}>
                                <i className='bx bx-play me-1'></i>
                                LIVE
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-3 pt-0">
                    {mergedData?.length > 0 && (
                        <div className="border p-1 rounded-4 bg-black d-flex flex-wrap">
                            {mergedData.map((item, index) => (
                                <div key={index} style={{ width: '25%' }}>
                                    {item?.data?.length > 0 ? ( // Check if `item.data` is valid
                                        <Chart
                                            chartType="TreeMap"
                                            width={'100%'}
                                            height={'250px'}
                                            data={item.data}
                                            options={options}
                                        />
                                    ) : (
                                        <p>No Data Available</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}
