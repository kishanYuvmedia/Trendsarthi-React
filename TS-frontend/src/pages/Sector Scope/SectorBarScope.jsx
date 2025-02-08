import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody } from "reactstrap"
import { Chart } from "react-google-charts";
export const options = {
  backgroundColor: "#000", // Dark background color
  chartArea: {
    backgroundColor: "#000", // Matches the background of the chart
  },
  hAxis: {
    textStyle: { color: "#ffffff" }, // White text for horizontal axis
  },
  vAxis: {
    textStyle: { color: "#ffffff" }, // White text for vertical axis
  },
  isStacked: true, // Enable stacking if needed
  animation: {
    duration: 1000,
    easing: "inAndOut",
  },
  annotations: {
    textStyle: {
      color: "#ffffff", // Annotation color
    },
  },
  series: {
    0: {
      type: "bars",
      visibleInLegend: false,
    },
  },
  curveType: "function", // Smoothen bars if applicable
};
export default function SectorBarScope({ header, data }) {
 const [mergedData, setMergedData] = useState([]);
     useEffect(() => {
         if (data && data.length > 0) {
             setMergedData(data);
         }
     }, [data]);
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
        <CardHeader className=' rounded-4  ' style={{ backgroundColor: "#181a33" }}>
          <div className="d-flex align-items-center  ">
            <div className="text-white  fs-5">
              {header}
            </div>
            <span className="badge fs-6 ms-2 text-info">
              <i className='bx bxs-circle'></i>
              ACTIVE
            </span>
          </div>
          <div className="text-white">
            How to use
          </div>
        </CardHeader>
        <CardBody className="p-1 pt-0">
          <div className="border p-1 rounded-4 bg-black">
            <Chart chartType="ColumnChart" width="100%" height="500px" options={options} data={mergedData} />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
