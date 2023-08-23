import { apiSlice } from "../apiSlice";
const clientSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => `/clients`,
      providesTags: ["Clients"],
    }),
  }),
});
export const { useGetClientsQuery } = clientSlice;
