import React from "react"
import { Bar } from "react-chartjs-2"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor"

const BarChart = ({ dataColors, height,ProductLabel,ProductData}) => {
  var barChartColor = getChartColorsArray(dataColors)
  const data = {
    labels: ["Option Products"],
    datasets: [
      {
        label:[ProductLabel],
        backgroundColor: barChartColor[0],
        borderColor: barChartColor[0],
        borderWidth: 1,
        hoverBackgroundColor: barChartColor[1],
        hoverBorderColor: barChartColor[1],
        data: [ProductData],
      },
    ],
  }

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
  }

  return <Bar width={751} height={height} data={data} options={options} />
}

export default BarChart
