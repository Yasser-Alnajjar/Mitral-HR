import { apiSlice } from "../apiSlice";
const apiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/login",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),
  }),
});
export const { useLoginMutation } = apiAuthSlice;
