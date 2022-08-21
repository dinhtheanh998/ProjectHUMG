import React from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";

const Register = ({ registerShow = false, setRegisterShow, setLoginShow }) => {
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
    const a = await registerUser(
      data,
      dispatch,
      navigate,
      setRegisterShow,
      setLoginShow
    );
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 modal page-container">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black opacity-40 p-5  modal ${
          registerShow ? "" : "invisible opacity-0"
        }`}
        onClick={() => {
          setRegisterShow(false);
        }}
      ></div>
      <div className="absolute z-[99999] flex items-center mx-auto  justify-center">
        <section className="h-[auto] bg-white border border-gray-300 rounded-xl">
          <div className="container h-full px-6 py-12">
            <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6 w-[500px]">
              <div className="w-full">
                <h3 className="flex items-center justify-center mb-5 text-2xl font-semibold uppercase">
                  Đăng Ký
                </h3>
                <form
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className="flex flex-col w-full mt-4"
                >
                  <div className="w-full mb-6">
                    <input
                      type="text"
                      name="username"
                      {...register("username")}
                      className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                      placeholder="Tài khoản"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="password"
                      {...register("password")}
                      className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <p className="mb-3 text-sm text-red-500">
                    {errors.login?.message}
                  </p>
                  <div className="mb-2">
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                      placeholder="email"
                    />
                  </div>
                  <p className="mb-3 text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                  <div
                    className="flex justify-end mb-3 font-semibold text-blue-500 uppercase cursor-pointer"
                    onClick={() => {
                      setRegisterShow(false);
                      setLoginShow(true);
                    }}
                  >
                    Đăng nhập
                  </div>
                  <button
                    type="submit"
                    className="inline-block w-full py-3 text-sm font-semibold leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={() => {
                      clearErrors();
                    }}
                  >
                    Đăng ký
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

export default Register;
