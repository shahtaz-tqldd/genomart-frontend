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
      invalidatesTags: ["product", "category"],
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
      invalidatesTags: ["product", "category"],
    }),

    getAllProducts: builder.query({
      query: ({ page, searchTerm, category, limit }) => {
        let url = "products";
        const queryParams = new URLSearchParams();

        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);
        if (category) queryParams.append("category", category);

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        return {
          url,
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
      invalidatesTags: ["product", "category"],
    }),

    getAllCategories: builder.query({
      query: () => {
        return {
          url: `products/categories`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["category"],
    }),

    addToWishlist: builder.mutation({
      query: ({ id, token, bodyData }) => {
        return {
          url: `products/wishlist/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["wishlist"],
    }),

    getMyWishList: builder.query({
      query: ({ token }) => {
        return {
          url: `products/wishlist/all`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["wishlist"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useAddToWishlistMutation,
  useGetMyWishListQuery,
} = productsApiSlice;
