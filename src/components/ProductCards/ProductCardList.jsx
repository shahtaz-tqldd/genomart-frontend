import React, { useEffect, useState } from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToWishlistMutation,
  useGetMyWishListQuery,
} from "../../feature/products/productsApiSlice";
import toast from "react-hot-toast";

const ProductCardList = ({ data }) => {
  const { token } = useSelector((state) => state?.auth);
  const { images, name, price, description, _id, ratings = 4.5, stock } = data;
  const dispatch = useDispatch();

  // CART FUNCTIONALITY
  const cart = useSelector((state) => state?.cart);
  const isAddedToCart = cart?.find((p) => p?._id === _id);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        _id: _id,
        name,
        price,
        image: images[0]?.url,
        stock,
        colors: data?.colors || null,
        sizes: data?.sizes || null,
      })
    );
  };

  const naviagte = useNavigate();
  const handleNavigate = () => {
    naviagte(`/products/${_id}`);
  };

  // ADD TO WISHLIST FUNCTIONALITIS
  const {
    data: wishlist,
    isLoading,
    isSuccess,
  } = useGetMyWishListQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);

  useEffect(() => {
    if (wishlist?.success) {
      setIsAddedToWishList(
        wishlist?.data?.find((p) => p?._id === _id) ? true : false
      );
    }
  }, [wishlist]);

  const [addToWishList] = useAddToWishlistMutation() || {};

  const handleAddToWishList = async (e) => {
    e.stopPropagation();

    const res = await addToWishList({
      token,
      id: _id,
      bodyData: { action: isAddedToWishList ? "remove" : "add" },
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="flex flex-row gap-6 group bg-gray-50 p-4 rounded-xl border border-green-100">
      <Link
        to={`/products/${_id}`}
        className="h-48 w-72 bg-gradient-to-tr from-blue-100 via-green-50 to-rose-50 rounded-xl overflow-hidden relative"
      >
        <img
          src={images[0]?.url}
          alt=""
          className="w-full h-full object-contain p-4 group-hover:scale-110 tr"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-between h-full">
        <div>
          <Link
            to={`/products/${_id}`}
            className="text-lg font-bold text-gray-700"
          >
            {name}
          </Link>
          <p className="text-sm mt-2 text-gray-600">
            {description?.slice(0, 150)}
          </p>
          <h2 className="text-xl font-bold text-red-500 mt-4">$ {price}.00</h2>
        </div>
        <div className="flex flex-col">
          <div className="w-full justify-between flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <FaStar className="text-sm text-yellow-500" />
              {ratings}
            </div>
            <button
              onClick={(e) => {
                !isAddedToCart && handleAddToCart(e);
              }}
              className="text-gray-600"
            >
              {isAddedToCart ? (
                <div className="flex items-center gap-2 text-primary cursor-default">
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
              {isAddedToWishList ? (
                <div
                  onClick={(e) => handleAddToWishList(e)}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <FaHeart className="text-lg text-red-500 mb-0.5" />{" "}
                  <h2>Added in wishlist</h2>
                </div>
              ) : (
                <div
                  onClick={(e) => handleAddToWishList(e)}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <FaRegHeart className="text-lg mb-0.5" />{" "}
                  <h2>Add to wishlist</h2>
                </div>
              )}
            </button>
            <button
              onClick={handleNavigate}
              className="tr bg-primary hover:bg-black tr text-white font-semibold text-sm py-2 px-6 rounded-full"
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
