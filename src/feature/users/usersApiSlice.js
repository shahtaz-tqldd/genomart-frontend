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
      query: ({ bodyData, id, token }) => {
        return {
          url: `/user/update/${id}`,
          method: "PATCH",
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
          formData: true,
        };
      },
      invalidatesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: (data) => {
        const { token, page } = data;
        return {
          url: `user?page=${page}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["user"],
    }),

    disableUser: builder.mutation({
      query: ({ id, token, disable }) => {
        return {
          url: `/user/${id}?disable=${disable}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, token, role }) => {
        return {
          url: `/user/update-role/${id}?role=${role}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["user"],
    }),

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
  useDisableUserMutation,
  useUpdateUserRoleMutation,
} = userApiSlice;
