import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => {
        const { bodyData } = data;
        return {
          url: `/api/v1/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.data.token,
            })
          );
          // console.log(result.data.user);
          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          // do nothing
        }
      },
      providesTags: [""],
    }),
    userDetails: builder.query({
      query: (token) => {
        return {
          url: `/api/v1/my-profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: [""],
    }),
  }),
});

export const { useLoginUserMutation, useUserDetailsQuery } = authApiSlice;
