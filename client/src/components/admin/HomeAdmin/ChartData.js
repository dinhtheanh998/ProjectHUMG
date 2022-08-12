import axios from "axios";
import { useEffect } from "react";

export const options = (title) => {
  return {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },      
    },
    // responsive: true,
  };
}

export const handleData = (data, labels) => {
  if (!data) return;
  return labels
    .reduce((acc, curr, index) => {
      return [...acc, { name: curr, value: 0 }];
    }, [])
    ?.map((itemlb, index) => {
      data.map((item) => {
        if (item._id - 1 === index) {
          return (itemlb = { value: item.total });
        }
      });
      return itemlb.value;
    });
};

export const data = (xData, labels) => {
  return {
    labels,
    datasets: [
      {
        label: "Doanh số",
        data: xData,
        backgroundColor: "rgba(243, 241, 245, 0.6)",
        borderColor: '#66BFBF',        
        yAxisID: 'y',
        fill:true,
      },
    ],
  };
};
