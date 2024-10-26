import React, { useCallback, useState } from "react";
import GridBackground from "../../../ui/Elements/Grid";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import cart from "../../../assets/images/cart.png";
import "../../../assets/styles/custom-loader.css";

const HeroNew = () => {
  const { data, isLoading, isSuccess } = useGetAllProductsQuery(
    { tags: ["hero"] },
    { refetchOnReconnect: true }
  );
  const [swiperRef1, setSwiperRef1] = useState();
  const [swiperRef2, setSwiperRef2] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    swiperRef1?.slidePrev();
    swiperRef2?.slidePrev();
  }, [swiperRef1, swiperRef2]);

  const handleNext = useCallback(() => {
    swiperRef1?.slideNext();
    swiperRef2?.slideNext();
  }, [swiperRef1, swiperRef2]);
  return (
    <section className="h-screen bg-gradient-to-tr from-primary/10 to-rose-50 relative center">
      <GridBackground />

      {!isLoading && isSuccess && (
        <div className="w-screen">
          <Swiper
            onSwiper={setSwiperRef1}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            speed={700}
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            allowTouchMove={false}
          >
            {data?.data?.map((product, i) => (
              <SwiperSlide key={i}>
                <div className="container grid lg:grid-cols-2 grid-cols-1 gap-16 items-center z-10 mt-10">
                  <div>
                    <div className="py-1 px-4 rounded-full bg-rose-500/10 text-sm text-rose-500 font-medium border border-rose-500/20 w-fit">
                      {product?.brand || "Brand Name"}
                    </div>
                    <h2 className="lg:text-6xl md:text-5xl text-3xl mt-3">
                      {product?.name}
                    </h2>
                    <div className="mt-10 flex items-end gap-3">
                      <h4 className="text-4xl font-black">
                        ${product?.price}.00
                      </h4>
                      <p className="text-red-500 mb-0.5 text-sm font-bold">
                        Save Upto {product?.discount}%
                      </p>
                    </div>
                    <div className="mt-16 flex">
                      <Link
                        to={`/products/${product?._id}`}
                        className="bg-emerald-500 hover:bg-black py-2 px-7 font-medium rounded-full tr text-white"
                      >
                        Buy Now
                      </Link>
                      <Link
                        to="/products"
                        className="py-2 px-6 rounded-full tr text-emerald-500 fl gap-2 font-medium hover:text-black"
                      >
                        Discover more Products
                        <MdArrowOutward />
                      </Link>
                    </div>
                  </div>
                  <div className="relative group">
                    {/* The image */}
                    <img
                      src={product?.images?.length && product?.images[0]?.url}
                      alt={product?.name}
                      className="lg:h-[460px] md:h-[360px] h-[240px] w-full object-contain"
                    />
                    {product?.features && product?.features[0] && (
                      <div className="opacity-0 group-hover:opacity-100 transition duration-1000 absolute z-100 top-4 -left-6 flex flex-col items-center">
                        <div className="bg-white p-3 rounded-lg shadow-md border border-black/10 w-64">
                          <p className="text-black/75 text-sm ">
                            {product?.features[0]}
                          </p>
                        </div>

                        <div className="flex flex-row items-end ml-20">
                          <hr className="h-24 border border-green-500" />
                          <div className="flex items-center -mb-1">
                            <hr className="w-24 border border-green-400" />
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {product?.features && product?.features[1] && (
                      <div className="opacity-0 group-hover:opacity-100 transition duration-700 absolute z-100 top-20 -right-10 flex flex-col items-center">
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-black/10 w-64">
                          <p className="text-black/75 text-sm">
                            {product?.features[1]}
                          </p>
                        </div>

                        <div className="flex flex-row items-end mr-20">
                          <div className="flex items-center -mb-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <hr className="w-24 border border-green-400" />
                          </div>
                          <hr className="h-28 border border-green-500" />
                        </div>
                      </div>
                    )}
                    {product?.features && product?.features[2] && (
                      <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute z-100 bottom-6 -right-10 flex flex-row items-center">
                        <div className="flex flex-row items-end -mt-28">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <hr className="h-24 border border-green-500" />
                          </div>
                          <hr className="w-16 border border-green-400 -ml-1" />
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-black/10 w-64">
                          <p className="text-black/75 text-sm">
                            {product?.features[2]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {isLoading && !isSuccess && (
        <div className="relative z-10">
          <div className="relative flex justify-center">
            <div className="custom-loader"></div>

            <img src={cart} className="absolute top-1/2 -translate-y-1/2 h-16 mx-auto" alt="" />
          </div>
          <h2 className="font-bold lg:text-[80px] md:text-[60px] text-[40px] text-center text-black/70">
            Welcome to Genomart
          </h2>
        </div>
      )}
    </section>
  );
};

export default HeroNew;
