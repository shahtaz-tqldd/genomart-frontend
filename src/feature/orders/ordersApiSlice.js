import { apiSlice } from "../api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        const { bodyData, token } = data;
        return {
          url: `orders`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["order", "myProfile"],
    }),

    updateOrder: builder.mutation({
      query: (data) => {
        const { id, bodyData, token } = data;
        return {
          url: `orders/${id}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["order"],
    }),

    getAllOrders: builder.query({
      query: ({ token }) => {
        return {
          url: `orders`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["order"],
    }),

    getSingleOrder: builder.query({
      query: ({ id }) => {
        return {
          url: `orders/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["order"],
    }),

    deleteOrder: builder.mutation({
      query: (data) => {
        const { id, token } = data;
        return {
          url: `/orders/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
} = orderApiSlice;
