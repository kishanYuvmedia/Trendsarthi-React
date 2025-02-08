import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ ProductName, Productdata }) => {
  // Define colors for positive and negative values
  const positiveColor = "rgba(3, 161, 52, 0.6)"; // Green for positive values
  const negativeColor = "rgba(252, 61, 3, 0.6)"; // Red for negative values

  const data = {
    labels: ProductName,
    datasets: [
      {
        label: "Option IO",
        backgroundColor: Productdata.map((value) =>
          value >= 0 ? positiveColor : negativeColor
        ),
        borderColor: Productdata.map((value) =>
          value >= 0 ? "rgba(3, 161, 52, 1)" : "rgba(252, 61, 3, 1)"
        ),
        borderWidth: 1,
        hoverBackgroundColor: Productdata.map((value) =>
          value >= 0 ? "rgba(3, 161, 52, 0.8)" : "rgba(252, 61, 3, 0.8)"
        ),
        hoverBorderColor: Productdata.map((value) =>
          value >= 0 ? "rgba(3, 161, 52, 1)" : "rgba(252, 61, 3, 1)"
        ),
        data: Productdata,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgb(255, 255, 255)",
        },
        ticks: {
          color: "rgb(255, 255, 255)",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
