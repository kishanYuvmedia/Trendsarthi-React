import React, { Fragment, useState } from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor"
const Apaexlinecolumn = ({
  dataColors,
  dataCallValue,
  dataPutValue,
  categoryValue,
  horizontal,
  titleName
}) => {
  const apaexlineColumnColors = getChartColorsArray(dataColors)
  const [callData] = useState(dataCallValue)
  const [putData] = useState(dataPutValue)
  const [categorylist] = useState(categoryValue)
  const series = [
    {
      name: "Call",
      data: callData,
    },
    {
      name: "Put",
      data: putData,
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
        columnWidth: "90%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },

    colors: apaexlineColumnColors,
    xaxis: {
      categories: categorylist,
    },
    yaxis: {
      title: {
        text:titleName,
      },
    },
    grid: {
      borderColor: "#f1f1f1",
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
    <>
    <Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
      </Fragment>
    </>
  )
}

export default Apaexlinecolumn
