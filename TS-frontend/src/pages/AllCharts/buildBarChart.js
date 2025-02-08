import React, { Fragment, useState } from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"
const BuildBarChart = ({
  dataLabel,
  dataIOPrice,
  dataIOPriceChange,
  titleName,
  horizontal,
  dataColors,
}) => {
  const apaexlineColumnColors = getChartColorsArray(dataColors)
  const series = [
    {
      name: "OI",
      data: dataIOPrice,
    },
    {
      name: "Price",
      data: dataIOPriceChange,
    },
  ]
  const options = {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        columnWidth: "100%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },

    colors: apaexlineColumnColors,
    xaxis: {
      categories: dataLabel,
      OI: dataIOPrice,
    },
    yaxis: {
      title: {
        text: titleName,
      },
    },
    grid: {
      borderColor: "#000",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        },
      },
    },
  }
  return (
    <div>
      <Fragment>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={400}
        />
      </Fragment>
    </div>
  )
}

export default BuildBarChart
