import React from "react";
import ProductCard from "../../../components/ProductCards/ProductCard";
import shopping from "../../../assets/images/shopping.png";
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
    <div className="container my-20">
      <div className="flex flex-col items-center justify-center">
        <img src={shopping} alt="" className="h-16 w-16 object-contain mb-2" />
        <h2 className="text-4xl font-bold flex items-end gap-3">
          Top Sale Products
        </h2>
        <div className="border-gray-700 border-2 w-40 mt-5"></div>
      </div>
      <div className="mt-12 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8">
        {content}
      </div>
    </div>
  );
};

export default TopSale;
