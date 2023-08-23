import { apiSlice } from "../apiSlice";
const departmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
      providesTags: ["Tasks"],
    }),
    getSlingleTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});
export const {
  useGetTasksQuery,
  useGetSlingleTaskQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = departmentSlice;
