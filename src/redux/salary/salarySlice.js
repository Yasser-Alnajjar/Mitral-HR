import { apiSlice } from "../apiSlice";

export const salarySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalaries: builder.query({
      query: () => `/api/salaries`,
      providesTags: ["Salary"],
    }),

    getSingleUserSalary: builder.query({
      query: (id) => ({
        url: `salary/${id}`,
      }),
      providesTags: ["Users"],
    }),
    deleteSalary: builder.mutation({
      query: (id) => ({
        url: `salary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Salary"],
    }),
    updateSalary: builder.mutation({
      query: (data) => ({
        url: `salary/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Salary"],
    }),
  }),
});
export const {
  useGetSalariesQuery,
  useGetSingleUserSalaryQuery,
  useDeleteSalaryMutation,
  useUpdateSalaryMutation,
} = salarySlice;
