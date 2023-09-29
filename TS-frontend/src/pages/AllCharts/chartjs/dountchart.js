import React from "react"
import { Doughnut } from "react-chartjs-2"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const DountChart = ({dataColors, labelData}) => {
  var doughnutChartColors =  getChartColorsArray(dataColors); 
  const data = {
    labels: labelData,
    datasets: [
      {
        data: [300, 210],
        backgroundColor: doughnutChartColors,
        hoverBackgroundColor: doughnutChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Doughnut width={734} height={269} className="chartjs-chart" data={data} />
}

export default DountChart;
