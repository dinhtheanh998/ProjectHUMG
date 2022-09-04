import React from "react";

const SkeletonCartItem = () => {
  return (
    <div className="relative flex gap-3 h-[186px] mb-8">
      <div className="w-[138px] rounded-lg flex-1 border border-gray-300 shadow-sm skeleton"></div>
      <div className="flex-[3]">
        <div className="flex flex-wrap h-full ">
          <span className="w-full text-xl font-semibold rounded-lg cursor-pointer skeleton"></span>
          <div className="w-full mt-auto mb-8 wrap-info-product">
            <div className="flex gap-x-5">
                <div className="w-[60px] h-[20px] skeleton rounded-lg"></div>
                <div className="w-[60px] h-[20px] skeleton rounded-lg"></div>
            </div>
            <div className="flex items-center justify-between mt-5 quantity">
              <div className="skeleton w-[77px] h-[25px] inline-flex items-center border border-gray-200 rounded-3xl"></div>
              <span className="w-[120px] h-4 mr-4 font-semibold text-right skeleton rounded-lg"></span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SkeletonCartItem;
