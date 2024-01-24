import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAddToWishlistMutation } from "../../feature/products/productsApiSlice";
import toast from "react-hot-toast";

const WishListProductCard = ({ data }) => {
  const { token } = useSelector((state) => state?.auth);
  const { images, name, price, _id, stock } = data;
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
  const navigate = useNavigate();
  const handleNaviagte = () => {
    navigate(`/products/${_id}`);
  };

  const [addToWishList] = useAddToWishlistMutation() || {};
  const handleRemoveFavourite = async () => {
    const res = await addToWishList({
      token,
      id: _id,
      bodyData: { action: "remove" },
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="flex gap-5">
      <div>
        <img
          src={images[0]?.url}
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
        {data?.colors?.length > 0 && (
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
          {data?.sizes?.length > 0 ? (
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
          <div className="flex justify-between items-center gap-10">
            <h2 className="text-sm font-bold">${price}</h2>
            <Link to={`/products/${data?._id}`} className="text-sm py-1 px-3 bg-primaryColor hover:bg-primaryColorh tr rounded text-white font-bold">Buy Now</Link>
          </div>
        </div>
        {/* delete button */}
        <div
          onClick={handleRemoveFavourite}
          className="grid absolute top-1 right-1 h-7 w-7 bg-red-100 hover:bg-red-200 place-items-center rounded-full transition duration-300  cursor-pointer"
        >
          <RiDeleteBin6Line className="text-red-500 text-[14px]" />
        </div>
      </div>
    </div>
  );
};

export default WishListProductCard;
