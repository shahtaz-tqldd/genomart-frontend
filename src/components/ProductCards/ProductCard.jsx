import React, { useEffect, useState } from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { addToCart } from "../../feature/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Ratings from "../../utiles/Ratings";
import {
  useAddToWishlistMutation,
  useGetMyWishListQuery,
} from "../../feature/products/productsApiSlice";
import toast from "react-hot-toast";
import { authModalOpen } from "../../feature/auth/authModalSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { token } = useSelector((state) => state?.auth);

  const { _id, images, name, price, description, stock } = data;
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
        stock: stock,
        colors: data?.colors || null,
        sizes: data?.sizes || null,
      })
    );
  };

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
    if (!token) {
      return dispatch(authModalOpen());
    }

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

  const handleCartOpen = () => {
    document.querySelector("#cart").click();
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="lg:h-56 md:h-48 h-40 bg-gray-100 w-full rounded-xl overflow-hidden relative">
          <img
            src={images[0]?.url || null}
            alt=""
            className="w-full h-full object-contain p-4 group-hover:scale-110 tr"
          />
          <button
            onClick={(e) => handleAddToWishList(e)}
            className="absolute top-3 right-3 -translate-y-16 group-hover:translate-y-0 tr bg-white hover:bg-green-100 tr h-10 w-10 text-black border border-green-500/10 rounded-full grid place-items-center"
          >
            {!isAddedToWishList ? (
              <IoMdHeartEmpty className="text-xl" />
            ) : (
              <IoHeart className="text-xl text-red-500" />
            )}
          </button>
        </div>
        <h4 className="text-md font-bold text-center my-4 text-gray-700">
          {name}
        </h4>
      </div>
      <div className="overflow-hidden h-[118px]">
        <div className="flex flex-col items-center">
          <Ratings rating={4} size={12} mt={8} />
          <div className="flex md:flex-row flex-col items-center justify-between gap-2 mt-5 w-full px-2">
            <h2 className="text-red-500 font-bold">${price}.00</h2>
            <button
              onClick={
                !isAddedToCart ? handleAddToCart : (e) => e.stopPropagation()
              }
              className="text-white w-fit text-sm"
            >
              {isAddedToCart ? (
                <div className="bg-primary/20 text-black/50 py-2 pl-3 pr-4 rounded-full fl gap-2 tr cursor-default">
                  <BsCartCheckFill className="" />
                  Added
                </div>
              ) : (
                <div
                  onClick={handleCartOpen}
                  className="fl gap-2 bg-emerald-500 hover:bg-black py-2 pl-3 pr-4 rounded-full tr"
                >
                  <BsCartPlusFill className="text-white" />
                  Add to Cart
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
