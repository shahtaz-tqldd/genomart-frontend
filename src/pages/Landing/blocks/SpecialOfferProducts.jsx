import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SpecialOfferProducts = ({ specialOffer }) => {
  return (
    <div className="container grid grid-cols-5 gap-8 my-20">
      {specialOffer?.length > 0 && (
        <div className="md:col-span-3 col-span-5 bg-[#CDF0EA] rounded-xl lg:px-12 md:px-8 px-5 py-4 grid grid-cols-2 items-center">
          <div>
            <h2 className="text-md text-red-600 mb-2 font-bold">
              {specialOffer[0]?.specialOffer}
            </h2>
            <h2 className="lg:text-2xl md:text-xl text-lg font-medium text-slate-800">
              {specialOffer[0]?.name}
            </h2>
            <Link
              to={`/products/${specialOffer[0]?._id}`}
              className="w-fit lg:text-lg text-md mt-6 flex items-center gap-3 text-cyan-900 hover:text-cyan-700 font-semibold hover:gap-5 tr"
            >
              Buy Now <FaArrowRightLong />
            </Link>
          </div>
          <img
            src={specialOffer[0]?.images[1]?.url}
            alt=""
            className="w-full lg:p-10 p-4"
          />
        </div>
      )}
      {specialOffer?.length > 1 && (
        <div className="md:col-span-2 col-span-5 bg-[#B6C9F0] rounded-xl lg:px-12 md:px-8 px-5 py-4 grid grid-cols-2 items-center">
          <div>
            <h2 className="text-md text-red-600 mb-2 font-bold">
              {specialOffer[1]?.specialOffer}
            </h2>
            <h2 className="lg:text-xl md:text-lg text-md font-medium text-slate-800">
              {specialOffer[1]?.name}
            </h2>
            <Link
              to={`/products/${specialOffer[1]?._id}`}
              className="w-fit lg:text-lg text-md mt-6 flex items-center gap-3 text-cyan-900 hover:text-cyan-700 hover:gap-5 tr font-semibold"
            >
              Buy Now <FaArrowRightLong />
            </Link>
          </div>
          <img
            src={specialOffer[1]?.images[1]?.url}
            alt=""
            className="w-full lg:p-8 p-4"
          />
        </div>
      )}
    </div>
  );
};

export default SpecialOfferProducts;
