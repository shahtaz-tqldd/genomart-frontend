import React from "react";
import ProductCard from "../../../components/ProductCards/ProductCard";
import { RiArrowRightSLine } from "react-icons/ri";
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
    <div className="container mt-32 mb-20">
      <h2 className="text-4xl text-black/80 font-semibold uppercase">
        Latest Products
      </h2>
      <div className="border-primary/20 border w-full mt-4"></div>
      <div className="mt-12 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-8 md:gap-6 gap-4">
        {content}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to={"/products"}
          className="py-2 pr-5 pl-6 fl gap-1 rounded-full border border-primary/10 font-medium text-primary bg-green-50 hover:bg-primary/20 tr group"
        >
          More Products{" "}
          <RiArrowRightSLine className="text-lg group-hover:translate-x-1 tr" />
        </Link>
      </div>
    </div>
  );
};

export default HomeProducts;
