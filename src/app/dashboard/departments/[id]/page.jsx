"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment_employees } from "../../../../redux/slices/department-slice";

export default function DepartmentDetails({ params }) {
  const { theme, departs } = useSelector((state) => state);
  const router = useRouter;
  const { id } = params;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartment_employees(id));
  }, [dispatch, id]);
  console.log(router.query);
  return (
    <Container>
      <Table variant={theme.mode}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departs.department_employee.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
              <td>{employee.salary}</td>
              <td>{employee.rate}</td>
              <td>
                <tr className="d-flex justify-content-center gap-2">
                  <Link href={""} className="cursor-p">
                    <AiOutlineEdit size={20} className="text-success" />
                  </Link>
                  <td
                    className="cursor-p"
                    onClick={() => handleClick(employee.id)}
                  >
                    <AiOutlineCloseCircle size={20} className="text-danger" />
                  </td>
                </tr>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
