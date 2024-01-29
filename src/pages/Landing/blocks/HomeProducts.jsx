import React from "react";
import ProductCard from "../../../components/ProductCards/ProductCard";
import creative from "../../../assets/images/creative.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import HomeProductSkeleton from "../../../components/Skeletons/HomeProductSkeleton";

const HomeProducts = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    { limit: 10 },
    { refetchOnReconnect: true }
  );

  let content;

  const getNumberOfColumns = () => {
    if (window.innerWidth >= 1024) {
      return 10;
    } else if (window.innerWidth >= 768) {
      return 6;
    } else {
      return 4;
    }
  };

  if ((isLoading && !isSuccess) || isError) {
    content = Array(getNumberOfColumns())
      .fill(null)
      .map((_, i) => <HomeProductSkeleton key={i} />);
  } else if (!isLoading && isSuccess && !isError) {
    content = data?.data?.map((data, i) => <ProductCard key={i} data={data} />);
  }

  return (
    <div className="container my-20">
      <div className="flex flex-col items-center justify-center">
        <img src={creative} alt="" className="h-20 w-20 object-contain mb-2" />
        <h2 className="text-4xl font-bold flex items-end gap-3">
          Discover our latest products
        </h2>
        <div className="border-gray-700 border-2 w-40 mt-5"></div>
      </div>
      <div className="mt-12 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-8 md:gap-6 gap-4">
        {content}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to={"/products"}
          className="flex text-xl items-center gap-4 group hover:text-primaryColor tr"
        >
          See All Products{" "}
          <FaArrowRightLong className="group-hover:translate-x-3 tr" />
        </Link>
      </div>
    </div>
  );
};

export default HomeProducts;
