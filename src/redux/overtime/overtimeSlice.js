import { apiSlice } from "../apiSlice";
const overtimeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOvertimes: builder.query({
      query: () => "/overtime",
      providesTags: ["Overtime"],
    }),
    getSingleOvertime: builder.query({
      query: (id) => `/overtime/${id}`,
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
        url: `/overtime/${data.id}`,
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
  useGetSingleOvertimeQuery,
  useAddOverTimeMutation,
  useDeleteOverTimeMutation,
  useUpdateOverTimeMutation,
} = overtimeSlice;
