import React from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { handleAddToFavourite } from "../../utiles/functions/handleAuthCheck";

const ProductCardList = ({ data }) => {
  const { token } = useSelector((state) => state?.auth);
  const {
    images,
    name,
    price,
    description,
    _id,
    ratings = 4.5,
    stock,
  } = data;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const isAddedToCart = cart?.find((p) => p?._id === _id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        _id: _id,
        name: name,
        price: price,
        image: images[0]?.url,
        stock: parseInt(stock),
      })
    );
  };
  const naviagte = useNavigate();
  const handleNavigate = () => {
    naviagte(`/products/${_id}`);
  };
  return (
    <div className="grid grid-cols-5 gap-5 group">
      <div className="col-span-2 h-48 bg-gray-100 w-full rounded-xl overflow-hidden relative">
        <img
          src={images[0]?.url}
          alt=""
          className="w-full h-full object-contain p-3 group-hover:scale-110 tr"
        />
      </div>
      <div className="col-span-3 flex flex-col justify-between h-full">
        <div>
          <h4 className="text-md font-bold text-gray-700">{name}</h4>
          <p className="text-sm mt-2 text-gray-600">
            {description?.slice(0, 150)}
          </p>
          <h2 className="text-xl font-medium text-orange-500 mt-4">
            $ {price}
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="w-full justify-between flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <FaStar className="text-sm text-orange-500" />
              {ratings}
            </div>
            <button
              onClick={(e) => {
                !isAddedToCart && handleAddToCart(e);
              }}
              className="text-gray-600"
            >
              {isAddedToCart ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <BsCartCheckFill className="text-lg mb-0.5" />{" "}
                  <h2>Added to Cart</h2>
                </div>
              ) : (
                <div className=" flex items-center gap-2 text-gray-800">
                  <BsCartPlusFill className="text-lg mb-0.5" />{" "}
                  <h2>Add to Cart</h2>
                </div>
              )}
            </button>
            <button
              onClick={(e) => {
                !isAddedToCart && handleAddToCart(e);
              }}
              className="text-gray-600"
            >
              {isAddedToCart ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <FaHeart className="text-lg mb-0.5" />{" "}
                  <h2>Added to wishlist</h2>
                </div>
              ) : (
                <div
                  onClick={(e) =>
                    handleAddToFavourite(e, token, dispatch)
                  }
                  className=" flex items-center gap-2 text-gray-800"
                >
                  <FaRegHeart className="text-lg mb-0.5" />{" "}
                  <h2>Add to Wishlist</h2>
                </div>
              )}
            </button>
            <button
              onClick={handleNavigate}
              className="tr bg-primaryColor hover:bg-secondary tr text-white font-semibold text-sm py-2.5 px-8 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
