import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="lg:w-32 lg:h-32 md:h-28 md:w-28 w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
      <div className="w-20 bg-gray-300 h-5 animate-pulse mt-4"></div>
      <div className="w-28 bg-gray-300 h-5 animate-pulse mt-2"></div>
    </div>
  );
};

export default CategorySkeleton;
