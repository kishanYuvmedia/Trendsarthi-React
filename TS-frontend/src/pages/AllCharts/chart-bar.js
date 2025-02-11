import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const CandlestickChart = ({dataList=[],datetime=[]}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        let myChart = null;
        if (chartRef.current) {
            myChart = echarts.init(chartRef.current, "dark"); // ✅ 'dark' theme applied
            const option = {
                xAxis: {
                    type: "category",
                    data: datetime,
                    axisLabel: { color: "white" }, // ✅ Ensure axis text is visible in dark mode
                },
                yAxis: {
                    type: "value",
                    axisLabel: { color: "white" },
                },
                series: [
                    {
                        type: "candlestick",
                        data: dataList,
                    },
                ],
            };
            myChart.setOption(option);
        }
        return () => {
            if (myChart) {
                myChart.dispose(); // ✅ Cleanup chart instance
            }
        };
    }, []);
    return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default CandlestickChart;
