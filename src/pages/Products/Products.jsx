import React, { useState } from "react";
import { products } from "../../assets/data/mock/products";
import ProductCardsm from "./ProductCardSm";
import { categories } from "../../assets/data/mock/categories";
import { IoGridOutline, IoSearch } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import ProductCardList from "./ProductCardList";

const Products = () => {
  const [grid, setGrid] = useState(true);
  return (
    <div className="container mt-12 grid grid-cols-7">
      <div className="col-span-2 h-80 ">
        <h2 className="text-xl font-medium mb-3">Product Status</h2>
        {["All Items", "On Stock", "New Arival"]?.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="checkbox" />
            {c}
          </div>
        ))}
        <h2 className="text-xl font-medium mb-3 mt-8">Price Range</h2>
        <h2 className="text-xl font-medium mb-3 mt-8">Product Categories</h2>
        {categories?.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="checkbox" />
            {c?.productName}
          </div>
        ))}
      </div>
      <div className="col-span-5 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <IoGridOutline
              onClick={() => setGrid(true)}
              className={`text-3xl p-1.5 rounded  border cursor-pointer ${
                grid ? "bg-slate-800 text-white border-slate-800" : "text-gray-600"
              }`}
            />
            <AiOutlineMenu
              onClick={() => setGrid(false)}
              className={`text-3xl p-1.5  rounded border cursor-pointer ${
                grid ? "text-gray-600" : "bg-slate-800 border-slate-800 text-white"
              }`}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Products"
              className="py-1 pl-6 focus:outline-none border-b border-b-gray-300 focus:border-gray-600 w-[300px]"
            />
            <IoSearch className="absolute left-0 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        {grid ? (
          <div className="grid grid-cols-4 gap-4 mt-6">
            {products?.map((data, i) => (
              <ProductCardsm key={i} data={data} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6  mt-4">
            {products?.map((data, i) => (
              <ProductCardList key={i} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
