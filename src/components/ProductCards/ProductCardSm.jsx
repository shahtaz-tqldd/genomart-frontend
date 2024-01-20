import React, { useEffect, useState } from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Ratings from "../../utiles/Ratings";
import {
  useAddToWishlistMutation,
  useGetMyWishListQuery,
} from "../../feature/products/productsApiSlice";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";

const ProductCardsm = ({ data }) => {
  const { images, name, price, description, _id, stock } = data;
  const { token } = useSelector((state) => state?.auth);
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
        stock: stock,
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
    <div onClick={handleNavigate} className="group cursor-pointer">
      <div className="h-48 bg-gray-100 w-full rounded-xl overflow-hidden relative">
        <img
          src={images[0]?.url}
          alt=""
          className="w-full h-full object-contain p-3 group-hover:scale-110 tr"
        />
        <button
          onClick={(e) => handleAddToWishList(e)}
          className="absolute top-3 right-3 -translate-y-16 group-hover:translate-y-0 tr bg-[#CAF7E3] hover:bg-green-300 h-8 w-8 text-gray-600 rounded-lg grid place-items-center"
        >
          {!isAddedToWishList ? (
            <FaRegHeart className="text-lg mt-0.5" />
          ) : (
            <FaHeart className="text-lg text-slate-800 mt-0.5" />
          )}
        </button>
      </div>
      <div>
        <h4 className="text-sm font-bold text-center my-4 text-gray-700">
          {name}
        </h4>
        <div className="overflow-hidden h-[106px]">
          <div className="flex flex-col items-center translate-y-0 group-hover:-translate-y-10 tr">
            <p className="text-xs text-gray-600 text-center">
              {description.slice(0, 60)}
            </p>
            <h2 className="text-xl mt-2 text-orange-500">$ {price}</h2>
            <Ratings rating={4.5} size={13} mt={8} />
            <div className="w-full grid grid-cols-5 gap-2 mt-[18px]">
              <button className="col-span-4 tr bg-primaryColor hover:bg-secondary text-white w-full text-sm py-2 rounded-lg">
                Buy Now
              </button>
              <button
                onClick={
                  !isAddedToCart ? handleAddToCart : (e) => e.stopPropagation()
                }
                className="col-span-1 w-full rounded-lg grid place-items-center"
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
    </div>
  );
};

export default ProductCardsm;
