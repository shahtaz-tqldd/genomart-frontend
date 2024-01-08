import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => {
        const { bodyData } = data;
        return {
          url: `auth/login`,
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
            "genomart_auth",
            JSON.stringify({
              token: result?.data?.data?.token,
            })
          );
          dispatch(
            userLoggedIn({
              token: result?.data?.data?.token,
              user: result?.data?.data?.user,
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
        console.log(token);
        return {
          url: `user/profile`,
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

export const { useUserLoginMutation, useUserDetailsQuery } = authApiSlice;
