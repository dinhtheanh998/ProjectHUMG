import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const Login = ({ loginShow = false, setLoginShow }) => {
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
    const a = await loginUser(data, dispatch, navigate);
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
          console.log("ada");
          setLoginShow(false);
        }}
      ></div>
      <div className="absolute z-[99999] flex items-center mx-auto  justify-center">
        <section className="h-[auto] w-[1200px] bg-white border border-gray-300 rounded-xl">
          <div className="container h-full px-6 py-12">
            <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6">
              <div className="mb-12 md:w-8/12 lg:w-6/12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="LoginImg"
                />
              </div>
              <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <h3 className="flex items-center justify-center mb-5 text-2xl font-semibold uppercase">
                  Đăng Nhập
                </h3>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                  <div className="mb-6">
                    <input
                      type="text"
                      name="username"
                      {...register("username")}
                      className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Tài khoản"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="password"
                      {...register("password")}
                      className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <p className="mb-3 text-sm text-red-500">
                    {errors.login?.message}
                  </p>
                  <button
                    type="submit"
                    className="inline-block w-full py-3 text-sm font-semibold leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={() => {
                      clearErrors();
                    }}
                  >
                    Đăng nhập
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
