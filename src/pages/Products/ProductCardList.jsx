import React from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCardList = ({ data }) => {
  const { img, productName, price, text, _id, ratings=4.5, stock=20 } = data;
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
    <div onClick={handleNavigate} className="grid grid-cols-5 gap-5 group">
      <div className="col-span-2 h-48 bg-gray-100 w-full rounded-xl overflow-hidden relative">
        <img
          src={img}
          alt=""
          className="w-full h-full object-contain p-3 group-hover:scale-110 tr"
        />
        <button className="absolute top-3 right-3 -translate-y-16 group-hover:translate-y-0 tr bg-[#CAF7E3] h-12 w-12 text-gray-600 rounded-lg grid place-items-center">
          <FaRegHeart className="text-xl" />
        </button>
      </div>
      <div className="col-span-3 flex flex-col justify-between h-full">
        <div>
          <h4 className="text-md font-bold text-gray-700">{productName}</h4>
          <p className="text-sm mt-2 text-gray-600">{text}</p>
          <h2 className="text-xl font-medium text-orange-500 mt-4">{price}</h2>
        </div>
        <div className="flex flex-col">
          <div className="w-full grid grid-cols-5 gap-2 items-center">
            <div className="col-span-1 flex items-center gap-2">
            <FaStar className="text-sm text-orange-500" />
              {ratings}
            </div>
            <button onClick={(e)=>{!isAddedToCart && handleAddToCart(e)}} className="col-span-2 hover:bg-[#CAF7E3] w-full text-gray-600 rounded-lg grid place-items-center py-2.5">
              {isAddedToCart ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <BsCartCheckFill className="text-lg mb-0.5" /> <h2>Added to Cart</h2>
                </div>
              ) : (
                <div className=" flex items-center gap-2 text-gray-800">
                  <BsCartPlusFill className="text-lg mb-0.5" /> <h2>Add to Cart</h2>
                </div>
                
              )}
            </button>
            <button className="col-span-2  tr bg-[#CAF7E3] w-full text-sm py-2.5 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
