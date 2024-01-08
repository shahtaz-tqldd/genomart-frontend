import { authModalOpen } from "../../feature/auth/authModalSlice";

export const handleCheckout = (token, dispatch, navigate,handleClose, handleAddToCart) => {
  if (token) {
    navigate("/checkout");
    handleAddToCart()
    handleClose()
  } else {
    dispatch(authModalOpen());
  }
};

export const handleAddToFavourite = (e, token, dispatch) => {
  e.stopPropagation()
  if (token) {
    console.log("add to favourite");
  } else {
    dispatch(authModalOpen());
  }
};
