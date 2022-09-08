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
      <div className="my-10 min-h-[60vh] bg-">
        {<Outlet></Outlet>}
        <a
          href="https://www.facebook.com/messages/t/dinhtheanh998"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-3/4 right-5 w-[50px] h-[50px] rounded-full bg-blue-400 border border-blue-400 cursor-pointer"
        >
          <div className="w-full h-full bg-blue-400 rounded-full ping-mess"></div>
          <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-blue-400 rounded-full anima-shake">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#fff"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </div>
        </a>
      </div>
      <Footer></Footer>
    </div>
  );
};

const Header = ({ user, handleLogout }) => {
  const { cartItems, calcQuantity } = useCart();
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const navigate = useNavigate();
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
      <div className="top-0 left-0 right-0 z-30 w-full transition linear duration-[300ms] bg-white border-b border-gray-300 shadow-sm header hover:bg-[#f9f86c]">
        <div className="flex items-center justify-between w-full text-black h-14 top-header page-container">
          <a
            href="tel:0961494001"
            className="select-none hover:[#8e8e8e] font-semibold text-base"
          >
            0961494001
          </a>
          <div className="flex items-center select-none gap-x-5">
            {user && (
              <div className="flex items-center gap-x-5">
                <NavLink
                  to="manager-user/profile-user"
                  className="w-8 h-8 border-4 border-[#8e8e8e] rounded-full cursor-pointer rouned-full"
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
        <div
          className="flex items-center h-full px-4 cursor-pointer select-none"
          onClick={() => {
            navigate("/");
          }}
        >
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
      <div className="clear-both py-10 bg-black">
        <div className="grid grid-cols-4 text-white page-container footer gap-x-20">
          <div className="footer-contact">
            <p className="text-xl font-bold">Liên Hệ</p>
            <div className="flex flex-col info-footer">
              <p>
                <strong>Địa chỉ:</strong> 66/145 Cổ nhuế-Bắc Từ liêm-HN
              </p>
              <a href="tel:0901xxxxxx">
                <strong>Số Điện thoại:</strong> 0901xxxxxx
              </a>
              <a href="mailto:company@gmail.com">
                {" "}
                <strong>Email:</strong> company@gmail.com
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <p className="text-xl font-bold">Chính sách đổi trả</p>
            <div className="info-footer">
              <p>
                Tìm hiểu chính sách đổi trả của chúng tôi ở
                <NavLink to="chinh-sach-doi-tra"><strong> Đây!</strong></NavLink>
              </p>
              {/* <p>Số Điện thoại</p>
              <p>Email</p> */}
            </div>
          </div>
          <div className="footer-contact">
            <p className="text-xl font-bold">Tìm chúng tôi trên</p>
            <div className="flex flex-col info-footer gap-y-3">
              <a href="facebook.com" className="flex items-center gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                >
                  <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
                </svg>
                <span className="font-semibold uppercase"> Facebook</span>
              </a>
              <a href="facebook.com" className="flex items-center gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                >
                  <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                </svg>
                <span className="font-semibold uppercase"> Twitter</span>
              </a>
              <a href="facebook.com" className="flex items-center gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                >
                  <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path>
                </svg>
                <span className="font-semibold uppercase"> Youtube</span>
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <h3 className="text-2xl font-bold text-white">
              9Eight luôn lắng nghe bạn
            </h3>
            <p>
              Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng
              góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản
              phẩm tốt hơn nữa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
