import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../feature/cart/cartSlice";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartProductCard = ({ data }) => {
  const dispatch = useDispatch()
  const {
    image,
    name,
    price,
    _id,
    quantity = 2,
    stock,
  } = data;

  const handleDecrementQuantity = (_id, Quantity) => {
    dispatch(
      decrementQuantity({
        _id,
        quantity: Quantity,
      })
    );
  };

  const handleIncrementQuantity = (_id, Quantity, Stock) => {
    dispatch(
      incrementQuantity({
        _id,
        stock: Stock,
        quantity: Quantity,
      })
    );
  };

  const handleDeleteCartItem = (delete_productid) => {
    dispatch(
      removeFromCart({
        _id: delete_productid,
      })
    );
  };

  return (
    <div className="grid grid-cols-4 gap-3 group">
      <div className="col-span-1">
        <img
          src={image}
          alt=""
          className="h-20 p-3 w-full object-contain bg-gray-100 rounded-xl"
        />
      </div>
      <div className="col-span-3 flex flex-col justify-between relative">
        <h2>{name}</h2>
        <div
            onClick={() => handleDeleteCartItem(_id)}
            className="hidden group-hover:grid absolute top-0 right-3 h-7 w-7 bg-red-100 hover:bg-red-200 place-items-center rounded-full transition duration-300  cursor-pointer"
          >
            <RiDeleteBin6Line className="text-red-500 text-[14px]" />
          </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 border lg:px-2 px-1 py-[1px] w-fit rounded-full bg-[#f5f8fb]">
            <button
              onClick={() => handleDecrementQuantity(_id, quantity)}
              className="lg:text-sm text-xs border p-1 rounded-full bg-white hover:bg-red-200 hover:border-red-400 hover:text-red-500 transition duration-300"
            >
              <AiOutlineMinus />
            </button>
            <p className="py-1 lg:px-2 px-1 lg:text-sm text-xs md:text-base  text-gray-600 rounded-full">
              {quantity}
            </p>
            <button
              onClick={() => handleIncrementQuantity(_id, quantity, stock)}
              className="lg:text-sm text-xs border p-1 rounded-full bg-white hover:bg-emerald-200 hover:border-emerald-500 hover:text-emerald-500 transition duration-300"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <h2>{price}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
