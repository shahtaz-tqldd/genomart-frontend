import React from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { addToCart } from "../../feature/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddToFavourite } from "../../utiles/functions/handleAuthCheck";
import Ratings from "../../utiles/Ratings";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { token } = useSelector((state) => state?.auth);
  const { _id, img, name, price, description, stock = 10 } = data;
  const cart = useSelector((state) => state?.cart);
  const isAddedToCart = cart?.find((p) => p?._id === _id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        _id: _id,
        name: name,
        price: price,
        image: img,
        stock: parseInt(stock),
      })
    );
  };

  const handleNavigate = () => {
    naviagte(`/products/${_id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="h-56 bg-gray-100 w-full rounded-xl overflow-hidden relative">
          <img
            src={img}
            alt=""
            className="w-full h-full object-contain p-4 group-hover:scale-110 tr"
          />
          <button
            onClick={(e) => handleAddToFavourite(e, token, dispatch)}
            className="absolute top-3 right-3 -translate-y-16 group-hover:translate-y-0 tr bg-[#CAF7E3] hover:bg-green-300 tr h-10 w-10 text-gray-600 rounded-lg grid place-items-center"
          >
            <FaRegHeart className="text-xl" />
          </button>
        </div>
        <h4 className="text-md font-bold text-center my-4 text-gray-700">
          {name}
        </h4>
      </div>
      <div className="overflow-hidden h-[118px]">
        <div className="flex flex-col items-center translate-y-0 group-hover:-translate-y-10 tr">
          <p className="text-sm text-gray-600 text-center">
            {description?.slice(0, 56) + "..."}
          </p>
          <h2 className="text-2xl mt-2 text-orange-500">${price}</h2>
          <Ratings rating={4} size={12} mt={8} />
          <div className="w-full grid grid-cols-5 gap-2 mt-[18px]">
            <button className="col-span-4 tr bg-primaryColor hover:bg-secondary text-white w-full py-2 rounded-lg">
              Buy Now
            </button>
            <button
              onClick={
                !isAddedToCart ? handleAddToCart : (e) => e.stopPropagation()
              }
              className=" col-span-1 w-full rounded-lg grid place-items-center"
            >
              {isAddedToCart ? (
                <BsCartCheckFill className="text-xl text-green-700" />
              ) : (
                <BsCartPlusFill className="text-xl text-gray-700 hover:text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
