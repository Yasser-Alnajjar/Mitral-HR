import { apiSlice } from "../apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Users", id })), "Users"]
          : ["Users"],
      transformResponse: (res) => res.sort((a, b) => a.id - b.id).reverse(),
    }),
    getSingleUser: builder.query({
      query: (id) => `/users/${id}`,
      invalidatesTags: ["Users"],
    }),
    getUsersOfDepartment: builder.query({
      query: (departmentName) => `/users?department=${departmentName}`,
      invalidatesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (initialUser) => ({
        url: `/users/`,
        method: "POST",
        body: { ...initialUser },
      }),
    }),
    updateUser: builder.mutation({
      query: (initialUser) => ({
        url: `/users/${initialUser.id}`,
        method: "PUT",
        body: { ...initialUser },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersOfDepartmentQuery,
  useAddUserMutation,
} = usersApiSlice;
