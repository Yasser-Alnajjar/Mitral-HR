"use client";
import AddEmployee from "../../../components/employees/AddEmployee";
import Loading from "../../../components/Shared/Loading";
import MainTitle from "../../../components/Shared/MainTitle";
import Modals from "../../../components/Shared/Modals";
import Head from "next/head";
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
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  fetchEmployees,
} from "../../../redux/slices/employees-slice";
import Swal from "sweetalert2";
import Layout from "../../../components/Layout";

export const metadata = {
  title: "Employee",
};
export default function Employees() {
  const [modalShow, setModalShow] = useState(false);
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
      background: theme.mode === "dark" ? "#1a1a1a" : "#f6f7fc",
      color: theme.mode === "dark" ? "#f6f7fc" : "#1a1a1a",
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
    <Layout>
      <Container>
        {employees.loading && <Loading />}
        <MainTitle title={"Employees"} classes="my-3" />
        <div className="d-flex justify-content-end ">
          <Button
            variant={modalShow ? "danger" : "warning"}
            onClick={() => setModalShow(true)}
          >
            <AiOutlineUserAdd />
          </Button>
        </div>
        <Modals
          title="Add Employee"
          show={modalShow}
          onHide={() => setModalShow(false)}
          forms={<AddEmployee dispatchform={fetchEmployees} />}
        />
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
                    <td>{index + 1}</td>
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
                        {/* <td>
                        <Link
                          className="cursor-p"
                          href={`/dashboard/employees/${user.id}`}
                        >
                          <FaEdit size={20} />
                        </Link>
                      </td> */}
                        <td
                          className="cursor-p"
                          onClick={() => handleClick(user.id)}
                        >
                          <RiDeleteBin7Line size={20} />
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
    </Layout>
  );
}
