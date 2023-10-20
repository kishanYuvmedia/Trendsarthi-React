import React, { useEffect } from "react"
import { Line } from "react-chartjs-2"
import getChartColorsArray from "../ChartsDynamicColor"

const LineChart = ({ dataColors, datalist, timelist, zerolistv }) => {
  var lineChartColor = getChartColorsArray(dataColors)
  console.log("final data", datalist)
  console.log("final timelist", timelist)
  console.log("final zerolist", zerolistv)
  const result = findHighestAndLowest(datalist)

  const data = {
    labels: timelist,
    datasets: [
      {
        label: "Option Data",
        fill: true,
        lineTension: 0.5,
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
        data: datalist,
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
        data: zerolistv,
      },
    ],
  }
  var option = {
    scales: {
      yAxes: [
        {
          ticks: {
            max: result.highest,
            min: 0,
            stepSize: result.highest / 10,
          },
        },
      ],
    },
  }
  function findHighestAndLowest(arr) {
    if (arr.length === 0) {
      return { highest: undefined, lowest: undefined }
    }

    let highest = arr[0]
    let lowest = arr[0]

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > highest) {
        highest = arr[i]
      }
      if (arr[i] < lowest) {
        lowest = arr[i]
      }
    }

    return { highest, lowest }
  }
  return <Line width={751} height={300} data={data} options={option} />
}

export default LineChart
