"use client";
import { useGetAttendanceQuery } from "../../../redux/attendance/attendanceSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useGetSingleUserQuery } from "../../../redux/users/usersSlice";
import TableAttendance from "../../../components/tables/TableAttendance";
import Loading from "../../../components/Loading";
export default function Attendance() {
  const {
    data: attendance,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAttendanceQuery();
  const [userId, setUserId] = useState(attendance?.userId);
  const { data: user } = useGetSingleUserQuery(userId);
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <section>
        <TableAttendance attendance={attendance} />
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
