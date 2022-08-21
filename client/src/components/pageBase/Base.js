import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cartcontext";
import { createAxios } from "../../createInstance";
import { logOut } from "../../redux/apiRequest";
import { logOutSuccess } from "../../redux/authSlice";
import Login from "../Login-Logout/Login";
import Register from "../Login-Logout/Register";

const Base = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };

  return (
    <div className="relative">
      <Header user={user} handleLogout={handleLogout}></Header>
      <div className="my-10 ">{<Outlet></Outlet>}</div>
      <Footer></Footer>
    </div>
  );
};

const Header = ({ user, handleLogout }) => {
  const { cartItems, calcQuantity } = useCart();
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  // const countCartItems = cartItems.reduce((acc, item) => {
  //   return acc + item.quantity;
  // }, 0);
  // console.log(countCartItems);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        document.querySelector(".header").classList.add("fixed");
      } else {
        document.querySelector(".header").classList.remove("fixed");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="top-0 left-0 right-0 z-30 w-full transition-all bg-black header">
        <div className="flex items-center justify-between w-full text-white h-14 top-header page-container">
          <a href="tel:0961494001" className="select-none">
            0961494001
          </a>
          <div className="flex items-center select-none gap-x-5">
            {user && (
              <div className="flex items-center gap-x-5">
                <NavLink
                  to="manager-user/profile-user"
                  className="w-8 h-8 border-4 border-white rounded-full cursor-pointer rouned-full"
                >
                  <img
                    src={`${
                      user.avatar
                        ? `/avatarUser/${user.avatar}`
                        : "/avatarUser/defaultAvatar.jpg"
                    }`}
                    alt=""
                    className="object-cover w-full h-full p-0 m-0 rounded-full"
                  />
                </NavLink>
                <span
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer gap-x-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Đăng xuất</span>
                </span>
              </div>
            )}
            {!user && (
              <div className="flex items-center gap-x-3">
                <span
                  onClick={() => {
                    setLoginShow(true);
                  }}
                  className="flex items-center gap-x-2"
                >
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-semibold">Đăng nhập</span>
                </span>
                <span
                  onClick={() => {
                    setRegisterShow(true);
                  }}
                  className="flex items-center gap-x-2"
                >
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span className="font-semibold">Đăng ký</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="flex items-center justify-between  my-5 shadow-sm menu page-container h-[70px]">
        <div className="flex items-center h-full cursor-pointer select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <ul className="select-none nav-list">
          <li className="nav-items">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/san-pham"
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Sản phẩm
            </NavLink>
          </li>
        </ul>

        <div className="cart">
          <NavLink to="/Cart" className="relative inline-block">
            <span className="w-[30px]">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </span>
            <span className="absolute top-0 right-0 w-5 h-5 font-semibold leading-5 text-center text-white bg-pink-500 rounded-full select-none translate-x-2/4">
              {calcQuantity() || 0}
            </span>
          </NavLink>
        </div>
      </nav>
      {loginShow && (
        <Login
          loginShow={loginShow}
          setLoginShow={setLoginShow}
          setRegisterShow={setRegisterShow}
        ></Login>
      )}
      {registerShow && (
        <Register
          registerShow={registerShow}
          setRegisterShow={setRegisterShow}
          setLoginShow={setLoginShow}
        ></Register>
      )}
    </>
  );
};
const Footer = () => {
  return (
    <>
      <div className="clear-both py-10 bg-gray-300">
        <div className="grid grid-cols-4 page-container footer gap-x-20 ">
          <div className="footer-contact">
            <p className="text-xl font-bold">Liên Hệ</p>
            <div className="info-footer">
              <p>Địa chỉ:</p>
              <p>Số Điện thoại</p>
              <p>Email</p>
            </div>
          </div>
          <div className="footer-contact">
            <p className="text-xl font-bold">Chính sách đổi trả</p>
            <div className="info-footer">
              <NavLink to="chinh-sach-doi-tra">Chính sách đổi trả</NavLink>
              {/* <p>Số Điện thoại</p>
              <p>Email</p> */}
            </div>
          </div>
          <div className="footer-contact">
            <p className="text-xl font-bold">Liên Hệ</p>
            <div className="info-footer">
              <p>Địa chỉ:</p>
              <p>Số Điện thoại</p>
              <p>Email</p>
            </div>
          </div>
          <div className="footer-contact">
            <p className="text-xl font-bold">Liên Hệ</p>
            <div className="info-footer">
              <p>Địa chỉ:</p>
              <p>Số Điện thoại</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
