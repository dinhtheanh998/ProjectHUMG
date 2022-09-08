import axios from "axios";
import React, { useEffect } from "react";
import BottomBodyAdm from "../BottomBodyAdm";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
const ExchangeRequestAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataReturn, setdataReturn] = React.useState("");
  const [reload, setReload] = React.useState(false);
  useEffect(() => {
    axios.get("/api/exchangeRequest").then((res) => {
      setdataReturn(res.data);
    });
  }, [reload]);
  const handleOnSubmit = (e, id) => {
    console.log(id);
    axios
      .put(`/api/exchangeRequest/${id}`, { status: e.target.value })
      .then((res) => {
        console.log(res);
      });
      setReload(!reload);
  };
  return (
    <BottomBodyAdm>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <table className="w-full">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Số điện thoại</th>
              <th>Sản phẩm cần đổi</th>
              <th>Sản phẩm muốn đổi</th>
              <th>Lí do</th>
              <th className="min-w-[120px]">Trạng thái</th>
            </tr>
          </thead>
          {dataReturn && (
            <tbody className="font-semibold">
              {dataReturn.map((item, index) => {
                return (
                  <tr
                    key={uuidv4()}
                    className={
                      item.status === "Chờ xử lý"
                        ? "bg-yellow-300/[.6]"
                        : item.status === "Đã xử lý"
                        ? "bg-green-400/[.6] "
                        : "bg-gray-400/[.6]"
                    }
                  >
                    <td className="px-2">{item.OrderId}</td>
                    <td className="px-2">{item.phone}</td>
                    <td className="px-2">{item.productFromCustomer}</td>
                    <td className="px-2">{item.productNew}</td>
                    <td className="px-2">{item.reason}</td>
                    <td className="px-2">
                      <select
                        // id="underline_select"
                        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer cursor-pointer"
                        {...register("state")}
                        onChange={(e) => {
                          handleOnSubmit(e, item._id);
                        }}
                      >
                        <option value="">{item.status}</option>
                        <option value="Đã xử lý" >Đã xử lý</option>
                        <option value="Chờ xử lý">Chờ xử lý</option>
                        <option value="Hủy bỏ">Hủy bỏ</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </form>
    </BottomBodyAdm>
  );
};

export default ExchangeRequestAdmin;
