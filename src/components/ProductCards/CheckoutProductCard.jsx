import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateColor,
  updateSize,
} from "../../feature/cart/cartSlice";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const CheckoutProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { image, name, price, _id, quantity, stock } = data;
  const [color, setColor] = useState(
    data?.selectedColor
      ? data?.selectedColor
      : data?.colors
      ? data?.colors[0]
      : null
  );
  const [size, setSize] = useState(
    data?.selectedSize
      ? data?.selectedSize
      : data?.sizes
      ? data?.sizes[0]
      : null
  );

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

  useEffect(() => {
    if (color) {
      dispatch(updateColor({ _id, color }));
    }
    if (size) {
      dispatch(updateSize({ _id, size }));
    }
  }, [color, size]);

  const navigate = useNavigate();
  const handleNaviagte = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className="flex gap-5 group hover:bg-blue-100 rounded-xl p-3 tr">
      <div>
        <img
          src={image}
          alt=""
          className="h-24 w-24 p-3 object-contain bg-gray-100 rounded-xl"
        />
      </div>
      <div className="py-0.5 flex flex-1 flex-col justify-between relative">
        {/* name of the product */}
        <h2
          onClick={handleNaviagte}
          className="font-bold cursor-pointer hover:text-slate-900 tr"
        >
          {name}
        </h2>
        {/* colors */}
        {data?.colors && (
          <div className="flex items-center gap-4">
            <h2 className="text-sm">Colors</h2>
            <div className="flex items-center gap-3">
              {data?.colors?.length &&
                data?.colors?.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setColor(c)}
                    className={`cursor-pointer h-5 w-5 grid place-content-center rounded-full ${
                      color === c && "border-slate-600 border-2"
                    }`}
                  >
                    <div
                      style={{ backgroundColor: c }}
                      className="h-3 w-3 rounded-full"
                    ></div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {/* size and price */}
        <div className="flex justify-between">
          {data?.sizes?.length ? (
            <div className="flex items-center gap-4">
              <h2 className="text-sm">Size</h2>
              <div className="flex items-center gap-3">
                {data?.sizes?.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setSize(s)}
                    className={`cursor-pointer py-1 px-2 rounded text-xs grid place-content-center ${
                      size === s ? "bg-slate-800 text-white" : "text-slate-800"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex justify-between items-end">
            <h2 className="text-sm font-bold">
              ${price} x {quantity}
            </h2>
          </div>
        </div>
        {/* delete button */}
        <div
          onClick={() => handleDeleteCartItem(_id)}
          className="grid absolute top-1 right-1 h-7 w-7 bg-red-100 hover:bg-red-200 place-items-center rounded-full transition duration-300  cursor-pointer"
        >
          <RiDeleteBin6Line className="text-red-500 text-[14px]" />
        </div>
        {/* increse icon */}
        <div className="absolute top-1/2 -translate-y-1/2 right-28 hidden group-hover:flex items-center gap-2 border lg:px-2 px-1 py-[1px] w-fit rounded-full bg-[#f5f8fb]">
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
      </div>
    </div>
  );
};

export default CheckoutProductCard;
