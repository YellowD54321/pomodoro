import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const DoughnutChart = ({ chartData, chartOptions }) => {
  const backgroundColor = chartOptions?.backgroundColor ?? "lightGreen";
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        backgroundColor: backgroundColor,
        borderColor: "gray",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="doughnut-chart-main">
      <Doughnut data={data} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
