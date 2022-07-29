import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Category = () => {
  const [cateList, setcateList] = useState();
  const [notiDele, setNotiDele] = useState(true);
  const notify = () =>
    toast.success("Xóa thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const handleDelete = (e) => {
    const item = e.target.closest(".cate-list").querySelector(".cate-item");
    axios.delete(`/api/category/${item.dataset.id}`).then((res) => {
      if (res.status === 200) notify();
      setNotiDele(!notiDele);
    });
  };
  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setcateList(res.data);
    });
  }, [notiDele]);

  return (
    <>
      <NavLink
        to="add-category"
        className="px-4 py-3 mb-4 text-lg text-white bg-blue-500 rounded-lg"
      >
        Thêm mới
      </NavLink>
      {(!cateList || cateList.length <= 0) && (
        <h2 className="text-xl font-semibold text-center">
          Dữ liệu đang trống
        </h2>
      )}
      {cateList && cateList.length > 0 && (
        <table className="w-full mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2">Tên loại</th>
              <th className="py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cateList.map((item) => {
              return (
                <tr key={item._id} className="cate-list">
                  <td data-id={item._id} className="cate-item">
                    {item.name}
                  </td>
                  <td>
                    <button className="px-4 py-2 mr-5 text-white bg-blue-400 rounded-lg">
                      Xem
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-red-400 rounded-lg"
                      onClick={handleDelete}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Category;
