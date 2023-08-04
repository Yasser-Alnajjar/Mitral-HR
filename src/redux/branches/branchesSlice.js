import { apiSlice } from "../apiSlice";
const branchesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: () => "/branches",
    }),
  }),
});
export const { useGetBranchesQuery } = branchesSlice;
