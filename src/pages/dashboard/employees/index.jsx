import AddEmployee from "@/components/employees/AddEmployee";
import Loading from "@/components/Shared/Loading";
import MainTitle from "@/components/Shared/MainTitle";
import Modals from "@/components/Shared/Modals";
import { URL_API2 } from "@/utils";
import { header } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Form,
  Table,
} from "react-bootstrap";
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
  const [modalShow, setModalShow] = useState(false);
  return (
    <Container>
      {employees.loading && <Loading />}
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Employee
      </Button>
      <Modals
        title="Add Employee"
        show={modalShow}
        onHide={() => setModalShow(false)}
        forms={<AddEmployee />}
      />

      <MainTitle title={"Employees"} classes="my-3" />
      <Card className={theme.mode + " shadow my-3"}>
        <Table responsive className={`text-center ${theme.mode}`} size="lg">
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.employees.map((user, index) => {
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
                  <td>{user.email}</td>
                  <td>{user.department}</td>
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
            })}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
