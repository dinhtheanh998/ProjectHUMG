import axios from "axios";
import React, { useEffect } from "react";
import {v4 as uuidv4} from "uuid";
const CatelistIcon = ({handleSearchByCate}) => {
  const [cateData, setCateData] = React.useState("");
  const [showCateLimit, setShowCateLimit] = React.useState(false);

    useEffect(() => {
        axios.get(`api/category/getlimitCate/limit=0`).then((response) => {
          setCateData(response.data);
        });
      }, []);
  return (
    <div className="flex items-center mr-auto">
      <div
        className={`flex items-center gap-x-6 wrap-catelist  ${
          showCateLimit ? "open" : ""
        }`}
      >
        {cateData &&
          cateData.map((cate) => (
            <span
              data-value={cate._id}
              className="px-5 py-2 font-semibold border border-gray-300 rounded-lg cursor-pointer whitespace-nowrap"
              onClick={handleSearchByCate}
              key={uuidv4()}
            >
              {cate.name}
            </span>
          ))}
      </div>
      {!showCateLimit && (
        <label
          htmlFor="checkCate"
          className="cursor-pointer"
          onClick={() => {
            setShowCateLimit(true);
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </label>
      )}
      {showCateLimit && (
        <label
          htmlFor="cateC"
          className="cursor-pointer"
          onClick={() => {
            setShowCateLimit(false);
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </label>
      )}
    </div>
  );
};

export default CatelistIcon;
