import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
const Task = () => {
  const [activeThumb, setActiveThumb] = useState();

  const { register, handleSubmit, errors } = useForm();
  const [data, setData] = React.useState();
  const [image, setImage] = React.useState();
  const [images, setImages] = React.useState([]);
  const handleOnSubmit = (data) => {
    const formData = new FormData();
    formData.append("task1", data.task1);
    formData.append("task2", data.task2);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    console.log(images);
    axios.post("/api/tasks", formData).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    axios.get("/api/tasks").then((res) => {
      setData(res.data[0]);
    });
  }, []);
  console.log(data);
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        encType="multipart/form-data"
      >
        <div>
          <input type="text" {...register("task1")} />
        </div>
        <div>
          <input type="text" {...register("task2")} />
        </div>
        <div>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) => {
              setImages([...e.target.files]);
            }}
          />
        </div>
        <div>
          <div class="flex items-center justify-center">
            <div
              class="datepicker relative form-floating mb-3 xl:w-96"
              data-mdb-toggle-button="false"
            >
              <input
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a date"
              />
              <label for="floatingInput" class="text-gray-700">
                Select a date
              </label>
              <button
                class="datepicker-toggle-button"
                data-mdb-toggle="datepicker"
              >
                <i class="fas fa-calendar datepicker-toggle-icon"></i>
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="">
          Submit
        </button>
      </form>
      <div className="page-container">
        {/* <div className="flex w-[800px] gap-x-4">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="flex-1 mySwiper2"
          >
            {data &&
              data?.images.map((item, index) => {
                return (
                  <SwiperSlide className="Congchua" key={uuidv4()}>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3 || data?.images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper custom-swiper w-[100px] "
          >
            <div className="flex flex-col gap-y-3">
              {data &&
                data?.images.map((item, index) => {
                  return (
                    <SwiperSlide key={uuidv4()} className="rounded-lg">
                      <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </SwiperSlide>
                  );
                })}
            </div>
          </Swiper>
        </div> */}
        <div className="relative  w-[800px]">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{
              swiper:
                activeThumb && !activeThumb.destroyed ? activeThumb : null,
            }}
            // thumbs={{ swiper: activeThumb }}
            className="relative product-images-slider"
          >
            {data &&
              data?.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src="https://images.unsplash.com/photo-1661894239993-e79b37c838ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
                    alt="product images"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            onSwiper={setActiveThumb}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className="absolute top-3 product-images-slider-thumbs w-[150px] left-3"
          >
            {data &&
              data?.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="product-images-slider-thumbs-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1661894239993-e79b37c838ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
                      alt="product images"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Task;
