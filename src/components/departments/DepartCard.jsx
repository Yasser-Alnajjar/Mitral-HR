import Link from "next/link";
import { URL_API } from "@/utils";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AiOutlineUngroup } from "react-icons/ai";
import {
  deleteDepartment,
  fetchDepartments,
} from "redux/slices/department-slice";
export default function DepartCard({ cardStyle, name, icon, id }) {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  let iconStyle = {
    left: "50%",
    transform: " translateX(50%)",
    top: "4px",
    fontSize: "50px",
  };
  console.log("name", name);
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure !",
      text: "After This step department is will deleted",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      background: theme.mode === "dark" ? "#1a1a1a" : "#f6f7fc",
      color: theme.mode === "dark" ? "#f6f7fc" : "#1a1a1a",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDepartment(id));
        setTimeout(() => {
          dispatch(fetchDepartments());
        }, 200);
      }
    });
  };
  return (
    <Card
      className={` border-0 shadow  ${
        theme.mode === "dark" ? "bg-gray-alt " : "bg-white"
      }`}
      style={cardStyle}
    >
      <Card.Body className="d-flex justify-content-around">
        <div>
          <Card.Title className="py-2">{name}</Card.Title>
        </div>
        <Card.Text style={iconStyle}>
          <AiOutlineUngroup style={{ color: "rgba(0,0,0,.30)" }} />
        </Card.Text>
      </Card.Body>
      <div className="d-flex py-3 justify-content-center gap-2">
        <Link
          className="text-purple cursor-p"
          href={`/dashboard/departments/${id}`}
        >
          More info
        </Link>
        <span className="text-danger cursor-p" onClick={handleClick}>
          Delete
        </span>
      </div>
    </Card>
  );
}
