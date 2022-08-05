import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartProfit = ({ options, data }) => {
  return (
    <div className="w-[700px] h-[600px]">
      <Bar options={options} data={data} />
    </div>
  );
};

export default ChartProfit;
