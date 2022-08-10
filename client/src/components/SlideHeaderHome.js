import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SlideHeaderHome = () => {
  return (
    <>
      <Swiper className="mySwiper h-[800px]" loop={true} slidesPerView={1}>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1576082866986-460d8f2ae4fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2040&q=80"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SlideHeaderHome;
