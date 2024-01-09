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
        lineTension: 1,
        borderCapStyle: "butt",
        borderDash: [],
        borderColor: "#0dff4d",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "0dff4d",
        pointBackgroundColor: "#0dff4d",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: lineChartColor[1],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: datalist,
      },
      {
        label: "Zero Line",
        fill: true,
        lineTension: 1,
        backgroundColor: "rgba(235, 239, 242, 0.0)",
        borderColor: "#ff0d0d",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#ff0d0d",
        pointBackgroundColor: "#ff0d0d",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "#ff0d0d",
        pointHoverBorderColor: "#ff0d0d",
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
            min: result.lowest,
            suggestedMin: 0, // Add this line to set the baseline to 0
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

  return <Line data={data} options={option} />
}

export default LineChart
