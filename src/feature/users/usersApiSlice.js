import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        const { bodyData } = data;
        return {
          url: `user`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        const { id, bodyData } = data;
        return {
          url: `/user/${id}`,
          method: "PATCH",
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          body: bodyData,
          formData: true,
        };
      },
      invalidatesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: (data) => {
        const { token } = data;
        return {
          url: `user`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["user"],
    }),
    // getSingleUser: builder.query({
    //   query: (data) => {
    //     const { access_token, id } = data;
    //     return {
    //       url: `/user/${id}`,
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //         "Content-Type": "application/json;charset=UTF-8",
    //       },
    //     };
    //   },
    //   providesTags: ["User"],
    // }),

    // deleteSingleUser: builder.mutation({
    //   query: (data) => {
    //     const { id, access_token, bodyData } = data;
    //     return {
    //       url: `/user/${id}`,
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //         "Content-Type": "application/json;charset=UTF-8",
    //       },
    //     };
    //   },
    //   invalidatesTags: ["User"],
    // }),
    getUserProfile: builder.query({
      query: (data) => {
        const { access_token } = data;
        return {
          url: `/user/profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["myProfile"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetAllUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
