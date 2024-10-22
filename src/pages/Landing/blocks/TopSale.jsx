import React from "react";
import ProductCard from "../../../components/ProductCards/ProductCard";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import HomeProductSkeleton from "../../../components/Skeletons/HomeProductSkeleton";

const TopSale = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    { limit: 5 },
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
      <h2 className="text-4xl uppercase text-black/80 font-semibold">
        Top Sold Products
      </h2>
      <div className="border-primary/20 border w-full mt-4"></div>
      <div className="mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8">
        {content}
      </div>
    </div>
  );
};

export default TopSale;
