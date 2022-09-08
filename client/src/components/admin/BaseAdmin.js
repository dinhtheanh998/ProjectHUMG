import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import HomeAdmin from "./HomeAdmin/HomeAdmin";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { logOutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
const BaseAdmin = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?.id;
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  return (
    <div className="page-container">
      <div className="grid w-full grid-cols-10 shadow-xl">
        <div className="relative h-auto col-start-1 col-end-3 bg-black rounded-lg">
          <div className="sticky top-5">
            <div className="h-[200px] text-center">
              <img
                src="https://editorial.designtaxi.com/editorial-images/news-ABC130921/ABC-Logo-Redesign-Paul-Rand-2.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
              <span className="text-white">Home</span>
            </NavLink>
            <NavLink
              to="product-Admin"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </span>
              <span className="text-white">Sản phẩm</span>
            </NavLink>
            <NavLink
              to="ProductDetailsAdmin"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                  />
                </svg>
              </span>
              <span className="text-white">Chi tiết sản phẩm</span>
            </NavLink>
            <NavLink
              to="CategoryAdmin"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </span>
              <span className="text-white">Loại sản phẩm</span>
            </NavLink>
            <NavLink
              to="OrderAdmin"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              <span className="text-white">Đơn Hàng</span>
            </NavLink>
            <NavLink
              to="returnRequest"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="text-white">Trả hàng</span>
            </NavLink>
            <NavLink
              to="exchangeRequest"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </span>
              <span className="text-white">Đổi hàng</span>
            </NavLink>
            <NavLink
              to="account"
              className={({ isActive }) =>
                isActive ? "nav-admin-link-active" : "nav-admin-link"
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="text-white">Tài khoản</span>
            </NavLink>
            <button className="nav-admin-link" onClick={handleLogout}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span className="text-white">Đăng xuất</span>
            </button>
          </div>
        </div>
        <div className="h-full col-start-3 col-end-11 bg-[#f7f7f7] rounded-lg">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default BaseAdmin;
