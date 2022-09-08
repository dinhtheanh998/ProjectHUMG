import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
  
  import { Bar, Doughnut, Line } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    Filler,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const ChartPriceByTime = ({options, data}) => {
    return (
        <Line options={options} data={data} />   
    );
};

export default ChartPriceByTime;