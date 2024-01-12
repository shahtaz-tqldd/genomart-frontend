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
  }),
});

export const { useGetStatsQuery, useCreateBannerMutation } = dashboardApiSlice;
