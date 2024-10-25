import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = ({ banners }) => {
  return (
    <div className="container banner w-full rounded-2xl overflow-hidden">
      <Swiper
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
              className="lg:h-[600px] md:h-[400px] h-[200px] w-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
