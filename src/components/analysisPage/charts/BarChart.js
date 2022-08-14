import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  console.log("chartData", chartData);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.label,
        data: chartData.data,
        backgroundColor: ["lightGreen"],
        borderColor: "gray",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar-chart-main">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
