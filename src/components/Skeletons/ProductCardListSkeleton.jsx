import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCardListSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-2 w-full h-48 rounded-xl bg-gray-300 animate-pulse"></div>
      <div className="col-span-3 flex flex-col justify-between">
        <div>
          <div className="w-2/3 bg-gray-300 h-5 animate-pulse mb-4"></div>
          <div className="w-full bg-gray-300 h-3 animate-pulse"></div>
          <div className="w-3/4 bg-gray-300 h-3 animate-pulse mt-1"></div>
          <div className="w-20 bg-gray-300 h-7 animate-pulse mt-5"></div>
        </div>
        <div className="grid grid-cols-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <FaStar className="text-gray-300 animate-pulse" />
            <div className="w-6 bg-gray-200 h-4 animate-pulse"></div>
          </div>
          <div className="w-28 bg-gray-200 h-5 animate-pulse"></div>
          <div className="w-28 bg-gray-200 h-5 animate-pulse"></div>
          <div className="w-24 rounded bg-gray-200 h-7 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardListSkeleton;
