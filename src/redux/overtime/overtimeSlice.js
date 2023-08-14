import { apiSlice } from "../apiSlice";
const overtimeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOvertimes: builder.query({
      query: () => "/overtime",
      providesTags: ["Overtime"],
    }),
    getOverTimeUser: builder.query({
      query: (id) => `overtime?userId${id}`,
      providesTags: ["Overtime"],
    }),
    addOverTime: builder.mutation({
      query: (data) => ({
        url: "/overtime",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Overtime"],
    }),
    updateOverTime: builder.mutation({
      query: (data) => ({
        url: "/overtime",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Overtime"],
    }),
    deleteOverTime: builder.mutation({
      query: (id) => ({
        url: `/overtime/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Overtime"],
    }),
  }),
});
export const {
  useGetOvertimesQuery,
  useAddOverTimeMutation,
  useDeleteOverTimeMutation,
  useUpdateOverTimeMutation,
} = overtimeSlice;
