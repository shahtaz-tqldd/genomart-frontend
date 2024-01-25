import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

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
      <div className="container px-20">
        <div className="flex gap-8 mb-6 absolute bottom-6 z-10">
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
            <div
              style={{
                height: "560px",
                backgroundImage: `url(${banner?.url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <div className="container pl-20">
                <Link
                  to={`/products/${banner?.productId}`}
                  className="mt-[380px] inline-block text-center w-60 py-3 text-xl rounded-full bg-slate-800 text-white font-bold hover:bg-secondary tr"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
