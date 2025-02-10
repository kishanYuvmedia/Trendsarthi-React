import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const CandlestickChart = ({dataList=[]}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        let myChart = null;
        if (chartRef.current) {
            myChart = echarts.init(chartRef.current, "dark"); // ✅ 'dark' theme applied
            const option = {
                xAxis: {
                    type: "category",
                    data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
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
