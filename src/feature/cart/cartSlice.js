import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("cartProducts")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let products = action.payload;
      products.quantity = action.payload?.quantity || 1;
      const productId = action.payload?._id;

      const itemExistInCart = state?.find((item) => item?._id === productId);

      if (!itemExistInCart) {
        state.push(products);
      }
      localStorage.setItem("cartProducts", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const { _id } = action.payload;
      const updatedState = state.filter((item) => item._id !== _id);
      localStorage.setItem("cartProducts", JSON.stringify(updatedState));
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

    updateSize: (state, action) => {
      const { _id, size } = action.payload;
      const updatedState = state.map((item) => {
        if (item._id === _id) {
          return {
            ...item,
            selectedSize: size,
          };
        }
        return item;
      });

      localStorage.setItem("cartProducts", JSON.stringify(updatedState));
      return updatedState;
    },
    
    updateColor: (state, action) => {
      const { _id, color } = action.payload;
      const updatedState = state.map((item) => {
        if (item._id === _id) {
          return {
            ...item,
            selectedColor: color,
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
  updateColor, 
  updateSize
} = cartSlice.actions;
export default cartSlice.reducer;
