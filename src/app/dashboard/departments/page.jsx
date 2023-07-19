"use client";
import AddDepartment from "../../../components/departments/addDepartment";
import DepartCard from "../../../components/departments/DepartCard";
import DepartCardOver from "../../../components/departments/DepartCardOver";

import Loading from "../../../components/Shared/Loading";
import Modals from "../../../components/Shared/Modals";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../../redux/slices/department-slice";
export const metadata = {
  title: "Departments",
};
export default function Departments() {
  const { theme, departs } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  return (
    <div className={`${theme.mode}`}>
      {departs.loading && <Loading />}
      <Container>
        <Modals
          title="Add Department"
          show={open}
          onHide={() => setOpen(!open)}
          forms={<AddDepartment open={open} setOpen={setOpen} />}
        />
        <div className="d-flex align-items-center justify-content-end">
          <Button
            variant={!open ? "warning" : "danger"}
            className="d-flex align-items-center gap-1"
            onClick={() => setOpen(!open)}
          >
            <AiOutlineFolderAdd size={22} />
          </Button>
        </div>
        <Row className="py-5">
          {departs?.departmentes?.map((depart) => {
            return (
              <Col md="3" className="mb-4" key={depart.id}>
                <DepartCard name={depart.name} id={depart.id} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
