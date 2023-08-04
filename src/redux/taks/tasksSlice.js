import { apiSlice } from "../apiSlice";
const departmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),
  }),
});
export const { useGetTasksQuery } = departmentSlice;
