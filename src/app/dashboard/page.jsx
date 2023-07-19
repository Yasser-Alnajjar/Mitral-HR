"use client";
import Status from "../../components/dashboard/Status";
// import SidebarFC, { Header, Nav } from "../../components/profile/sidebar";
// import Sidebar from "../../components/profile/sidebar";
// import Sidebarfc from "../../components/profile/sidebar";

import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import {
  AiOutlineCluster,
  AiOutlineStock,
  AiOutlineUngroup,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { FaAirFreshener, FaMoon, FaSun, FaToggleOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { fetchBranch } from "../../redux/slices/barnches-slice";
import { fetchDepartments } from "../../redux/slices/department-slice";
import { fetchEmployees } from "../../redux/slices/employees-slice";
import { fetchTasks } from "../../redux/slices/task-slice";

export default function RootLayout() {
  const { theme, branches, departs, employees, tasks, user } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranch());
    dispatch(fetchDepartments());
    dispatch(fetchEmployees());
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <>
      {/* <Container>
        <Row>
          <Col className="mb-3" lg="8">
            <Card
              className={`p-3 border-0 shadow  ${
                theme.mode === "dark" ? "bg-gray-alt " : "bg-white"
              }`}
            >
              <Row>
                <Col lg="4" className="mb-4">
                  <Status
                    title="Branches"
                    length={
                      branches.branches && branches.branches.length !== 0
                        ? branches.branches.length
                        : 0
                    }
                    icon={<AiOutlineCluster size={40} />}
                  />
                </Col>
                <Col lg="4" className="mb-4">
                  <Status
                    title="Departmentes"
                    length={
                      departs.departmentes.length !== 0
                        ? departs.departmentes.length
                        : 0
                    }
                    icon={<AiOutlineUngroup size={40} />}
                  />
                </Col>
                <Col className="mb-4">
                  <Status
                    title="Employees"
                    length={
                      employees.employees.length !== 0
                        ? employees.employees.length
                        : 0
                    }
                    icon={<AiOutlineUsergroupAdd size={40} />}
                  />
                </Col>
                <Col className="mb-4">
                  <Status
                    title="Tasks"
                    length={tasks.tasks.length !== 0 ? tasks.tasks.length : 0}
                    icon={<AiOutlineStock size={40} />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg="4" className="mb-4">
            <Card
              className={`p-3 border-0 shadow  ${
                theme.mode === "dark" ? "bg-gray-alt " : "bg-white"
              }`}
            >
              <Row>
                <Col sm="12" md="6">
                  <Card className={`p-3 text-center  shadow  ${theme.mode}`}>
                    <h5>Attend</h5>
                    <p>200</p>
                  </Card>
                </Col>
                <Col sm="12" md="6">
                  <Card className={`p-3 text-center  shadow  ${theme.mode}`}>
                    <h5>Attend</h5>
                    <p>200</p>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container> */}
      <div className="pt-5">
        <Container>
          <Row>
            <Col sm="12" md="3" className="mb-4">
              <Status
                title="Branches"
                length={
                  branches.branches && branches.branches.length !== 0
                    ? branches.branches.length
                    : 0
                }
                icon={<AiOutlineCluster size={40} />}
              />
            </Col>
            <Col sm="12" md="3" className="mb-4">
              <Status
                title="Departmentes"
                length={
                  departs.departmentes.length !== 0
                    ? departs.departmentes.length
                    : 0
                }
                icon={<AiOutlineUngroup size={40} />}
              />
            </Col>
            <Col sm="12" md="3" className="mb-4">
              <Status
                title="Employees"
                length={
                  employees.employees.length !== 0
                    ? employees.employees.length
                    : 0
                }
                icon={<AiOutlineUsergroupAdd size={40} />}
              />
            </Col>
            <Col sm="12" md="3" className="mb-4 transition">
              <Status
                title="Tasks"
                length={tasks.tasks.length !== 0 ? tasks.tasks.length : 0}
                icon={<AiOutlineStock size={40} />}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
