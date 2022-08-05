import axios from "axios";
import { useEffect } from "react";

export const options = {
  // responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Doanh thu theo tháng",
    },
  },
  barThickness: 18,
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const handleData = (data) => {
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

export const data = (xData) => {
  return {
    labels,
    datasets: [
      {
        label: "Doanh số",
        data: xData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};
