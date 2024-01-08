import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(
        "genomart_auth",
        JSON.stringify({
          token: action.payload.token,
        })
      );
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      localStorage.removeItem("genomart_auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
