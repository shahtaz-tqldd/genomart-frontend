import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const authModalSlice = createSlice({
  name: "authModalSlice",
  initialState,
  reducers: {
    authModalOpen: (state) => {
      state.isOpen = true;
    },
    authModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { authModalOpen, authModalClose } = authModalSlice.actions;

export default authModalSlice.reducer;
