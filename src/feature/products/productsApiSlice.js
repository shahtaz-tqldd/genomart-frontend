import { apiSlice } from "../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        const { bodyData, token } = data;
        return {
          url: `products`,
          method: "POST",
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
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => {
        const { id, bodyData } = data;
        return {
          url: `products/${id}`,
          method: "PATCH",
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          body: bodyData,
          formData: true,
        };
      },
      invalidatesTags: ["product"],
    }),

    getAllProducts: builder.query({
      query: () => {
        return {
          url: `products`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `products/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (data) => {
        const { id, token } = data;
        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
} = productsApiSlice;
