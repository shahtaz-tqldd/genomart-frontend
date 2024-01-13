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

    logoutUser: (state, action) => {
      // Assuming action.payload.user has the updated user information when logging out
      state.user = action.payload.user;
      state.token = initialState.token;

      localStorage.setItem(
        "genomart_auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateUser } = authSlice.actions;

export default authSlice.reducer;
