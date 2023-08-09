import { apiSlice } from "../apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getSlingleUser: builder.query({
      query: (id) => `/users/${id}`,
      invalidatesTags: ["User"],
    }),
    getUsersOfDepartment: builder.query({
      query: (id) => `/users?departmentId=${id}`,
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (initialUser) => ({
        url: `/users/${initialUser.id}`,
        method: "PUT",
        body: { ...initialUser },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSlingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersOfDepartmentQuery,
} = usersApiSlice;
