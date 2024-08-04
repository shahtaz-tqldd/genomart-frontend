import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
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
    <div className="banner w-full relative bg-[#DCF2F1]">
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={1}
        spaceBetween={0}
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
      >
        {banners?.map((banner, i) => (
          <SwiperSlide key={i}>
            <img
              src={banner?.url || ""}
              alt=""
              className="lg:h-[80vh] md:h-[400px] h-[200px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
