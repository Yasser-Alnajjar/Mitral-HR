import { apiSlice } from "../apiSlice";
const attendanceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query({
      query: (params) => ({
        url: `/attendance`,
      }),
      providesTags: ["Attendance"],
    }),
  }),
});

export const { useGetAttendanceQuery } = attendanceSlice;
