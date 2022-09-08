import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { getAllUserAndOrder, getAllUsers } from "../../../redux/apiRequest";
import { loginSuccess } from "../../../redux/authSlice";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
const ListUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users?.users?.allUsers);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    getAllUserAndOrder(user?.accessToken, dispatch, axiosJWT);
  }, []);
  console.log(userList);
  return (
    <div className="flex flex-col w-full px-4 pb-4 rounded-lg gap-y-3">
      {userList?.map((item) => (
        <div
          className="flex items-center py-1 border-b border-gray-300"
          key={uuidv4()}
        >
          <div className="flex items-center w-[25%] gap-x-4">
            <div className="avatar w-[40px] h-[40px] rounded-full border border-blue-300">
              <img
                src={`${item.avatar ? `/avatarUser/${item.avatar}` : `/avatarUser/defaultAvatar.jpg`}`}
                alt=""
                className="object-cover w-full h-full rounded-full avatar__img"
              />
            </div>
            <span className="font-semibold userName">{item.username}</span>
          </div>
          <span className="w-[25%] font-semibold">{item.email}</span>
          <span className="w-[15%] font-semibold">
            {format(new Date(item.createdAt), "MM/dd/yyyy")}
          </span>
          <span className="text-center w-[15%] font-semibold">{item.countOrder}</span>
          <span className="w-[20%] flex items-center justify-center">
            {item.isAdmin ? <IconAdmin></IconAdmin> : <IconUser></IconUser>}
          </span>
        </div>
      ))}
    </div>
  );
};
function IconAdmin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      className="w-6 h-6"
      fill="#e91e3c"
    >
      <path d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default ListUser;
