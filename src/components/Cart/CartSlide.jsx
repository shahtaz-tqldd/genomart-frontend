import React from "react";
import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartProductCard from "../ProductCards/CartProductCard";
import { clearCart } from "../../feature/cart/cartSlice";
import { BiSolidTrash } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { authModalOpen } from "../../feature/auth/authModalSlice";
import { RiArrowRightSLine } from "react-icons/ri";
import Heading from "../../ui/Heading/Heading";

const CartSlide = ({ state, setState, toggleDrawerCart }) => {
  const { token } = useSelector((state) => state?.auth);
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveAll = () => {
    dispatch(clearCart());
    setState({ right: false });
  };

  const subtotal = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const handleCheckout = () => {
    if (token) {
      setState({ right: false });
      navigate("/checkout");
    } else {
      dispatch(authModalOpen());
    }
  };
  return (
    <div className="w-full absolute">
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawerCart("right", false)}
        onOpen={toggleDrawerCart("right", true)}
      >
        <div className="md:w-[480px] w-[80vw] py-5 px-6">
          <div className="flex justify-between">
            <Heading title="Your Cart" />

            {cart?.length > 0 && (
              <button
                className="h-fit flex items-center gap-1.5 text-red-500 bg-red-50 hover:bg-red-100 tr text-sm py-1 pl-3 pr-4 rounded-full border border-red-400"
                onClick={handleRemoveAll}
              >
                <BiSolidTrash />
                Remove All
              </button>
            )}
          </div>
          <div className="">
            {cart?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {cart?.map((data, i) => (
                  <CartProductCard
                    key={i}
                    data={data}
                    onClose={toggleDrawerCart("right", false)}
                  />
                ))}
                <hr className="mt-6 mb-2" />
                <div className="flex justify-between text-xl mb-4 px-2">
                  <h2>Subtotal</h2>
                  <h2 className="font-bold">${subtotal}.00</h2>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={toggleDrawerCart("right", false)}
                    className="w-full group flex items-center gap-2 hover:bg-black/5 tr py-3 justify-center border border-black/50 text-black rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="w-full group flex items-center gap-2 bg-primary hover:bg-black tr py-3 justify-center text-white rounded-full"
                  >
                    Checkout
                    <RiArrowRightSLine className="text-xl mt-0.5 group-hover:translate-x-2 tr" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[70vh] text-black/40 flex flex-col items-center justify-center gap-5">
                <FiShoppingCart className="h-14 w-14 opacity-60" />
                <h2 className="text-xl font-medium uppercase mb-10">
                  Your cart is Empty
                </h2>
                <Link
                  to={"/products"}
                  className="text-primary py-1.5 px-6 rounded-full border border-primary"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default CartSlide;
