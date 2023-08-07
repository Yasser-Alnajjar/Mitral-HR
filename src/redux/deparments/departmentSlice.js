import { apiSlice } from "../apiSlice";
const departmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),
    getSlingleDepartment: builder.query({
      query: (id) => `/departments/${id}`,
    }),
    updateDepartment: builder.mutation({
      query: (payload) => ({
        url: `/departments/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});
export const {
  useGetDepartmentsQuery,
  useDeleteDepartmentMutation,
  useGetSlingleDepartmentQuery,
  useUpdateDepartmentMutation,
} = departmentSlice;
