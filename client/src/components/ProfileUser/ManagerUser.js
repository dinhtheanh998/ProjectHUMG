import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import ProfileUser from "./ProfileUser";

const ManagerUser = () => {
  return (
    <div className="flex page-container gap-x-5">
      <div className="w-[30%]">
        <h3 className="mb-5 text-2xl font-bold uppercase">
          Thông tin tài khoản
        </h3>
        <div className="flex flex-col gap-y-4">
                  <NavLink
                      to="profile-user"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg"
                : "bg-white text-gray-800 py-2 px-4 font-bold rounded-lg"
            }
          >
            Tài khoản
          </NavLink>
          <NavLink
            to="order-user"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg"
                : "bg-white text-gray-800 py-2 px-4 font-bold rounded-lg"
            }
          >
            Đơn hàng
          </NavLink>
        </div>
      </div>
      <div className="w-[70%]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ManagerUser;
