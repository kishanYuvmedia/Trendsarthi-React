import React from "react"
import { Line } from "react-chartjs-2"
import getChartColorsArray from "../ChartsDynamicColor";

const LineChart = ({dataColors}) => {
  var lineChartColor =  getChartColorsArray(dataColors);
  const data = {
    labels: [
      "Session 1",
      "Session 2",
      "Session 3",
      "Session 4",
      "Session 5",
    ],
    datasets: [
      {
        label: "Option Data",
        fill: true,
        lineTension: 0.5,
        // backgroundColor: lineChartColor[0],
        backgroundColor: "#00ff0000",
        borderColor: "green",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "green",
        pointBackgroundColor: "green",
        pointBorderWidth: 7,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: lineChartColor[1],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80],
      },
      {
        label: "Zero Line",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(235, 239, 242, 0.0)",
        borderColor: "red",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 7,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "#ebeff2",
        pointHoverBorderColor: "#eef0f2",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36],
      },
    ],
  }
  var option = {
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          stepSize: 10
        }
      }]
    }
  }

  return <Line width={751} height={300} data={data} options={option} />
}

export default LineChart;
