import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputRadio from "../../customForm/InputRadio";
const ViewInfo = ({ info: { isAdmin, ...info }, setReload,setInfoShow }) => {
  const [adminRole, setAdminRole] = React.useState(isAdmin);
  const { register, handleSubmit, control, watch } = useForm();
  const handleOnSubmit = (data) => {
    axios
      .put(`/v1/user/updateFromAdmin/${info._id}`, {
        ...data,
        isAdmin: adminRole,
      })
      .then((res) => {
        console.log(res);
          setReload();
          setInfoShow()
      });
    // console.log({ ...data, isAdmin: adminRole });
  };
  useEffect(() => {
    setAdminRole(isAdmin);
  }, [isAdmin, info._id]);
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="w-[400px] bg-white rounded-lg p-4"
    >
      <div className="flex flex-col mb-3">
        <label htmlFor="">Tên tài khoản</label>
        <span className="w-full px-3 py-2 bg-gray-200 rounded-lg cursor-not-allowed select-none">
          {info.username}
        </span>
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="">Mật khẩu</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-blue-300"
          {...register("password")}
        />
      </div>

      <div className="mb-3">
        <div className="flex items-center">
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              id="isAdmin"
              checked={adminRole}
              onClick={() => {
                setAdminRole(!adminRole);
              }}
              {...register("isAdmin")}
            ></input>
            <label htmlFor="isAdmin" className="cursor-pointer">
              Admin
            </label>
          </div>
        </div>
      </div>
      <button className="px-3 py-1 font-semibold text-white transition-all bg-blue-400 rounded-lg hover:bg-blue-800">
        Lưu
      </button>
    </form>
  );
};

export default ViewInfo;
