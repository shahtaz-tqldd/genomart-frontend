import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../../utiles/Ratings";

const PickOfTheProductCard = ({ data, color }) => {
  const { images, name, price, _id } = data;

  return (
    <div
      className={`group cursor-pointer p-5 flex flex-col justify-between gap-4 rounded-xl bg-opacity-20 ${color}`}
    >
      <div className="flex flex-col items-center h-[200px]">
        <div className="h-full flex flex-col justify-between">
          <h4 className="text-lg font-bold text-center mt-4 text-gray-700">
            {name}
          </h4>

          <div className="flex flex-col items-center ">
            <h2 className="text-2xl text-orange-500">${price}</h2>
            <div className="flex gap-2 mt-2 mb-8">
              <Ratings rating={4} mt={8} />
            </div>
            <Link
              to={`/products/${_id}`}
              className={`text-sm w-fit px-8 text-white bg-opacity-80 hover:bg-opacity-100 font-medium py-2 tr  ${color}`}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto">
        <img
          src={images[0]?.url || null}
          alt=""
          className="mx-auto h-[200px] p-4 object-contain group-hover:scale-110 tr"
        />
      </div>
    </div>
  );
};

export default PickOfTheProductCard;
