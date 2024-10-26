import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAddToWishlistMutation } from "../../feature/products/productsApiSlice";
import toast from "react-hot-toast";

const WishListProductCard = ({ data }) => {
  const { token } = useSelector((state) => state?.auth);
  const { images, name, price, _id, stock } = data;
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
    <div className="flex lg:gap-5 gap-4 bg-gray-50 border border-primary/20 rounded-xl p-3 tr">
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
          className="font-semibold cursor-pointer hover:text-slate-900 tr md:text-md text-sm"
        >
          {name}
        </h2>
        <h2 className="font-medium text-red-500">${price}.00</h2>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleRemoveFavourite}
            className="text-sm py-1.5 px-4 hover:bg-red-100 tr rounded-full text-red-500 font-medium"
          >
            Remove
          </button>
          <Link
            to={`/products/${data?._id}`}
            className="text-sm py-1.5 px-4 bg-primary hover:bg-black tr rounded-full text-white font-medium"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishListProductCard;
