import React from "react";
import { useSelector } from "react-redux";

const HeaderHome = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <>
      <div className="px-8 py-6 bg-white shadow-inner">
        <span className="text-xl font-semibold text-black ">
          {` Welcome back! ${user?.username}`}
        </span>
        <div>
          <span className="font-medium">Ngày hôm nay của bạn thế nào!!</span>
        </div>
      </div>
    </>
  );
};

export default HeaderHome;
