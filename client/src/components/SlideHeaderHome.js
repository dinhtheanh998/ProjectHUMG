import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination,Autoplay  }  from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./Slidecss.scss"
const SlideHeaderHome = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="'+className+'"> </span>';
    },
  };
  SwiperCore.use([Autoplay])
  return (
    <>
      <Swiper
        className="mySwiper page-container h-[400px] rounded-xl shadow-lg"
        pagination={pagination}
        modules={[Pagination]}
        autoplay={{ delay: 2000 }}
        loop={true}
        slidesPerView={1}
      >
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
