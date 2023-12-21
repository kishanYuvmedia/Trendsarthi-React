import React from "react";
import { Bar } from "react-chartjs-2";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const BarChart = ({ height, productData, ProductLabel }) => {
  console.log("productData",productData)
  console.log("productLabels",ProductLabel)
  var barChartColor = getChartColorsArray(
    '["--bs-success-rgb, 0.8", "--bs-info", "--bs-danger", "--bs-warning"]'
  );
  const data = {
    labels: "Products", // Array of X values
    datasets: productData.map((dataSet, index) => ({
      label: `Product ${index + 1}`,
      backgroundColor: barChartColor[1],
      borderColor: barChartColor[1],
      borderWidth: 1,
      hoverBackgroundColor: barChartColor[1], // Adjust index as needed
      hoverBorderColor: barChartColor[1], // Adjust index as needed
      data: dataSet, // Array of Y values for the corresponding X values
    })),
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar width={751} height={height} data={data} options={options} />;
};

export default BarChart;
