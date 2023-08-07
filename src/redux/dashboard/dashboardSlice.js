import { apiSlice } from "../apiSlice";

const dashboatdSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getAllDepartments: builder.query({
      query: () => "/departments",
    }),
    getAllBranches: builder.query({
      query: () => "/branches",
    }),
    getAllTasks: builder.query({
      query: () => "/tasks",
    }),
  }),
});
export const {
  useGetAllBranchesQuery,
  useGetAllDepartmentsQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
} = dashboatdSlice;
