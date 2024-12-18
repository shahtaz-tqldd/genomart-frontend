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
import { RiArrowRightSLine } from "react-icons/ri";
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
import Heading from "../../ui/Heading/Heading";
import placeholder from "../../assets/images/placeholder.png";
import ProductReviews from "./ProductReveiws";
import AskQuestionModal from "./AskQuestionModal";

const ProductDetails = () => {
  const [askQMopen, setAskQMopen] = useState(null);
  const { token } = useSelector((state) => state?.auth);
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
    <div className="container grid lg:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-16 gap-10 lg:mt-28 mt-20">
      {/* product images */}
      <div>
        <div className="relative w-full lg:h-[500px] md:h-[400px] h-[300px] lg:p-20 md:p-16 p-8 bg-gray-100 rounded-xl">
          <img
            src={isLoading ? placeholder : imgSelect}
            alt=""
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => {
              const currentIndex = data?.data?.images?.findIndex(
                (image) => image.url === imgSelect
              );

              const prevImageIndex =
                (currentIndex - 1 + data?.data?.images?.length) %
                data?.data?.images?.length;

              const prevImage = data?.data?.images[prevImageIndex]?.url;

              if (prevImage) {
                setImgSelect(prevImage);
              }
            }}
            className="absolute top-1/2 -translate-y-1/2 left-3 z-10"
          >
            <RiArrowRightSLine className="h-9 w-9 bg-primary/10 hover:bg-primary/20 tr rounded-full p-2 rotate-180" />
          </button>

          <button
            onClick={() => {
              const currentIndex = data?.data?.images?.findIndex(
                (image) => image.url === imgSelect
              );
              const nextIndex = (currentIndex + 1) % data?.data?.images?.length;
              const nextImage = data?.data?.images[nextIndex]?.url;

              if (nextImage) {
                setImgSelect(nextImage);
              }
            }}
            className="absolute top-1/2 -translate-y-1/2 right-3 z-10"
          >
            <RiArrowRightSLine className="h-9 w-9 bg-primary/10 hover:bg-primary/20 tr rounded-full p-2" />
          </button>
        </div>
        <div className="grid grid-cols-4 lg:gap-6 md:gap-4 gap-3 mt-5">
          {data?.data?.images?.map((img, i) => (
            <img
              onClick={() => setImgSelect(data?.data?.images[i]?.url)}
              key={i}
              src={img?.url}
              className={`tr object-contain lg:h-[120px] md:h-[100px] h-[72px] w-full rounded-xl lg:p-5 p-2 cursor-pointer ${
                imgSelect === img?.url
                  ? "bg-primary/10 border border-primary/75"
                  : "bg-primary/5 hover:bg-primary/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* product details */}
      <div>
        <span className="py-1 px-4 rounded-full bg-purple-50 text-sm text-purple-500 font-medium border border-purple-500/10 w-fit">
          {data?.data?.brand || "Brand Name"}
        </span>
        <h2 className="md:text-3xl text-2xl font-medium mt-2 mb-4">
          {data?.data?.name}
        </h2>
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
              ({data?.data?.numReview || 121} Reviews)
            </h2>
          </div>
        </div>
        <h2 className="text-gray-600 mt-6 text-sm">
          {data?.data?.description}
        </h2>
        <div className="flex items-end gap-5 mt-6">
          <h2 className="text-red-500  text-3xl font-bold">
            $ {data?.data?.price}.00
          </h2>
          {data?.data?.discount && (
            <p className="text-red-500 font-medium text-sm mb-1 uppercase">
              Save up to {data?.data?.discount}%
            </p>
          )}
        </div>

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
            <div className="flex items-center gap-2">
              {data?.data?.sizes?.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setSize(s)}
                  className={`cursor-pointer w-20 py-2 rounded-full text-xs grid place-content-center border border-black/20 ${
                    size === s
                      ? "bg-slate-800 text-white"
                      : "text-slate-800 bg-black/5"
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
          <div className="flex items-center gap-2 border lg:px-2 px-4 py-2 w-fit bg-gray-50 rounded-full">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="lg:text-sm text-xs border p-2 rounded-full bg-white hover:bg-red-200 hover:border-red-400 hover:text-red-500 transition duration-300"
            >
              <AiOutlineMinus />
            </button>
            <p className="py-1 lg:px-2 px-1 lg:text-sm text-xs md:text-base text-black/80 font-medium rounded-full">
              {quantity}
            </p>
            <button
              onClick={() =>
                setQuantity(data?.data?.stock > quantity && quantity + 1)
              }
              className="lg:text-sm text-xs border p-2 rounded-full bg-white hover:bg-emerald-200 hover:border-emerald-500 hover:text-emerald-500 transition duration-300"
            >
              <AiOutlinePlus />
            </button>
          </div>

          <button
            onClick={handleCheckout}
            className="group flex items-center gap-3 bg-primary py-3 lg:px-16 md:px-16 px-12 text-white rounded-full hover:bg-black tr"
          >
            <span className="ml-4">Checkout</span>
            <RiArrowRightSLine className="mt-0.5 text-xl group-hover:translate-x-2 tr" />
          </button>
        </div>

        <hr className="mt-6" />
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => {
              !isAddedToCart ? handleAddToCart() : handleRemoveFromCart();
            }}
            className={`py-2 px-4 rounded-full border border-primary/20 ${
              !isAddedToCart ? "bg-gray-100" : "bg-primary/10 text-primary"
            }`}
          >
            <div className="flex items-center gap-2">
              <BsCartPlusFill className="text-lg mb-0.5" />
              {isAddedToCart ? <h2>Added</h2> : <h2>Add to Cart</h2>}
            </div>
          </button>
          <button onClick={handleAddToWishList} className="">
            {isAddedToWishList ? (
              <div className="flex items-center gap-2 py-2 px-4 bg-red-100 rounded-full border border-primary/20">
                <FaHeart className="text-red-500 text-lg mb-0.5" />{" "}
                <h2>Added in wishlist</h2>
              </div>
            ) : (
              <div className=" flex items-center gap-2 py-2 px-4 bg-gray-100  rounded-full border border-primary/20">
                <FaRegHeart className="text-lg mb-0.5" />{" "}
                <h2>Add to Wishlist</h2>
              </div>
            )}
          </button>
          <button
            onClick={() => setAskQMopen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-full border border-primary/20"
          >
            <AiFillQuestionCircle className="text-lg mb-0.5" />{" "}
            <h2>Ask question</h2>
          </button>
        </div>
      </div>

      {/* product specefication */}
      <div>
        <Heading title={"Product Specefication"} />
        <ParsedText
          content={data?.data?.specs}
          className={"text-black/90 text-sm"}
        />
      </div>

      <ProductReviews />
      {askQMopen && (
        <AskQuestionModal open={askQMopen} setOpen={setAskQMopen} />
      )}
    </div>
  );
};

export default ProductDetails;
