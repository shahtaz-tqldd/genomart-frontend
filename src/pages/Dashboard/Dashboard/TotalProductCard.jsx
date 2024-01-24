import React from "react";
import products from "../../../assets/images/products.png";

const TotalProductCard = ({ totalProducts, totalStock, totalCategories }) => {
  return (
    <div className="group h-full flex flex-col items-center justify-between rounded-2xl bg-[#92C7CF] p-8 relative overflow-hidden">
      <div className="bg-[#FF8F8F] group-hover:-translate-x-44 tr group-hover:bg-[#FA7070] h-80 w-80 rounded-full absolute -top-36 -right-16 "></div>
      <div className="flex flex-col items-center z-10">
        <img src={products} className="h-20" alt="" />
        <h2 className="text-xl mt-3 uppercase text-white font-semibold tracking-widest">
          Total Product
        </h2>
      </div>
      <h1 className="text-7xl font-extrabold text-slate-800">
        {totalProducts < 9 && 0}
        {totalProducts}
      </h1>
      <div className="w-full flex justify-between text-white mt-8">
        <p>
          <strong className="text-3xl">{totalStock}</strong>
          <br />
          Total Stock
        </p>
        <p>
          <strong className="text-3xl">{totalCategories}</strong>
          <br />
          Categories
        </p>
      </div>
    </div>
  );
};

export default TotalProductCard;
