import React from "react"
import { Bar } from "react-chartjs-2"

const BarChart = ({ ProductName, Productdata }) => {
  // Sample data for the bar chart
  const data = {
    labels: ProductName,
    datasets: [
      {
        label: "Option IO",
        backgroundColor: "rgba(3, 61, 252,0.4)",
        borderColor: "rgba(3, 61, 252,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(3, 61, 252,0.6)",
        hoverBorderColor: "rgba(3, 61, 252,1)",
        data: Productdata,
      },
    ],
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Change the grid color for y-axis to a light gray
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.7)", // Change the text color for y-axis to a dark gray
        },
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
