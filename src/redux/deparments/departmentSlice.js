import { apiSlice } from "../apiSlice";
const departmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Departments"],
      transformResponse: (departments) =>
        departments.sort((a, z) => z.id - a.id),
    }),
    getSlingleDepartment: builder.query({
      query: (id) => `/departments/${id}`,
      invalidatesTags: ["Departments"],
    }),

    addDepartment: builder.mutation({
      query: (payload) => ({
        url: "/departments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
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
  useGetSlingleDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentSlice;
