import { apiSlice } from "../apiSlice";
const departmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",
    }),
  }),
});
export const { useGetDepartmentsQuery } = departmentSlice;
