import axios from "axios";
import React, { useState } from "react";

const UpDateProductFromExcel = () => {
  const [updateFileExcel, setUpdateFileExcel] = useState(null);
  const handleUpdateByExcel = (e) => {
    e.preventDefault();
    console.log(updateFileExcel);
    const formData = new FormData();
    formData.append("upFileExcel", updateFileExcel);
    axios.put("/api/products/updateExcel", formData).then((res) => {
      console.log(res.data);
    });
  };
  return (
    //   <div className="fixed inset-0 flex items-center justify-center">     
    <div>  
      <form
        onSubmit={handleUpdateByExcel}
        className="flex items-center mb-4 font-semibold text-white cursor-pointer gap-x-3 z-[9999] "
      >
        <label htmlFor="updateByExcel">
          <input
            type="file"
            id="updateByExcel"
            hidden
            name="upFileExcel"
            onChange={(e) => {
              setUpdateFileExcel(e.target.files[0]);
            }}
          />
          <span className="w-full h-full px-6 py-2 text-gray-700 bg-transparent border border-gray-300 rounded-lg cursor-pointer select-none">
            {updateFileExcel?.name || "Cập nhật bằng file excel"}
          </span>
        </label>
        {updateFileExcel && (
          <button
            type="submit"
            value="Submit"
            className="px-6 py-2 transition-all bg-pink-600 rounded-lg hover:bg-pink-800"
          >
            Cập nhật
          </button>
        )}
      </form>
    </div>
  );
};

export default UpDateProductFromExcel;
