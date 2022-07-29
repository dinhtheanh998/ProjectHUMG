import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../../context/Cartcontext";

const Base = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div className="my-10 page-container">{<Outlet></Outlet>}</div>      
      <Footer></Footer>
    </div>
  );
};

const Header = () => {
  const { cartItems, calcQuantity } = useCart();
  // const countCartItems = cartItems.reduce((acc, item) => {
  //   return acc + item.quantity;
  // }, 0);
  // console.log(countCartItems);
  return (
    <div className="">
      <div className="w-full bg-black">
        <div className="flex items-center justify-between w-full h-12 text-white top-header page-container ">
          <a href="tel:0961494001">0961494001</a>
          <div className="flex items-center gap-x-5">
            <span>Đăng Nhập</span>
            <span>Đăng Ký</span>
          </div>
        </div>
      </div>
      <nav className="flex items-center justify-between  my-5 shadow-sm menu page-container h-[70px]">
        <div className="h-full">
          <img
            src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png"
            alt=""
            className="w-full h-full"
          />
        </div>
        <ul className="nav-list">
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
            <span className="absolute top-0 right-0 w-5 h-5 font-semibold leading-5 text-center text-white bg-pink-500 rounded-full translate-x-2/4">
              {calcQuantity() || 0}
            </span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
const Footer = () => {
  return (
    <>
      <div className="py-10 bg-gray-300">
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
