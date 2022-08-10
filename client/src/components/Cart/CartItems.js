import axios from "axios";
import React, { useEffect, useState } from "react";
import { converCurences, notifyWarn } from "../../config/config";
import DropDownHook from "../customForm/DropDownHook";

const CartItems = ({
  data,
  size,
  color,
  removeToCart,
  control,
  index,
  setValue,
  setValueCart,
  setCartItems,
  cartItems,
  updateQuantityIncrement,
  updateQuantityDecrement,
  handleQuantityChange,
  reload,
  setReload,
}) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [maxQuantity, setMaxQuantity] = useState();

  useEffect(() => {
    const id = data._id;
    const color = data.color.slice(1);
    const size = data.size;
    axios
      .get(`/api/productsInfo/product=${id}&size=${size}&color=${color}`)
      .then((res) => {
        setMaxQuantity(res.data);
      });
  }, [quantity, data, maxQuantity, cartItems]);
  const handleClickSize = async (index, e, cartItems) => {
    console.log(cartItems[index], e.target.dataset.value);
    const info = await axios.get(
      `/api/productsInfo/checkProductQuantity/id=${
        cartItems[index]._id
      }&color=${cartItems[index].color.slice(1)}&size=${e.target.dataset.value}`
    );
    if (info.data.length > 0 && info.data[0].quantity > 0) {
      cartItems[index] = { ...cartItems[index], size: e.target.dataset.value };
      const newArray = Array.from(
        new Set(cartItems.map((el) => JSON.stringify(el)))
      ).map((el) => JSON.parse(el));
      setValueCart(newArray);
      setCartItems(newArray);
    } else {
      notifyWarn("Mặt hàng không có sẵn");
      setValueCart(cartItems);
      setCartItems(cartItems);
      setReload(!reload);
    }
  };
  const handleClickColor = async (index, e, cartItems) => {
    console.log(cartItems[index], e.target.dataset.value);
    const info = await axios.get(
      `/api/productsInfo/checkProductQuantity/id=${
        cartItems[index]._id
      }&color=${e.target.dataset.value.slice(1)}&size=${cartItems[index].size}`
    );
    if (info.data.length > 0 && info.data[0].quantity > 0) {
      cartItems[index] = { ...cartItems[index], color: e.target.dataset.value };
      const newArray = Array.from(
        new Set(cartItems.map((el) => JSON.stringify(el)))
      ).map((el) => JSON.parse(el));
      setValueCart(newArray);
      setCartItems(newArray);
    } else {
      notifyWarn("Mặt hàng không có sẵn");
      setValueCart(cartItems);
      setCartItems(cartItems);
      setReload(!reload);
    }
  };

  // const handleInputQuantityChange = (index, cartItems, e) => {
  //   setQuantity(+e.target.value);

  // };
  // console.log(quantity);
  return (
    <>
      <div className="relative flex gap-3 mb-3">
        <div className="w-[138px] rounded-lg flex-1">
          <img
            src={`/images/${data.images}`}
            alt=""
            className="object-cover w-full h-full transition-all rounded-lg hover:opacity-50"
          />
        </div>
        <div className="flex-[3]">
          <div className="flex flex-wrap h-full">
            <span className="w-full text-xl font-semibold">{data.name}</span>
            <div className="w-full mt-auto mb-8 wrap-info-product">
              <div className="flex gap-x-5">
                <DropDownHook
                  control={control}
                  data={size}
                  name="size"
                  setValue={setValue}
                  dropDownLabel={data.size}
                  option="size"
                  handleClickSize={(e) => {
                    handleClickSize(index, e, cartItems);
                  }}
                ></DropDownHook>
                <DropDownHook
                  control={control}
                  data={color}
                  name="color"
                  setValue={setValue}
                  dropDownLabel={data.color}
                  option="color"
                  handleClickColor={(e) => {
                    handleClickColor(index, e, cartItems);
                  }}
                ></DropDownHook>
              </div>
              <div className="flex items-center justify-between mt-5 quantity">
                <div className="w-[77px] h-[25px] inline-flex items-center border border-gray-200 rounded-3xl">
                  <button
                    type="button"
                    aria-label="Decrement value"
                    className="w-[25px] flex items-center justify-center"
                    onClick={(e) => {
                      console.log(maxQuantity);
                      updateQuantityDecrement(index, cartItems, maxQuantity);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <input
                    onChange={(e) => {
                      setQuantity(+e.target.value);
                      if (+e.target.value > maxQuantity) {
                        setQuantity(maxQuantity);
                      }
                    }}
                    onBlur={(e) => {
                      handleQuantityChange(index, cartItems, e.target.value);
                      if (e.target.value > maxQuantity) {
                        setQuantity(maxQuantity);
                      }
                      console.log(+e.target.value, maxQuantity);
                    }}
                    // value={data.quantity}
                    value={quantity}
                    data-value={quantity}
                    className="w-[25px] outline-none border-none h-full text-center"
                  ></input>
                  <button
                    aria-label="Increment value"
                    type="button"
                    className="w-[25px] flex items-center justify-center"
                    onClick={(e) => {
                      updateQuantityIncrement(index, cartItems, maxQuantity);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <span className="mr-4 font-semibold text-right">
                  {converCurences(data.unitPromotionalPrice) + "đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="absolute top-0 inline-flex ml-auto mr-4 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 cursor-pointer hover:scale-125"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() => {
              removeToCart(data._id, data.size, data.color);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </>
  );
};

export default CartItems;
