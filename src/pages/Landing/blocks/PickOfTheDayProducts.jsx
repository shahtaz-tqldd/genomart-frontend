import brand from "../../../assets/images/brand-identity.png";
import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BsArrowDownCircle } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import PickOfTheProductCard from "../../../components/ProductCards/PickOfTheProductCard";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import { bgcolors } from "../../../assets/data/colors";
import { RiArrowRightSLine } from "react-icons/ri";

const PickOfTheDayProducts = () => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    { limit: 7 },
    { refetchOnReconnect: true }
  );

  return (
    <div className="container mt-32">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="lg:text-4xl md:text-3xl text-2xl text-black/80 font-semibold uppercase items-start gap-3">
            Pick of the day
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              className="h-10 w-10 rounded-full border border-primary/10 center bg-primary/10 text-primary hover:text-black hover:bg-primary/20 tr"
            >
              <RiArrowRightSLine className="rotate-180 text-2xl -translate-x-[1px]" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full border border-primary/10 center bg-primary/10 text-primary hover:text-black hover:bg-primary/20 tr"
            >
              <RiArrowRightSLine className="text-2xl translate-x-[1px]" />
            </button>
          </div>
        </div>
        <div className="border-primary/20 border w-full mt-4"></div>

        <div className="w-full mt-10">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            speed={700}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              350: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {data?.data?.map((data, i) => (
              <SwiperSlide key={i}>
                <PickOfTheProductCard
                  data={data}
                  color={bgcolors[i % bgcolors.length]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PickOfTheDayProducts;
