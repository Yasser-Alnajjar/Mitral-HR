import Loading from "@/components/Shared/Loading";
import { URL_API2 } from "@/utils";
import { header } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Card, Container, Dropdown, Form, Table } from "react-bootstrap";
import {
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "redux/slices/employees-slice";
import Swal from "sweetalert2";

export default function Employees() {
  const { theme, employees } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployees());
    // fetch(`${URL_API2}/employees`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: header,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }, [dispatch]);

  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this, employee will be deleted !!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(id));
        setTimeout(() => {
          dispatch(fetchEmployees());
        }, 200);
      }
    });
  };
  return (
    <Container>
      {employees.loading && <Loading />}
      <Card className={theme.mode + "shadow my-3"}>
        <Table responsive className={`${theme.mode} text-center`} size="lg">
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Age</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {employees.employees.map((user, index) => {
              return (
                   <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <Image
                        loader={() =>
                          " https://robohash.org/perferendisideveniet.png"
                        }
                        src="https://robohash.org/perferendisideveniet.png"
                        height={30}
                        alt={user.name}
                        width={30}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.department.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.salary}</td>
                    <td>{user.rate}</td>
                  <td>
                    <tr className="d-flex justify-content-center gap-2">
                      <Link
                        className="cursor-p"
                        href={`profile/editprofile/${user.id}`}
                      >
                        <AiOutlineEdit size={20} className="text-success" />
                      </Link>
                      <Link
                        className="cursor-p"
                        href={`profile/editprofile/${user.id}`}
                      >
                        <AiOutlineEye size={20} className="text-info" />
                      </Link>
                      <td
                        className="cursor-p"
                        onClick={() => handleClick(user.id)}
                      >
                        <AiOutlineCloseCircle
                          size={20}
                          className="text-danger"
                        />
                      </td>
                    </tr>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
