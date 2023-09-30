import React from "react";
import { Bar } from "react-chartjs-2";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const BarChart = ({ dataColors, height }) => {
  var barChartColor = getChartColorsArray(dataColors);
  const data = {
    labels: ["Total Call", "Total Put"],
    datasets: [
      {
        label: "Total Call",
        backgroundColor: barChartColor[0],
        borderColor: barChartColor[0],
        borderWidth: 1,
        hoverBackgroundColor: barChartColor[1],
        hoverBorderColor: barChartColor[1],
        data: [65, 0],
      },
      {
        label: "Total Put",
        backgroundColor: barChartColor[2],
        borderColor: barChartColor[2],
        borderWidth: 1,
        hoverBackgroundColor: barChartColor[3],
        hoverBorderColor: barChartColor[3],
        data: [35, 0],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar width={751} height={height} data={data} options={options} />;
};

export default BarChart;
