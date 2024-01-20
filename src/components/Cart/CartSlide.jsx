import React from "react";
import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../ProductCards/CartProductCard";
import { clearCart } from "../../feature/cart/cartSlice";
import { BiSolidTrash } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { authModalOpen } from "../../feature/auth/authModalSlice";

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
        <div className="md:w-[420px] w-[80vw] py-5 px-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-medium">Your Cart</h2>
            {cart?.length > 0 && (
              <button
                className="flex items-center gap-1.5 text-red-500 hover:text-red-600 tr text-sm font-bold"
                onClick={handleRemoveAll}
              >
                <BiSolidTrash className="text-[17px]" />
                Remove All
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-6">
            {cart?.length > 0 ? (
              <React.Fragment>
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
                  <h2 className="font-bold">${subtotal}</h2>
                </div>
                <button
                  onClick={handleCheckout}
                  className="group flex items-center gap-3 bg-primaryColor py-2.5 justify-center text-white border border-primaryColor rounded-lg"
                >
                  Checkout
                  <FaArrowRightLong className="mt-0.5 group-hover:translate-x-2 tr" />
                </button>
              </React.Fragment>
            ) : (
              <h2 className="text-2xl text-gray-400">No items added to cart</h2>
            )}
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default CartSlide;
