import axios from "axios";
import * as dateFns from "date-fns";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomProvider, DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { nFormatter } from "../../../config/config";
import myIcon from "../../iconAdmin";
import CalcOrder from "./CalcOrder";
import { data, handleData, options } from "./ChartData";
import { ChartDonut, ChartProfit } from "./ChartProfit";
import "./Datepick.scss";
import ListUser from "./ListUser";
registerLocale("vi", vi);
const Ranges = [
  {
    label: "Hôm nay",
    value: [dateFns.startOfDay(new Date()), dateFns.endOfDay(new Date())],
  },
  {
    label: "Hôm qua",
    value: [
      dateFns.startOfDay(dateFns.addDays(new Date(), -1)),
      dateFns.endOfDay(dateFns.addDays(new Date(), -1)),
    ],
  },
  {
    label: "Tuần trước",
    value: [
      dateFns.startOfDay(dateFns.subDays(new Date(), 6)),
      dateFns.endOfDay(new Date()),
    ],
  },
  {
    label: "30 ngày trước",
    value: [
      dateFns.startOfDay(dateFns.subDays(new Date(), 29)),
      dateFns.endOfDay(new Date()),
    ],
  },
];

const labelsMonth = [
  "Thg 1",
  "Thg 2",
  "Thg 3",
  "Thg 4",
  "Thg 5",
  "Thg 6",
  "Thg 7",
  "Thg 8",
  "Thg 9",
  "Thg 10",
  "Thg 11",
  "Thg 12",
];

const HomeProfit = () => {
  const [value, setValue] = React.useState(null);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [dataChart, setDataChart] = useState([]);

  const [allQuantityPro, setAllQuantityPro] = React.useState();
  const [dataProfit, setDataProfit] = React.useState();
  const [dataProfitMonthy, setDataProfitMonthy] = React.useState();
  const [indexShowChart, setIndexShowChart] = React.useState(2);
  useEffect(() => {
    axios.get("/api/productsInfo/getTotalQuantity").then((res) => {
      setAllQuantityPro(res.data[0]);
    });
    axios.get("/api/order/getProfitNowMonth").then((res) => {
      setDataProfit(res.data);
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
  const countWait = coutOrder("Chờ xác nhận", dataProfit);
  const countAccept = coutOrder("Đã xác nhận", dataProfit);
  const countComplete = coutOrder("Thành công", dataProfit);
  const countCancel = coutOrder("Đã hủy", dataProfit);

  const Calendar = {
    sunday: "CN",
    monday: "Th2",
    tuesday: "Th3",
    wednesday: "Th4",
    thursday: "Th5",
    friday: "Th6",
    saturday: "Th7",
    ok: "OK",
    formattedMonthPattern: "MMM yyyy",
    formattedDayPattern: "dd MMM yyyy",
    dateLocale: vi,
  };

  const locale = {
    Calendar,
    Ranges,
    DatePicker: {
      ...Calendar,
    },
    DateRangePicker: {
      ...Calendar,
    },
  };
  // value.forEach(item => {
  //   // console.log(dateFns.parseISO('2022-08-19T18:05:22.286+00:00'))
  //   console.log(dateFns.formatISO(item));
  // })
  const handleChangeDateRange = (value) => {
    if (value === null) {
      setValue(null);
      setIndexShowChart(2)
      return;
    }
    let startDate = dateFns.formatISO(value[0]);
    let endDate = dateFns.formatISO(value[1]);
    setValue(value);
    setIndexShowChart(1)
    axios
      .get(
        `/api/order/v1/getOrderbyDateRange/startDate=${startDate}&endDate=${endDate}`
      )
      .then((res) => {
        setDataChart(res.data);
      });
  };
  console.log(dataChart);
  return (
    <>
      <div className="py-10 bg-blue-300">
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
      <div className="flex mt-5">
        <div className="w-full p-5  bg-white rounded-lg shadow-md w-[70%]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-semibold">Biểu đồ</span>
            </div>
            <div className="flex gap-x-3">
              <span
                className={`px-4 py-1  border border-gray-300 rounded-lg cursor-pointer flex items-center ${
                  indexShowChart === 2 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => {
                  setIndexShowChart(2);
                  setValue(null);
                }}
              >
                Tháng
              </span>
              <CustomProvider locale={locale}>
                <DateRangePicker
                  value={value}
                  onChange={handleChangeDateRange}
                  ranges={Ranges}
                  placeholder="Chọn ngày"
                />
              </CustomProvider>
            </div>
          </div>
          {indexShowChart === 2 && (
            <ChartProfit
              options={options("Doanh thu theo tháng")}
              data={data(newXData, labelsMonth, 0.4)}
            ></ChartProfit>
          )}
          {indexShowChart === 1 && (
            <ChartProfit
              options={options("Doanh thu")}
              data={data(
                dataChart.map((item) => {
                  return item.total;
                }),
                dataChart.map((item) => {
                  return item._id;
                }),
                0.4
              )}
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
                  backgroundColor: ["#FEC260", "#009688", "#4caf50", "#e91e63"],
                  borderColor: ["#ccc"],
                  borderWidth: 1,
                  cutout: "70%",
                },
              ],
            }}
          ></ChartDonut>
        </div>
      </div>
      <div className="mt-5 bg-white rounded-lg">
        <div className="flex items-center px-4 pt-2 text-base font-semibold border-b border-gray-300">
          <span className="w-[25%]">Thông tin</span>
          <span className="w-[25%]">Email</span>
          <span className="w-[15%]">Ngày tạo</span>
          <span className="w-[15%] text-center">Số đơn đã đặt</span>
          <span className="w-[20%] text-center">Role</span>
        </div>
        <ListUser></ListUser>
      </div>      
    </>
  );
};

export default HomeProfit;
