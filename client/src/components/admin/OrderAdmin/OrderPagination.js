import React from "react";

const OrderPagination = ({ numPages, curPage, setCurPage }) => {
  return (
    <div className="flex items-center justify-end mt-3 gap-x-4">
      <button
        className={`px-1 py-1 bg-white border border-gray-300 rounded-lg ${curPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => {
          console.log("a");
          if (curPage > 1) {
            setCurPage(curPage - 1);
          }
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
      </button>
      <span className="font-semibold">Trang {curPage}</span>
      <button
        className={`px-1 py-1 bg-white border border-gray-300 rounded-lg ${curPage === numPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => {
          if (curPage < numPages) {
            setCurPage(curPage + 1);
          }
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default OrderPagination;
