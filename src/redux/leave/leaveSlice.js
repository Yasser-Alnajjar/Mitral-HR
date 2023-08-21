import { apiSlice } from "../apiSlice";
const leaveSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: () => ({
        url: `/leaves`,
      }),
      providesTags: ["Leaves"],
    }),
    getSingleLeave: builder.query({
      query: (id) => `/leaves/${id}`,
      providesTags: ["Leaves"],
    }),
    addLeave: builder.mutation({
      query: (data) => ({
        url: "/leaves",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Leaves"],
    }),
    updateLeave: builder.mutation({
      query: (data) => ({
        url: `/leaves/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Leaves"],
    }),
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/leaves/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leaves"],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useGetSingleLeaveQuery,
  useAddLeaveMutation,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
} = leaveSlice;
