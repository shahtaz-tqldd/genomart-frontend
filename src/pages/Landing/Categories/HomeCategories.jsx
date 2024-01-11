import React, { useCallback, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { categories } from "../../../assets/data/mock/categories";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../feature/products/productsApiSlice";

const HomeCategories = () => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const { data: category } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  const navigate = useNavigate();

  const handleNavigateProduct = (name) => {
    navigate("/products", { state: { category: name } });
  };


  return (
    <div className="w-full my-20 relative container">
      <div className="flex justify-between absolute container top-1/2 -translate-y-1/2 z-10">
        <FaAngleLeft
          onClick={handlePrevious}
          className="text-3xl text-black hover:text-red-500 tr cursor-pointer"
        />

        <FaAngleLeft
          onClick={handleNext}
          className="text-3xl text-black hover:text-red-500 tr -rotate-180 cursor-pointer"
        />
      </div>
      <div className="px-24">
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={5}
          spaceBetween={20}
          loop={true}
          speed={700}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {category?.data?.map(({ image, category, totalProducts }, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => handleNavigateProduct(category)}
                // data-aos="fade-up"
                // data-aos-duration="1000"
                // data-aos-delay={`${150 * (i + 1)}`}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="bg-[#EEF5FF]  group-hover:bg-blue-200 tr h-32 w-32 rounded-full grid place-items-center">
                  <img src={image} alt="" className="h-16  object-contain" />
                </div>
                <h1 className="text-md text-center font-bold text-slate-700 group-hover:text-slate-900 tr mt-4">
                  {category}
                </h1>
                <p className="text-md text-gray-400">
                  {totalProducts} products
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCategories;
