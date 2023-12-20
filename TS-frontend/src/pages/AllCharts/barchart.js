import React from "react"
import { Bar } from "react-chartjs-2"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"
const BarChart = ({height,ProductData}) => {
  var barChartColor = getChartColorsArray(
    '["--bs-success-rgb, 0.8", "--bs-info", "--bs-danger", "--bs-warning"]'
  )
  const data = {
    labels: ["Option Products"],
    datasets: [{
      label: 'IO',
      backgroundColor: barChartColor[0],
      borderColor: barChartColor[0],
      borderWidth: 1,
      hoverBackgroundColor: barChartColor[1],
      hoverBorderColor: barChartColor[1],
      data:[10,20,10,20,10,20,20,30,50],
    }],
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
