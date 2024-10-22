import React from "react";
import { Link } from "react-router-dom";

// Reusable Product Card Component
const ProductCard = ({ offer, className }) => {
  return (
    <div
      className={`rounded-xl py-8 px-10 flex justify-between gap-16 items-center border ${className}`}
    >
      <div>
        <h2 className="text-md text-red-600 mb-2 font-bold">
          {offer.specialOffer}
        </h2>
        <span className="py-1 px-3 rounded-full text-xs bg-primary/10 text-primary border border-primary/10">
          {offer.brand || "Apple"}
        </span>
        <h2 className="text-xl font-medium text-slate-800 mt-3">
          {offer.name}
        </h2>
        <h2 className="text-red-500 font-bold mt-2">${offer.price}.00</h2>
        <Link
          to={`/products/${offer._id}`}
          className="bg-primary hover:bg-black text-white font-medium py-2 px-6 rounded-full tr block mt-6 w-fit"
        >
          Buy Now
        </Link>
      </div>
      <img
        src={offer.images[1]?.url}
        alt={offer.name}
        className="h-52"
      />
    </div>
  );
};

const SpecialOfferProducts = ({ specialOffer }) => {
  return (
    <div className="container grid grid-cols-5 gap-8 my-20">
      {specialOffer?.length > 0 && (
        <ProductCard
          offer={specialOffer[0]}
          className="md:col-span-3 col-span-5 bg-gradient-to-tr from-blue-50 via-pink-50 to-purple-100"
        />
      )}
      {specialOffer?.length > 1 && (
        <ProductCard
          offer={specialOffer[1]}
          className="md:col-span-2 col-span-5 bg-gradient-to-tr from-orange-50 to-rose-100"
        />
      )}
    </div>
  );
};

export default SpecialOfferProducts;
