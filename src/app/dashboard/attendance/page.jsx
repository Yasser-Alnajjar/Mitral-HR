"use client";
import { useGetAttendanceQuery } from "../../../redux/attendance/attendanceSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useGetSingleUserQuery } from "../../../redux/users/usersSlice";
import TableAttendance from "../../../components/tables/TableAttendance";
import LoadingComponent from "../../../components/LoadingComponent";
import AddAttend from "../../../components/forms/attendacne/AddAttend";
import Modal from "../../../components/apstracts/Modal";
export default function Attendance() {
  const {
    data: attendance,
    isLoadingComponent,
    isSuccess,
    isError,
    error,
  } = useGetAttendanceQuery();
  const [open, setOpen] = useState(false);
  const [attendId, setAttendId] = useState("");
  // const { data: user } = useGetSingleUserQuery(userId);
  let content;
  if (isLoadingComponent) {
    content = <LoadingComponent />;
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
