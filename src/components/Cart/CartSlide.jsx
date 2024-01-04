import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartProductCard from "./CartProductCard";
import { clearCart } from "../../feature/cart/cartSlice";
import { BiSolidTrash } from "react-icons/bi";

const CartSlide = ({ state, setState, toggleDrawerCart }) => {
  const data = [];
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    // navigate(link);
    // setState({ left: false });
  };

  const handleRemoveAll = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-full absolute">
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawerCart("right", false)}
        onOpen={toggleDrawerCart("right", true)}
      >
        <div className="md:w-[480px] w-[80vw] py-5 px-8">
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
              cart?.map((data, i) => <CartProductCard key={i} data={data} />)
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
