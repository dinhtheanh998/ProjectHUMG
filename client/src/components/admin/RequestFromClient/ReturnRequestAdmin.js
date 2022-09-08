import { Select } from "antd";
import React, { useEffect } from "react";
import BottomBodyAdm from "../BottomBodyAdm";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const ReturnRequestAdmin = () => {
  const [dataReturn, setdataReturn] = React.useState("");
  useEffect(() => {
    axios.get("/api/returnRequest").then((res) => {
      setdataReturn(res.data);
    });
  }, []);

  return (
    <BottomBodyAdm>
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Số tài khoản</th>
            <th>Tên ngân hàng</th>
            <th>Chủ tài khoản</th>
            <th>Chi nhánh</th>
            <th>Tên sản phẩm trả về</th>
            <th>Lí do</th>
            <th className="min-w-[120px]">Trạng thái</th>
          </tr>
        </thead>
        {dataReturn && (
          <tbody>
            {dataReturn.map((item, index) => {
              return (
                <tr key={uuidv4()}>
                  <td className="px-2">{item.OrderId}</td>
                  <td className="px-2">{item.bankAccount}</td>
                  <td className="px-2">{item.bankName}</td>
                  <td className="px-2">{item.accountHolder}</td>
                  <td className="px-2">{item.bankBranch}</td>
                  <td className="px-2">Áo sơ mi trắng</td>
                  <td className="px-2">{item.description}</td>
                  <td className="px-2">
                    <select
                      id="underline_select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option disabled>{item.status}</option>
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đã xử lý">Đã xử lý</option>
                      <option value="Hủy bỏ">Hủy bỏ</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </BottomBodyAdm>
  );
};

export default ReturnRequestAdmin;
