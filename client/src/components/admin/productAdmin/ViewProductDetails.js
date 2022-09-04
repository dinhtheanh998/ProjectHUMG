import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomBodyAdm from "../BottomBodyAdm";
import { v4 as uuidv4 } from "uuid";

const ViewProductDetails = () => {
  const navigate = useNavigate();
  const { infoId } = useParams();
  const [details, setDetails] = useState();
  useEffect(() => {
    axios.get(`/api/productsInfo/moreInfoOneProduct/${infoId}`).then((response) => {
      setDetails(response.data);
    });
  }, [infoId]);
    return (
        // <div>{productDetails}</div>
    <BottomBodyAdm>
      {details &&
        details.length > 0 &&
        details.map((item) => {
          return (
            <div className="grid items-center grid-cols-10 p-3 mb-2 bg-white rounded-xl" key={uuidv4()}>
              <div className="flex items-center col-start-1 col-end-4 mr-4 gap-x-2">
                <div className="w-[100px] h-[100px] rounded-lg">
                  <img
                    src={`/images/${item.productInfo.images[0]}`}
                    alt=""
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <span className="font-semibold">{item.productInfo.name}</span>
              </div>
              <div className="flex col-start-4 col-end-7 mr-4 gap-x-2">
                <div className="flex flex-wrap items-center w-2/4 gap-x-1 gap-y-1">
                  <span className="px-3 py-1 font-semibold text-white bg-red-300 rounded-lg">
                    {item.size}
                  </span>
                </div>
                {/* size */}
                <div className="flex flex-wrap items-center w-2/4 gap-x-1 gap-y-1">
                  <span
                    className="w-[20px] h-[20px] inline-block font-semibold text-white rounded-lg"
                    style={{
                      backgroundColor: item.color,
                    }}                    
                  ></span>
                </div>
              </div>
              <span className="flex col-start-7 col-end-9 mr-4 font-semibold gap-x-2">
                {item.quantity}
              </span>
              <div className="col-start-9 col-end-10 mr-4">
                <button type="button" className="" onClick={() => {
                  navigate(`/admin/EditInfoProduct/${item._id}`)
                }}>
                  Sửa
                </button>
              </div>
            </div>
          );
        })}
            <button type="button" className="px-5 py-2 text-white bg-blue-400 rounded-lg" onClick={()=> {navigate("/admin/ProductDetailsAdmin")}}>Quay lại</button>
    </BottomBodyAdm>
  );
};

export default ViewProductDetails;
