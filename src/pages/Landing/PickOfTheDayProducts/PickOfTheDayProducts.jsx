import brand from "../../../assets/images/brand-identity.png";
import { products } from "../../../assets/data/mock/products";
import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BsArrowDownCircle } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import PickOfTheProductCard from "../../../components/ProductCards/PickOfTheProductCard";

const PickOfTheDayProducts = () => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const colors = [
    "bg-[#29ADB2]",
    "bg-[#BE3144]",
    "bg-[#3081D0]",
    "bg-[#FFA732]",
    "bg-[#FA7070]",
    "bg-[#22092C]",
    "bg-[#706233]",
  ];
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <img src={brand} alt="" className="h-16 w-16 object-contain mb-2" />
        <h2 className="text-4xl font-bold flex items-end gap-3">
          Pick of the day
        </h2>
        <div className="border-gray-700 border-2 w-40 mt-5"></div>

        <div className="w-full relative mt-20">
          <div className="flex gap-8 absolute right-0 -top-14 z-10">
            <BsArrowDownCircle
              onClick={handlePrevious}
              className="text-3xl text-black hover:text-red-500 tr rotate-90 cursor-pointer"
            />

            <BsArrowDownCircle
              onClick={handleNext}
              className="text-3xl text-black hover:text-red-500 tr -rotate-90 cursor-pointer"
            />
          </div>
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            speed={700}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="pb-12"
            
          >
            {products?.map((data, i) => (
             <SwiperSlide key={i}>
               <PickOfTheProductCard data={data} color={colors[i % colors.length]} />
             </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PickOfTheDayProducts;
