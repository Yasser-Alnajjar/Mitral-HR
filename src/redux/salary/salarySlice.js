import { apiSlice } from "../apiSlice";

export const salarySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalaries: builder.query({
      query: () => `/salary`,
      providesTags: ["Salary"],
      transformResponse: (res) => res.sort((a, b) => a.id - b.id).reverse(),
    }),
    getSingleSalary: builder.query({
      query: (id) => ({
        url: `salary/${id}`,
      }),
      providesTags: ["Users"],
    }),
    addSalary: builder.mutation({
      query: (data) => ({
        url: `salary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Salary"],
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
  useAddSalaryMutation,
  useGetSingleSalaryQuery,
  useDeleteSalaryMutation,
  useUpdateSalaryMutation,
} = salarySlice;
