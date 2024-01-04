import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { BsArrowDownCircle } from "react-icons/bs";
import { MdFormatQuote, MdLocalOffer } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
// import "../../../assets/styles/swipper.css";
import { banners } from "../../../assets/data/mock/banner";

const Banner = () => {
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
          <BsArrowDownCircle
            onClick={handlePrevious}
            className="text-3xl text-orange-500 hover:text-red-500 tr rotate-90 cursor-pointer"
          />

          <BsArrowDownCircle
            onClick={handleNext}
            className="text-3xl text-orange-500 hover:text-red-500 tr -rotate-90 cursor-pointer"
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
        {banners?.map(({ img, productName, text, price, specialOffer }, i) => (
          <SwiperSlide key={i}>
            <div
              // data-aos="fade-up"
              // data-aos-duration="1000"
              // data-aos-delay={`${150 * (i + 1)}`}
              className=""
            >
              <div className="grid grid-cols-2 items-center container py-20 px-20">
                <div>
                  <p className="text-lg mt-2 fl gap-2">
                    <MdLocalOffer />
                    {specialOffer}
                  </p>
                  <h1 className="text-5xl font-bold">{productName}</h1>
                  <p className="text-lg mt-2">{text}</p>
                  <p className="text-lg mt-2">{price}</p>
                  <button className="mt-8 border-2 font-medium py-2 px-12 border-gray-500 rounded-full hover:bg-primaryColor hover:text-white hover:border-primaryColor tr">
                    Buy Now
                  </button>
                </div>
                <div className="flex justify-end">
                  <img src={img} alt="" className="h-[380px] object-contain" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
