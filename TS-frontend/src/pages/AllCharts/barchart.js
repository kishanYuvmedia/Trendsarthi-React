import React from "react"
import { Bar } from "react-chartjs-2"

const BarChart = ({ ProductName, Productdata }) => {
  // Sample data for the bar chart
  const data = {
    labels: ProductName,
    datasets: [
      {
        label: "Data Set 1",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: Productdata,
      },
    ],
  }

  // Configuration options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
