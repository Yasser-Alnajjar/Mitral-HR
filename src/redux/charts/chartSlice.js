import { apiSlice } from "../apiSlice";
const branchesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserChart: builder.query({
      query: () => "/usersChart",
    }),
  }),
});
export const { useGetUserChartQuery } = branchesSlice;
