import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const Login = ({ loginShow = false, setLoginShow, setRegisterShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  if (document === undefined) {
    return <div className="modal"></div>;
  }
  const handleOnSubmit = async (data) => {
    const a = await loginUser(
      data,
      dispatch,
      navigate,
      setLoginShow,
      setLoginShow
    );
    console.log(a);
    if (a) {
      setError("login", { type: "custom", message: a });
    }
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 modal page-container">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black opacity-40 p-5  modal ${
          loginShow ? "" : "invisible opacity-0"
        }`}
        onClick={() => {
          setLoginShow(false);
        }}
      ></div>
      <div className="absolute z-[99999] flex items-center mx-auto  justify-center">
        <section className="h-[auto] w-[500px] bg-white border border-gray-300 rounded-xl">
          <div className="container w-full h-full px-6 py-12">
            <div className="flex flex-wrap items-center justify-center w-full h-full text-gray-800 g-6">
              <div className="w-full">
                <h3 className="flex items-center justify-center mb-5 text-2xl font-semibold uppercase gap-x-3">
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                  <span>Đăng Nhập</span>
                </h3>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                  <div className="mb-6">
                    <input
                      type="text"
                      name="username"
                      {...register("username")}
                      className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-blue-500 focus:bg-white focus:ring-0 focus:outline-blue-400"
                      placeholder="Tài khoản"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="password"
                      {...register("password")}
                      className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-blue-500 focus:bg-white focus:ring-0 focus:outline-blue-400"
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <p className="mb-3 text-sm text-red-500">
                    {errors.login?.message}
                  </p>
                  <div className="float-right mb-3 font-semibold text-blue-500 uppercase cursor-pointer" onClick={()=> {
                    setRegisterShow(true)
                    setLoginShow(false)
                  }}>
                    Đăng ký
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full py-3 text-sm font-semibold leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg gap-x-3"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={() => {
                      clearErrors();
                    }}
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
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </span>
                    <span>Đăng nhập</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Login;
