import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";

const Banner = ({ banners }) => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="w-full relative bg-[#DCF2F1]">
      <div className="container lg:px-20 md:px-10 px-4">
        <div className="flex gap-8 mb-6 absolute lg:bottom-6 md:bottom-5 bottom-2 z-10">
          <IoIosArrowForward
            onClick={handlePrevious}
            className="text-3xl bg-[#222] text-white rounded-full p-1.5 hover:bg-secondary tr rotate-180 cursor-pointer"
          />

          <IoIosArrowForward
            onClick={handleNext}
            className="text-3xl bg-[#222] text-white rounded-full p-1.5 hover:bg-secondary tr cursor-pointer"
          />
        </div>
      </div>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={1}
        spaceBetween={0}
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
        {banners?.map((banner, i) => (
          <SwiperSlide key={i}>
            <img
              src={banner?.url || ""}
              alt=""
              className="lg:h-[520px] md:h-[400px] h-[200px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
