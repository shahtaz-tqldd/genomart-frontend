import { apiSlice } from "../api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: ({ token }) => {
        return {
          url: `dashboard/stats`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["stats"],
    }),

    createBanner: builder.mutation({
      query: (data) => {
        const { bodyData, token } = data;
        return {
          url: `dashboard/banner`,
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
      invalidatesTags: ["banner"],
    }),

    createInfo: builder.mutation({
      query: ({ bodyData, token }) => {
        return {
          url: `dashboard/settings`,
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
      invalidatesTags: ["settings"],
    }),

    addToSpecialOffer: builder.mutation({
      query: ({ bodyData, token }) => {
        return {
          url: `dashboard/special-offer`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["settings"],
    }),

    getSettingsInfo: builder.query({
      query: () => {
        return {
          url: `dashboard/settings`,
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["settings"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useCreateBannerMutation,
  useCreateInfoMutation,
  useGetSettingsInfoQuery,
  useAddToSpecialOfferMutation,
} = dashboardApiSlice;
