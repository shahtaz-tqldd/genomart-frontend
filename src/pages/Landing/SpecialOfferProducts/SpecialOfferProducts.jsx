import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const SpecialOfferProducts = () => {
  return (
    <div className="container grid grid-cols-5 gap-8 my-20">
      <div className="col-span-3 bg-[#CDF0EA] rounded-xl px-12 py-4 justify-between flex items-center">
        <div>
          <h2 className="text-md text-red-600 mb-2 font-bold">Sale 35% off</h2>
          <h2 className="text-2xl font-medium">Samsung New Gen BLU G91 Pro 2023</h2>
          <button className="text-lg mt-6 flex items-center gap-3 text-gray-700 hover:text-gray-800 hover:gap-5 tr">
            Buy Now <FaArrowRightLong />
          </button>
        </div>
        <img
          src="https://cwpwp.betterthanpaper.com/wp-content/uploads/2020/05/Xiaomi-Redmi-9-series.png"
          alt=""
          className="h-60"
        />
      </div>
      <div className="col-span-2 bg-[#B6C9F0] rounded-xl px-8 py-4 flex items-center">
        <div>
          <h2 className="text-md text-red-600 mb-2 font-bold">Sale 35% off</h2>
          <h2 className="text-xl font-medium">Bigo HarmoniWave Headphones</h2>
          <button className="text-lg mt-6 flex items-center gap-3 text-gray-700 hover:text-gray-800 hover:gap-5 tr">
            Buy Now <FaArrowRightLong />
          </button>
        </div>
        <img
          src="https://freepngimg.com/download/headphones/16-black-headphones-png-image.png"
          alt=""
          className="h-60"
        />
      </div>
    </div>
  );
};

export default SpecialOfferProducts;
