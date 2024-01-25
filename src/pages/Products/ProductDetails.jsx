import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import {
  AiFillQuestionCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartDashFill, BsCartPlusFill } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import {
  addToCart,
  removeFromCart,
  updateColor,
  updateSize,
} from "../../feature/cart/cartSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ParsedText from "../../utiles/ParsedText";
import {
  useAddToWishlistMutation,
  useGetMyWishListQuery,
  useGetSingleProductQuery,
} from "../../feature/products/productsApiSlice";
import Ratings from "../../utiles/Ratings";
import { authModalOpen } from "../../feature/auth/authModalSlice";
import useTitle from "../../hooks/useTitle";
import toast from "react-hot-toast";
import { updateUserState } from "../../feature/auth/authSlice";

const ProductDetails = () => {
  const { token, user } = useSelector((state) => state?.auth);
  const { id } = useParams();
  const cart = useSelector((state) => state?.cart);
  const isAddedToCart = cart?.find((p) => p?._id === id);

  const { data, isLoading, isSuccess, isError } = useGetSingleProductQuery(
    { id },
    { refetchOnReconnect: true }
  );

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (data?.data?.sizes) {
      setSize(isAddedToCart?.selectedSize || data?.data?.sizes[0]);
    }
    if (data?.data?.colors) {
      setColor(isAddedToCart?.selectedColor || data?.data?.colors[0]);
    }
  }, [data]);

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: data?.data?._id,
        name: data?.data?.name,
        price: data?.data?.price,
        image: data?.data?.images[0]?.url,
        stock: data?.data?.stock,
        selectedColor: color || null,
        colors: data?.data?.colors || [],
        selectedSize: size || null,
        sizes: data?.data?.sizes || [],
        quantity,
      })
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(
      removeFromCart({
        _id: id,
      })
    );
  };

  const [imgSelect, setImgSelect] = useState();
  useEffect(() => {
    setImgSelect(data?.data?.images[0]?.url);
  }, [data]);
  useTitle(data?.data?.name);

  useEffect(() => {
    if (color) {
      dispatch(updateColor({ _id: id, color }));
    }
    if (size) {
      dispatch(updateSize({ _id: id, size }));
    }
  }, [color, size]);

  // CHECKOUT
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (token) {
      handleAddToCart();
      navigate("/checkout");
    } else {
      dispatch(authModalOpen());
    }
  };

  // ADD TO WISHLIST FUNCTIONALITIS
  const { data: wishlist } = useGetMyWishListQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);

  useEffect(() => {
    if (wishlist?.success) {
      setIsAddedToWishList(
        wishlist?.data?.find((p) => p?._id === id) ? true : false
      );
    }
  }, [wishlist]);

  const [addToWishList] = useAddToWishlistMutation() || {};
  const handleAddToWishList = async () => {
    if (!token) {
      return dispatch(authModalOpen());
    }
    const res = await addToWishList({
      token,
      id,
      bodyData: { action: isAddedToWishList ? "remove" : "add" },
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="container grid grid-cols-2 gap-20 mt-12">
      {/* product images */}
      <div>
        <img
          src={imgSelect}
          alt=""
          className="w-full h-[500px] object-contain p-20 bg-gray-100 rounded-xl"
        />
        <div className="grid grid-cols-4 gap-6 mt-5">
          {data?.data?.images?.map((img, i) => (
            <img
              onClick={() => setImgSelect(data?.data?.images[i]?.url)}
              key={i}
              src={img?.url}
              className="bg-blue-50 hover:bg-blue-100 tr object-contain h-full rounded-xl p-5 cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* product details */}
      <div>
        <p>{data?.data?.category}</p>
        <h2 className="text-3xl font-medium mt-2 mb-4">{data?.data?.name}</h2>
        <div className="flex items-center gap-4">
          <div
            className={`w-fit flex items-center gap-2 py-1 pl-2 pr-3 rounded ${
              data?.data?.stock > 0
                ? "text-green-700 bg-green-100"
                : "text-red-600 bg-red-100"
            }`}
          >
            {data?.data?.stock > 0 ? <IoCheckmarkCircleSharp /> : <HiXMark />}
            <span className="text-sm font-bold">
              {data?.data?.stock > 0 ? "In Stock" : "Out of stock"}
            </span>
          </div>
          <div className="flex items-center ml-5 gap-1.5">
            <div className="">
              <Ratings rating={4} size={15} />
            </div>
            <h2 className="text-gray-400 text-sm ml-2">
              ({data?.data?.numReview || 100} Reviews)
            </h2>
          </div>
        </div>
        <h2 className="text-gray-600 mt-6 text-sm">
          {data?.data?.description}
        </h2>
        <h2 className="text-orange-500 mt-6 text-2xl font-bold">
          $ {data?.data?.price}
        </h2>

        {/* colors */}
        {data?.data?.colors?.length > 0 ? (
          <>
            <h2 className="text-lg font-medium mt-6 mb-2">Available Colors</h2>
            <div className="flex items-center gap-3">
              {data?.data?.colors?.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setColor(c)}
                  className={`cursor-pointer h-6 w-6 grid place-content-center rounded-full ${
                    color === c && "border-slate-600 border-2"
                  }`}
                >
                  <div
                    style={{ backgroundColor: c }}
                    className="h-4 w-4 rounded-full"
                  ></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="pt-10"></div>
        )}
        {/* sizes */}
        {data?.data?.sizes?.length > 0 ? (
          <>
            <h2 className="text-lg font-medium mt-6 mb-2">Available Sizes</h2>
            <div className="flex items-center gap-3">
              {data?.data?.sizes?.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setSize(s)}
                  className={`cursor-pointer p-2 rounded text-xs grid place-content-center ${
                    size === s ? "bg-slate-800 text-white" : "text-slate-800"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="pt-10"></div>
        )}

        <div className="flex items-center gap-4 mt-12">
          <div className="flex items-center gap-2 border lg:px-2 px-4 py-1.5 w-fit bg-[#f5f8fb] rounded-lg">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="lg:text-sm text-xs border p-1 rounded-full bg-white hover:bg-red-200 hover:border-red-400 hover:text-red-500 transition duration-300"
            >
              <AiOutlineMinus />
            </button>
            <p className="py-1 lg:px-2 px-1 lg:text-sm text-xs md:text-base  text-gray-600 rounded-full">
              {quantity}
            </p>
            <button
              onClick={() =>
                setQuantity(data?.data?.stock > quantity && quantity + 1)
              }
              className="lg:text-sm text-xs border p-1 rounded-full bg-white hover:bg-emerald-200 hover:border-emerald-500 hover:text-emerald-500 transition duration-300"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            onClick={handleCheckout}
            className="group flex items-center gap-3 bg-primaryColor py-2 px-20 text-white border border-primaryColor rounded-lg"
          >
            Checkout
            <FaArrowRightLong className="mt-0.5 group-hover:translate-x-2 tr" />
          </button>
        </div>

        <hr className="mt-6" />
        <div className="mt-3 flex items-center gap-10">
          <button
            onClick={() => {
              !isAddedToCart ? handleAddToCart() : handleRemoveFromCart();
            }}
            className="text-gray-600"
          >
            {isAddedToCart ? (
              <div className="flex items-center gap-2 text-red-500">
                <BsFillCartDashFill className="text-lg mb-0.5" />{" "}
                <h2>Remove From Cart</h2>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-800">
                <BsCartPlusFill className="text-lg mb-0.5" />{" "}
                <h2>Add to Cart</h2>
              </div>
            )}
          </button>
          <button onClick={handleAddToWishList} className="text-gray-800">
            {isAddedToWishList ? (
              <div className="flex items-center gap-2">
                <FaHeart className="text-lg mb-0.5" />{" "}
                <h2>Added in wishlist</h2>
              </div>
            ) : (
              <div className=" flex items-center gap-2">
                <FaRegHeart className="text-lg mb-0.5" />{" "}
                <h2>Add to Wishlist</h2>
              </div>
            )}
          </button>
          <div className=" flex items-center gap-2 text-gray-800">
            <AiFillQuestionCircle className="text-lg mb-0.5" />{" "}
            <h2>Ask question</h2>
          </div>
        </div>
      </div>

      {/* product specefication */}
      <div>
        <h2 className="text-xl font-medium mb-4">Product Specefication</h2>
        <ParsedText
          content={data?.data?.specs}
          className={"text-gray-600 text-sm"}
        />
      </div>

      {/* comments */}
      <div>
        <h2 className="text-xl font-medium mb-4">Comments</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
