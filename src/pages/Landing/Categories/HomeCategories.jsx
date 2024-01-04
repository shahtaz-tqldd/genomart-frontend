import React, { useCallback, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { categories } from "../../../assets/data/mock/categories";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeCategories = () => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);
  return (
    <div className="w-full my-20 relative container">
      <div className="flex justify-between absolute container top-1/2 z-10">
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
          {categories?.map(({ img, productName, products }, i) => (
            <SwiperSlide key={i}>
              <div
                // data-aos="fade-up"
                // data-aos-duration="1000"
                // data-aos-delay={`${150 * (i + 1)}`}
                className="flex flex-col items-center"
              >
                <div className="bg-[#EEF5FF] h-36 w-36 rounded-full grid place-items-center">
                  <img src={img} alt="" className="h-24 object-contain" />
                </div>
                <h1 className="text-xl font-bold mt-4">{productName}</h1>
                <p className="text-md text-gray-400">{products} products</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCategories;
