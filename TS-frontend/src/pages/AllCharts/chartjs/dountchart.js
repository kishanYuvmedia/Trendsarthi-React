import React from "react"
import { Doughnut } from "react-chartjs-2"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor"

const DountChart = ({ dataColors, labelData, putPers, callPers }) => {
  var doughnutChartColors = getChartColorsArray(dataColors)
  const data = {
    labels: labelData,
    datasets: [
      {
        data: [putPers, callPers],
        backgroundColor: doughnutChartColors,
        hoverBackgroundColor: doughnutChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return (
    <Doughnut width={734} height={269} className="chartjs-chart" data={data} />
  )
}

export default DountChart
