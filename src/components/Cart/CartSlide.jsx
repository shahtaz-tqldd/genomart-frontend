import { SwipeableDrawer } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CartSlide = ({ state, setState, toggleDrawerCart }) => {
  const data = []
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    // navigate(link);
    // setState({ left: false });
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
          <h2>Your Cart</h2>
          <div className="flex flex-col gap-2 mt-6">
            {data?.map((d, i) => (
              <div key={i} className="">
                hem
              </div>
            ))}
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default CartSlide;
