import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { convertDate } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
const OrderUser = () => {
  const [dataOrder, setDataOrder] = React.useState();
  const user = useSelector((state) => state.auth.login.currentUser);
  const username = user?.username;
  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios
      .get(`/api/order/v1/getOrderbyUser/${username}`)
      .then((res) => {
        if (!unmounted) {
          setDataOrder(res.data);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("request canceled:" + err.message);
        } else {
          console.log("another error:" + err.message);
        }
      });
    return () => {
      unmounted = true;
      source.cancel("cancel request");
    };
  }, [username]);
  console.log(dataOrder);
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {dataOrder?.map((item, index) => {
            return (
              <tr
                key={uuidv4()}
                className={`
                                ${
                                  item.state === "Chờ xác nhận"
                                    ? "bg-yellow-500"
                                    : item.state === "Thành công"
                                    ? "bg-green-500"
                                    : item.state === "Đã hủy"
                                    ? "bg-red-500"
                                    : item.state === "Đã xác nhận" ? "bg-blue-500" : ""
                                }
                                font-semibold
                                `}
              >
                <td className="p-2">{item._id}</td>
                <td>{convertDate(item.createdAt)}</td>
                <td>{item.total}</td>
                <td>{item.state}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderUser;
