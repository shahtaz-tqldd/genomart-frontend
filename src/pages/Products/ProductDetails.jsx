import React from "react";
import { products } from "../../assets/data/mock/products";
import { FaCheck, FaStar } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const ProductDetails = () => {
  const {
    img,
    productName,
    price,
    text,
    _id,
    stock = 20,
    category = "Digital Watch",
    numReview=135
  } = products[2];
  return (
    <div className="container grid grid-cols-2 gap-12 mt-12">
      <div>
        <img src={img} alt="" className="w-full p-12 bg-gray-100" />
      </div>
      <div>
        <p>{category}</p>
        <h2 className="text-3xl font-medium mt-2 mb-4">{productName}</h2>
        <div className="flex items-center gap-4">
          <div className="w-fit flex items-center gap-2 py-1 pl-2 pr-3 text-green-700 rounded bg-green-100">
            <IoCheckmarkCircleSharp />
            <span className="text-sm font-bold">In Stock</span>
          </div>
          <div className="flex items-center ml-5 gap-1.5">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-xs text-orange-500" />
              ))}
              <h2 className="text-gray-400 text-sm ml-2">({numReview} Reviews)</h2>
          </div>
        </div>
        <h2 className="text-gray-600 mt-6 text-sm">{text}</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
