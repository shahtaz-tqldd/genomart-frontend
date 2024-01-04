import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard2 = ({ data, color }) => {
  const { img, productName, price } = data;

  return (
    <div
      className={`group cursor-pointer p-5 flex flex-col justify-between gap-4 rounded-xl bg-opacity-20 ${color }`}
    >
      <div className="flex flex-col items-center h-[200px]">
        <div className="h-full flex flex-col justify-between">
          <h4 className="text-lg font-bold text-center mt-4 text-gray-700">
            {productName}
          </h4>

          <div className="flex flex-col items-center ">
            <h2 className="text-2xl text-orange-500">{price}</h2>
            <div className="flex gap-2 mt-2 mb-8">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} className="text-xs text-slate-800" />
                ))}
            </div>
            <button 
            className={`text-sm w-fit px-8 text-white bg-opacity-80 hover:bg-opacity-100 font-medium py-2 tr  ${color }`}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-ful">
        <img
          src={img}
          alt=""
          className="mx-auto h-[200px] p-4 object-contain group-hover:scale-110 tr"
        />
      </div>
    </div>
  );
};

export default ProductCard2;
