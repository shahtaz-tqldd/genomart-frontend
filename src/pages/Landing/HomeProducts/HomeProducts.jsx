import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../../../assets/data/mock/products";
import creative from "../../../assets/images/creative.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HomeProducts = () => {
  return (
    <div className="container my-20">
      <div className="flex flex-col items-center justify-center">
        <img src={creative} alt="" className="h-20 w-20 object-contain mb-2" />
        <h2 className="text-4xl font-bold flex items-end gap-3">
          Discover our latest products
        </h2>
        <div className="border-gray-700 border-2 w-40 mt-5"></div>
      </div>
      <div className="mt-12 grid grid-cols-5 gap-8">
        {products?.map((data, i) => (
          <ProductCard key={i} data={data} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link to={'/products'} className="flex text-xl items-center gap-2 group hover:text-primary">
          See All Products <FaArrowRightLong className="group-hover:translate-x-3 tr" />
        </Link>
      </div>
    </div>
  );
};

export default HomeProducts;
