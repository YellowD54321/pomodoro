import React, { useRef, useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import "./analysisPage.css";

const AnalysisPage = () => {
  const [chartData, setChartData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    label: ["1243"],
    data: [12, 19, 3, 5, 2, 3],
  });

  return (
    <div className="analysis-page-main">
      <BarChart chartData={chartData} className="analysis-page-bar-chart" />
    </div>
  );
};

export default AnalysisPage;
