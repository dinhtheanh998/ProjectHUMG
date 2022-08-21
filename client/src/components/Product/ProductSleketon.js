import React from "react";

const ProductSleketon = () => {
  return (
    <div className="">
      <div className="relative w-full mb-4 overflow-hidden group">
        <div className="h-[350px] w-[230px] skeleton rounded-lg"></div>
        <div className="absolute bottom-0 flex flex-wrap items-center gap-2 px-3 py-3 text-white transition-all translate-y-full group-hover:visible group-hover:translate-y-0 pro-size bg-"></div>
        <div className="h-2 mt-3 rounded skeleton"></div>
        <div className="grid grid-cols-3 gap-4 mt-2 rounded-lg">
          <div className="h-2 col-span-1 rounded-lg skeleton"></div>
          <div className="h-2 col-span-1 rounded-lg skeleton"></div>
          <div className="h-2 col-span-1 rounded-lg skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSleketon;
