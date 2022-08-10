import axios from "axios";
import React, { useEffect, useRef } from "react";
import CalcOrder from "./CalcOrder";
import myIcon from "../../iconAdmin";
import { converCurences, nFormatter } from "../../../config/config";
import { ChartProfit, ChartDonut } from "./ChartProfit";
import { data, options, handleData } from "./ChartData";

const labelsMonth = [
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

const labelDays = [...Array(new Date().getDate()).keys()];
console.log(labelDays);
const HomeProfit = () => {
  const [allQuantityPro, setAllQuantityPro] = React.useState();
  const [dataProfit, setDataProfit] = React.useState();
  const [dataProfitPerMonth, setDataProfitPerMonth] = React.useState();
  const [dataProfitMonthy, setDataProfitMonthy] = React.useState();
  const [indexShowChart, setIndexShowChart] = React.useState(1);
  useEffect(() => {
    axios.get("/api/productsInfo/getTotalQuantity").then((res) => {
      setAllQuantityPro(res.data[0]);
    });
    axios.get("/api/order/getProfitNowMonth").then((res) => {
      setDataProfit(res.data);
    });
    axios.get("/api/order/getProfitPerMonth").then((res) => {
      setDataProfitPerMonth(res.data);
    });
    axios.get("/api/order/getProfitMonthly").then((res) => {
      setDataProfitMonthy(res.data);
    });
  }, []);

  const coutOrder = (state, data) => {
    if (data) {
      const count = data.filter((item) => item._id === state);
      return count[0]?.count;
    }
  };

  const getProfitNowMonth = (data) => {
    if (!data) return 0;
    const [result] = data.filter((item) => item.state === "Thành công");
    return result?.total;
  };
  const profitNowMonth = getProfitNowMonth(dataProfit);

  const newXData = handleData(dataProfitMonthy, labelsMonth);
  const daysDataProfit = handleData(dataProfitPerMonth, labelDays);

  const countWait = coutOrder("Chờ xác nhận", dataProfit);
  const countAccept = coutOrder("Đã xác nhận", dataProfit);
  const countComplete = coutOrder("Thành công", dataProfit);
  const countCancel = coutOrder("Đã hủy", dataProfit);
  return (
    <>
      <div className="py-10 -mx-8 bg-blue-300">
        <div className="flex flex-wrap gap-y-4 ">
          <CalcOrder
            title="Tổng số hàng"
            count={allQuantityPro?.total || 0}
            color="blue"
            icon={myIcon.totalQuantity}
          ></CalcOrder>
          {/* Chờ xử lý */}
          <CalcOrder
            title="Chờ xử lý"
            count={countWait || 0}
            color="yellow"
            icon={myIcon.wait}
          ></CalcOrder>
          {/* Đã xác nhận */}
          <CalcOrder
            title="Đã xác nhận"
            count={countAccept || 0}
            color="teal"
            icon={myIcon.wait}
          ></CalcOrder>
          {/* Thành công */}
          <CalcOrder
            title="Thành công"
            count={countComplete || 0}
            color="green"
            icon={myIcon.complete}
          ></CalcOrder>
          {/* Đã hủy */}
          <CalcOrder
            title="Đã hủy"
            count={countCancel || 0}
            color="pink"
            icon={myIcon.cancel}
          ></CalcOrder>
          {/* Money */}
          <CalcOrder
            title="$ Tháng này"
            count={nFormatter(profitNowMonth, 1) || 0}
            color="orange"
            icon={myIcon.money}
          ></CalcOrder>
        </div>
      </div>
      {dataProfitPerMonth && (
        <div className="flex mt-5">
          <div className="w-full p-5  bg-white rounded-lg shadow-md w-[70%]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-semibold">Biểu đồ</span>
              </div>
              <div className="flex gap-x-3">
                <span
                  className={`px-4 py-2  border border-gray-300 rounded-lg cursor-pointer ${
                    indexShowChart === 1 ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => {
                    setIndexShowChart(1);
                  }}
                >
                  Ngày
                </span>
                <span
                  className={`px-4 py-2  border border-gray-300 rounded-lg cursor-pointer ${
                    indexShowChart === 2 ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => {
                    setIndexShowChart(2);
                  }}
                >
                  Tháng
                </span>               
              </div>
            </div>
            {indexShowChart === 1 && (
              <ChartProfit
                options={options("Doanh Thu theo ngày")}
                data={data(
                  daysDataProfit,
                  labelDays.map((item) => item + 1)
                )}
              ></ChartProfit>
            )}
            {indexShowChart === 2 && (
              <ChartProfit
                options={options("Doanh thu theo tháng")}
                data={data(newXData, labelsMonth)}
              ></ChartProfit>
            )}
          </div>
          <div className="flex items-center ml-5 bg-white rounded-lg shadow-md rouned-lg">
            <ChartDonut
              data={{
                labels: ["Chờ xử lý", "Đã xác nhận", "Thành công", "Đã hủy"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [countWait, countAccept, countComplete, countCancel],
                    backgroundColor: [
                      "#FEC260",
                      "#009688",
                      "#4caf50",
                      "#e91e63",
                    ],
                    borderColor: [
                      "#ccc"
                    ],
                    borderWidth: 1,
                    cutout: "70%",
                  },
                ],
              }}
            ></ChartDonut>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeProfit;
