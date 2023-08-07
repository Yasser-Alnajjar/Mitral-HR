import { apiSlice } from "../apiSlice";
const branchesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: () => "/branches",
      providesTags: ["Branches"],
    }),
    getSlingleBranch: builder.query({
      query: (id) => `/branches/${id}`,
    }),
    updateBranch: builder.mutation({
      query: (payload) => ({
        url: `/branches/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Branches"],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branches"],
    }),
  }),
});
export const {
  useGetBranchesQuery,
  useGetSlingleBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchesSlice;
