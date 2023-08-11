import { parse, sub } from "date-fns";
import { apiSlice } from "../apiSlice";
const holidaysSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHolidays: builder.query({
      query: () => `/holidays`,
      providesTags: ["Holidays"],
    }),
    getHoliday: builder.query({
      query: (id) => `/holidays/${id}`,
      providesTags: ["Holidays"],
    }),
    addHoliday: builder.mutation({
      query: (data) => ({
        url: `/holidays`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Holidays"],
    }),
    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Holidays"],
    }),
    updateHoliday: builder.mutation({
      query: (data) => ({
        url: `/holidays/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Holidays"],
    }),
  }),
});
export const {
  useGetHolidaysQuery,
  useGetHolidayQuery,
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useUpdateHolidayMutation,
} = holidaysSlice;
