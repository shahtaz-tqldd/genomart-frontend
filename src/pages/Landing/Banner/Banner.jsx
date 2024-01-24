import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import { useGetSettingsInfoQuery } from "../../../feature/dashboard/dashboardApiSlice";
import { Link } from "react-router-dom";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const { data: info, isSuccess } = useGetSettingsInfoQuery(
    {},
    { refetchOnReconnect: true }
  );
  useEffect(() => {
    if (info?.success) {
      setBanners(info?.data?.banners || []);
    }
  }, [info]);

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
        {banners?.map(({ url, productId }, i) => (
          <SwiperSlide key={i}>
            <div
              style={{
                height: "560px",
                backgroundImage: `url(${url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <div className="container pl-20">
                <Link
                  to={`/products/${productId}`}
                  className="mt-[380px] inline-block text-center w-40 border-2 py-2 rounded-full bg-primaryColor text-white font-bold border-primaryColor hover:bg-primaryColorh tr"
                >
                  Buy Now
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
