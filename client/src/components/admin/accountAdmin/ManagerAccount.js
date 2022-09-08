import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAllUsers,
  registerUser,
} from "../../../redux/apiRequest";
import BottomBodyAdm from "../BottomBodyAdm";
import { loginSuccess } from "../../../redux/authSlice";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { createAxios } from "../../../createInstance";
import {
  DELETESUCCESS,
  notifySuccess,
  notifyWarn,
  NOTPERMISSION,
} from "../../../config/config";
import ViewInfo from "./ViewInfo";
const ManagerAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users?.users?.allUsers);
  const notiDelete = useSelector((state) => state.users?.msg);
  const { register, handleSubmit } = useForm();
  const [registerShow, setRegisterShow] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();
  const [infoShow, setInfoShow] = React.useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = React.useState(false);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleOnSubmit = (data) => {
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        console.log(res);
        setRegisterShow(false);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
    if (notiDelete === NOTPERMISSION) {
      notifyWarn(notiDelete);
    } else if (notiDelete === DELETESUCCESS) {
      notifySuccess(notiDelete);
      setReload(!reload);
    }
  };

  useEffect(() => {
    getAllUsers(user?.accessToken, dispatch, axiosJWT);
  }, [reload]);
  return (
    <BottomBodyAdm>
      <div className="py-5">
        {user?.isAdmin && (
          <button
            type="button"
            className="px-3 py-2 mb-5 font-semibold text-white bg-blue-400 rounded-lg"
            onClick={() => {
              setRegisterShow(true);
            }}
          >
            Thêm tài khoản
          </button>
        )}
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-10">STT</th>
              <th className="w-[20%]">Tài Khoản</th>
              <th className="">Email</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>
          {userList && (
            <tbody className="font-semibold text-center">
              {userList.map((user, index) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="flex gap-x-5">
                      <button
                        className="px-4 py-2 font-semibold text-white bg-blue-300 rounded-lg text-normal"
                        onClick={() => {
                          setInfoShow(true);
                          setUserInfo(user);
                          console.log(user);
                        }}
                      >
                        Xem
                      </button>
                      <button
                        className="px-4 py-2 font-semibold text-white bg-red-300 rounded-lg text-normal"
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {registerShow && (
          <Register
            register={register}
            handleSubmit={handleSubmit}
            handleOnSubmit={handleOnSubmit}
            setRegisterShow={setRegisterShow}
          ></Register>
        )}
        {infoShow && (
          <ViewInfo
            info={userInfo}
            setReload={() => {
              setReload(!reload);
            }}
            setInfoShow={() => {
              setInfoShow(false);
            }}
          />
        )}
      </div>
    </BottomBodyAdm>
  );
};

function Register({ register, handleSubmit, handleOnSubmit, setRegisterShow }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black opacity-20 p-5  modal `}
        onClick={() => {
          setRegisterShow(false);
        }}
      ></div>
      <form
        className="min-w-[300px] z-[9999] bg-white p-10 absolute rounded-lg flex flex-col items-center justify-center"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <span
          className="absolute top-0 right-0 text-gray-600 bg-white rounded-full translate-x-2/4 -translate-y-2/4 w-[30px] h-[30px] flex items-center justify-center shadow-md cursor-pointer"
          onClick={() => {
            setRegisterShow(false);
          }}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <h3 className="text-xl font-semibold">Đăng ký tài khoản</h3>
        <div className="flex flex-col w-full mb-3 gap-y-2">
          <label className="font-semibold" htmlFor="userName">
            Tài khoản
          </label>
          <input
            type="text"
            {...register("username")}
            className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
          />
        </div>
        <div className="flex flex-col w-full mb-3 gap-y-2">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
          />
        </div>
        <div className="flex flex-col w-full mb-3 gap-y-2">
          <label className="font-semibold" htmlFor="password">
            Mật khẩu
          </label>
          <input
            type="text"
            {...register("password")}
            className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
          />
        </div>
        <button className="w-full px-4 py-2 font-semibold text-white bg-blue-400 rounded-xl">
          Đăng ký
        </button>
      </form>
    </div>,

    document.querySelector("body")
  );
}

export default ManagerAccount;
