import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

const initialState = JSON.parse(localStorage.getItem("cartProducts")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        _id,
        name,
        price,
        image,
        stock,
        quantity = 1,
      } = action.payload;
      const itemExistInCart = state.find(
        (item) => item._id === _id
      );

      if (!itemExistInCart) {
        state.push({
          _id,
          name,
          price,
          image,
          stock,
          quantity,
        });
        // toast.success("Product added to Cart");
      } else {
        // toast.error("Product already on cart");
      }

      localStorage.setItem("cartProducts", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const { _id } = action.payload;
      const updatedState = state.filter((item) => item._id !== _id);
      localStorage.setItem("cartProducts", JSON.stringify(updatedState));
      // toast.error("Product removed from cart");
      return updatedState;
    },

    clearCart: () => {
      localStorage.removeItem("cartProducts");
      return [];
    },

    decrementQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const updatedState = state.map((item) => {
        if (item._id === _id && quantity > 1) {
          return {
            ...item,
            quantity: quantity - 1,
          };
        }
        return item;
      });

      localStorage.setItem("cartProducts", JSON.stringify(updatedState));
      return updatedState;
    },

    incrementQuantity: (state, action) => {
      const { _id, quantity, stock } = action.payload;
      const updatedState = state.map((item) => {
        if (item._id === _id && quantity < stock) {
          return {
            ...item,
            quantity: quantity + 1,
          };
        }
        return item;
      });

      localStorage.setItem("cartProducts", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
