import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
const ProfileUser = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username: user?.username,
      avatar: user?.avatar,
    },
  });
  const [dataUser, setDataUser] = useState();
  const [imgData, setImgData] = useState(null);
  const [defaultImg, setDefaultImg] = useState(user?.avatar);
  const [image, setImage] = useState(null);

  
  useEffect(() => {
    axios.get(`/v1/user/${user._id}`).then((res) => { 
      setDataUser(res.data);
      setDefaultImg(res.data.avatar);
    })
  },[user?.avatar, user?.password ,user?._id])
  console.log(dataUser);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setImgData(file);
      setDefaultImg(null);
    }
  };

  const handleOnSubmit = (data) => {
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("email", data.email);
    formData.append("password", data.password);

    axios.put(`/v1/user/update/${user._id}`, formData).then((res) => {
      console.log(res.data);
    });
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  };
  return (
    <form className="page-container" onSubmit={handleSubmit(handleOnSubmit)}>
      <label
        htmlFor="avatar"
        className="relative flex items-center justify-center w-full mb-5 cursor-pointer avatar "
      >
        <div className="group">
          <img
            // src={`/avatarUser/${user.avatar}`}
            src={defaultImg ?`/avatarUser/${defaultImg}` : imgData.preview}
            alt=""
            className="rounded-full w-[150px] h-[150px] object-cover group-hover:opacity-30"
          />
          <span className="absolute invisible text-black opacity-0 cursor-pointer top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:opacity-100 group-hover:visible">
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
        </div>
        <input type="file" id="avatar" hidden onChange={onChangePicture} />
      </label>
      <div className="wrap-info-user w-[70%] mx-auto">
        <div className="grid items-center justify-between grid-cols-2 mb-4 gap-x-6 gap-y-4">
          <div className="flex flex-col col-span-2 gap-y-3">
            <label htmlFor="" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              defaultValue={user?.email}
              {...register("email")}
              className="w-full px-6 py-3 transition-all border border-gray-300 focus:outline-blue-200 rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="" className="font-semibold">
              Mật khẩu mới
            </label>
            <input
              type="text"
              {...register("password")}
              className="w-full px-6 py-3 transition-all border border-gray-300 focus:outline-blue-200 rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="" className="font-semibold">
              Nhâp lại mật khẩu mới
            </label>
            <input
              type="text"
              className="w-full px-6 py-3 transition-all border border-gray-300 focus:outline-blue-200 rounded-xl"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex px-10 py-3 ml-auto font-semibold text-white transition-all bg-blue-400 hover:bg-blue-800 rounded-xl"
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
};

export default ProfileUser;
