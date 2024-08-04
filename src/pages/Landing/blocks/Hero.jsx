import React, { useCallback, useState } from "react";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Hero = () => {
  const { data } = useGetAllProductsQuery(
    { tags: ["hero"] },
    { refetchOnReconnect: true }
  );

  const [swiperRef1, setSwiperRef1] = useState();
  const [swiperRef2, setSwiperRef2] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    swiperRef1?.slidePrev();
    swiperRef2?.slidePrev();
  }, [swiperRef1, swiperRef2]);

  const handleNext = useCallback(() => {
    swiperRef1?.slideNext();
    swiperRef2?.slideNext();
  }, [swiperRef1, swiperRef2]);

  return (
    <div className="w-full bg-gradient-to-tr from-[#232323] to-[#2f3e46] h-[104vh] -mt-20 pt-20 pb-10 center relative">
      <div className="h-full flex flex-col justify-center gap-10 mt-6">
        <div className="container">
          <Swiper
            onSwiper={setSwiperRef1}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            speed={700}
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            allowTouchMove={false}
          >
            {data?.data?.map((product, i) => (
              <SwiperSlide key={i} className="relative">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center relative z-10">
                  <div>
                    <p className="text-orange-500 text-xl mb-4 font-fit w-fit text-wider">
                      {product?.category}
                    </p>
                    <h2 className="text-6xl text-gradient w-fit font-black text-accent leading-[60px]">
                      {product?.name}
                    </h2>
                    <p className="text-xl mt-8 text-accent/60">
                      {product?.description?.length > 140
                        ? product?.description.slice(0, 140) + "..."
                        : product.description}
                    </p>
                    <div className="flex gap-5 mt-20">
                      <Link
                        to={`/products/${product?._id}`}
                        className="w-40 text-white text-center font-fit bg-emerald-500 py-2 border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 rounded-lg tr"
                      >
                        Shop Now
                      </Link>
                      <Link
                        to="/products"
                        className="w-40 text-center py-2 font-fit border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white rounded-lg tr"
                      >
                        Explore More
                      </Link>
                    </div>
                  </div>
                  <div className="hero-img h-[60vh]">
                    <img
                      src={product?.images?.[0]?.url || ""}
                      alt={product?.name || "Product Image"}
                      className="w-3/4 h-full mx-auto object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="container w-full flex items-center justify-between">
          <div className="fl gap-8 text-4xl">
            <IoIosArrowDroprightCircle
              className="bg-white rounded-full rotate-180 cursor-pointer"
              onClick={handlePrevious}
            />
            <IoIosArrowDroprightCircle
              className="text-emerald-500 bg-white rounded-full cursor-pointer"
              onClick={handleNext}
            />
          </div>
          <div className="max-w-[832px] ml-auto">
            <Swiper
              onSwiper={setSwiperRef2}
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              speed={700}
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: true }}
              allowTouchMove={false}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {data?.data?.map((p, i) => (
                <SwiperSlide key={i}>
                  <div
                    className={`flex gap-2 p-3 rounded-xl ${
                      activeIndex % data?.data?.length === i
                        ? "bg-blue-200"
                        : "bg-white"
                    }`}
                  >
                    <img
                      src={p?.images?.[0]?.url || ""}
                      alt={p?.name || "Product Image"}
                      className="h-16 w-16 object-contain"
                    />
                    <div className="flex flex-col h-fill justify-between">
                      <h2 className="text-sm font-bold">{p?.name}</h2>
                      <p className="text-lg text-orange-500">${p?.price}.00</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
