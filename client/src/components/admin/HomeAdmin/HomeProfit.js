import axios from "axios";
import React, { useEffect, useRef } from "react";
import CalcOrder from "./CalcOrder";
import myIcon from "../../iconAdmin";
import { converCurences, nFormatter } from "../../../config/config";
import ChartProfit from "./ChartProfit";
import  {data, options , handleData} from "./ChartData"


const HomeProfit = () => {
  const [dataOrder, setDataOrder] = React.useState();
  const [dataProfit, setDataProfit] = React.useState();
  const [dataProfitPerMonth, setDataProfitPerMonth] = React.useState();
  const [dataProfitMonthy, setDataProfitMonthy] = React.useState();
  useEffect(() => {
    axios.get("/api/order/statistical").then((res) => {
      setDataOrder(res.data);
    });
    axios.get("/api/order/getProfitNowMonth").then((res) => {
      setDataProfit(res.data);
    });
    axios.get("/api/order/getProfitPerMonth").then((res) => {
      setDataProfitPerMonth(res.data);
    });
    axios.get("/api/order/getProfitMonthly").then((res) => {
      setDataProfitMonthy(res.data);    
    })
  }, []);

  const coutOrder = (state, data) => {
    if (data) {
      const count = data.filter((item) => item._id === state);
      return count[0]?.count;
    }
  };
  
  const newXData = handleData(dataProfitMonthy);

  const countWait = coutOrder("Chờ xác nhận", dataOrder);
  const countComplete = coutOrder("Thành công", dataOrder);
  const countCancel = coutOrder("Đã hủy", dataOrder);
  return (
    <>
      <div className="py-10 -mx-8 bg-blue-300">
        <div className="flex flex-wrap ">
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
            count={nFormatter(dataProfit,1) || 0}
            color="orange"
            icon={myIcon.money}
          ></CalcOrder>
        </div>
      </div>
      {dataProfitPerMonth && <div className="w-[500px]">
        <ChartProfit options={options} data={data(newXData)} ></ChartProfit> 
      </div>  }
    </>
  );
};

export default HomeProfit;
