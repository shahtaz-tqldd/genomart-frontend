import React from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCardsm = ({ data }) => {
  const { img, productName, price, text, _id, stock=20 } = data;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const isAddedToCart = cart?.find((p) => p?._id === _id);

  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(
      addToCart({
        _id: _id,
        name: productName,
        price: price,
        image: img,
        stock: parseInt(stock),
      })
    );
  };
  const naviagte = useNavigate()
  const handleNavigate = ()=>{
    naviagte(`/products/${_id}`)
  }
  return (
    <div  onClick={handleNavigate}  className="group cursor-pointer">
      <div className="h-48 bg-gray-100 w-full rounded-xl overflow-hidden relative">
        <img
          src={img}
          alt=""
          className="w-full h-full object-contain p-3 group-hover:scale-110 tr"
        />
        <button className="absolute top-3 right-3 -translate-y-16 group-hover:translate-y-0 tr bg-[#CAF7E3] h-12 w-12 text-gray-600 rounded-lg grid place-items-center">
          <FaRegHeart className="text-xl" />
        </button>
      </div>
      <div>
      <h4 className="text-sm font-bold text-center my-4 text-gray-700">
        {productName}
      </h4>
      <div className="overflow-hidden h-[106px]">
        <div className="flex flex-col items-center translate-y-0 group-hover:-translate-y-10 tr">
          <p className="text-xs text-gray-600 text-center">{text}</p>
          <h2 className="text-xl mt-2 text-orange-500">{price}</h2>
          <div className="flex gap-1.5 mt-2">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-xs text-orange-500" />
              ))}
          </div>
          <div className="w-full grid grid-cols-5 gap-2 mt-[18px]">
            <button className="col-span-4 tr bg-[#CAF7E3] w-full text-sm py-2 rounded-lg">
              Buy Now
            </button>
            <button className="col-span-1 hover:bg-[#CAF7E3] w-full text-gray-600 rounded-lg grid place-items-center">
              {isAddedToCart ? (
                <BsCartCheckFill className="text-xl" />
              ) : (
                <BsCartPlusFill onClick={handleAddToCart} className="text-xl" />
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
