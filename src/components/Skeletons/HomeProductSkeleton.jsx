import React from "react";
import { FaStar } from "react-icons/fa";

const HomeProductSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-56 rounded-xl bg-gray-300 animate-pulse"></div>
      <div className="w-[95%] bg-gray-300 h-5 animate-pulse mt-3"></div>
      <div className="w-28 bg-gray-300 h-5 animate-pulse mt-1.5 mb-3"></div>
      <div className="w-full bg-gray-300 h-3.5 animate-pulse mt-3"></div>
      <div className="w-4/5 bg-gray-300 h-3.5 animate-pulse mt-1"></div>
      <div className="w-20 bg-gray-200 h-7 animate-pulse mt-3"></div>
      <div className="flex gap-2 mt-3">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <FaStar key={i} className="text-gray-300 animate-pulse" />
          ))}
      </div>
    </div>
  );
};

export default HomeProductSkeleton;
