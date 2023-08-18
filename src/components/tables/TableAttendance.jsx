"use client";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function TableAttendance({ attendance }) {
  let day = attendance.map((attend) => (
    <tr key={attend.id}>
      <td>{attend.id}</td>
      <td className="capitalize">
        {attend.first_name} {attend.last_name}
      </td>
      {attend.days.map((day) => (
        <>
          <td>
            {day.attend ? (
              <AiOutlineCheck size={17} style={{ color: "green" }} />
            ) : (
              <AiOutlineClose size={17} style={{ color: "red" }} />
            )}
          </td>
        </>
      ))}
    </tr>
  ));
  let days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  let content;
  content = (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr>
            <th>#</th>
            <th>Name</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">{day}</tbody>
      </table>
    </div>
  );
  return content;
}
