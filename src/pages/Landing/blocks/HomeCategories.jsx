import React, { useCallback, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../feature/products/productsApiSlice";
import CategorySkeleton from "../../../components/Skeletons/CategorySkeleton";

const HomeCategories = () => {
  const navigate = useNavigate();
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  const handleNavigateProduct = (name) => {
    navigate("/products", { state: { category: name } });
  };

  const getNumberOfColumns = () => {
    if (window.innerWidth >= 1024) {
      return 5;
    } else if (window.innerWidth >= 768) {
      return 3;
    } else {
      return 2;
    }
  };

  let content;

  if ((isLoading && !isSuccess) || isError) {
    content = (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:px-24 md:px-16 px-4">
        {Array(getNumberOfColumns())
          .fill(null)
          .map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
      </div>
    );
  } else if (!isLoading && isSuccess && !isError) {
    content = (
      <div className="lg:px-24 md:px-16 px-4">
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
            disableOnInteraction: true,
          }}
          breakpoints={{
            350: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {category?.data?.map(({ image, category, totalProducts }, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => handleNavigateProduct(category)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="lg:w-32 lg:h-32 md:h-28 md:w-28 w-20 h-20 bg-blue-50 group-hover:bg-blue-200 tr rounded-full grid place-items-center">
                  <img
                    src={image}
                    alt=""
                    className="md:h-16 h-12 object-contain"
                  />
                </div>
                <h1 className="text-md text-center font-bold text-slate-700 group-hover:text-secondary tr mt-4">
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
    );
  }

  return (
    <div className="my-20 container relative">
    
        <FaAngleLeft
          onClick={handlePrevious}
          className="absolute top-1/2 -translate-y-1/2 ml-2 left-0 text-3xl text-black hover:text-red-500 tr cursor-pointer"
        />

        <FaAngleLeft
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 mr-2 right-0 text-3xl text-black hover:text-red-500 tr -rotate-180 cursor-pointer"
        />
     
      {content}
    </div>
  );
};

export default HomeCategories;
