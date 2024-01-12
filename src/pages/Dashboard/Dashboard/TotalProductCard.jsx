import React from "react";
import products from "../../../assets/images/products.png";

const TotalProductCard = ({ totalProducts }) => {
  return (
    <div className="group h-full flex flex-col items-center justify-between rounded-2xl bg-[#92C7CF] p-8 relative overflow-hidden">
      <div className="bg-[#FF8F8F] group-hover:-translate-x-44 tr group-hover:bg-[#FA7070] h-80 w-80 rounded-full absolute -top-36 -right-16 "></div>
      <div className="flex flex-col items-center z-10">
        <img src={products} className="h-20" alt="" />
        <h2 className="text-xl mt-3 uppercase text-white font-semibold tracking-widest">
          Total Product
        </h2>
      </div>
      <h1 className="text-7xl font-extrabold text-slate-900">
        {totalProducts}
      </h1>
      <div className="w-full flex justify-between text-white mt-8">
        <p className="">
          Total Stock: <strong className="text-2xl">3000</strong>
        </p>
        <p className="">
          Categories: <strong className="text-2xl">5</strong>
        </p>
      </div>
    </div>
  );
};

export default TotalProductCard;
