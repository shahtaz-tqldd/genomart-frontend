import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("genomart_auth") || null,
  user: JSON.parse(localStorage.getItem("genomart_auth")) || null,
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
          user: action.payload.user,
        })
      );
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      localStorage.removeItem("genomart_auth");
    },

    updateUserState: (state, action) => {
      state.user = action.payload.user;
      token = state.token;
      localStorage.setItem(
        "genomart_auth",
        JSON.stringify({
          user: action.payload.user,
          token: token,
        })
      );
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateUserState } =
  authSlice.actions;

export default authSlice.reducer;
