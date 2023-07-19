"use client";
import ErrorMessage from "../../components/Forms/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { number, object, string } from "yup";
import { fetchDepartments } from "../../redux/slices/department-slice";
import { fetchBranch, fetchRoles } from "../../redux/slices/barnches-slice";
import axios from "axios";
import Input from "../Forms/Input";
import { getUserData } from "../../redux/slices/user-slice";
import { header, user } from "../../utils/auth";
import { URL_API } from "../../utils";
export default function FormEditprofile({ id }) {
  const { theme, departs, branches } = useSelector((state) => state);

  const dispatch = useDispatch();
  let schema = object({
    name: string().required(),
    email: string().email("Email must be valid").required(),
    department: string().required(),
    branch: string().required(),
    role: string().required(),
    address: string().required(),
    salary: number("Salary must be Number")
      .required("Salary A Required Field")
      .positive(),
    phone: number().required("Phone A Required Field").positive(),
    rate: number().required("Rate A Required Field").positive().min(0).max(5),
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rate: user.user?.rate,
      phone: user.user?.phone,
      salary: user.user?.salary,
      address: user.user?.address,
      role: user.user?.role,
      branch: user.user?.branch,
      department: user.user?.department,
      email: user.user?.email,
      name: user.user?.name,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    updateEmployee(id, data);
  };
  const onError = (errors) => {
    errors.rate && toast.error(errors.rate.message);
    errors.phone && toast.error(errors.phone.message);
    errors.salary && toast.error(errors.salary.message);
    errors.address && toast.error(errors.address.message);
    errors.role && toast.error(errors.role.message);
    errors.branch && toast.error(errors.branch.message);
    errors.department && toast.error(errors.department.message);
    errors.name && toast.error(errors.name.message);
    errors.email && toast.error(errors.email.message);
  };
  const updateEmployee = async (id, payload) => {
    await axios.patch(`${URL_API}/employees/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
  };
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col md="6">
            <Input
              count={"1"}
              label={"Name"}
              register={register}
              type={"name"}
              error={errors.name}
              typeInp="text"
            />
            <ErrorMessage errors={errors.name} />
          </Col>
          <Col md="6">
            <Input
              count={"2"}
              label={"Email"}
              register={register}
              type={"email"}
              error={errors.email}
              typeInp="email"
            />
            <ErrorMessage errors={errors.email} />
          </Col>
          <Col md="6">
            <Input
              count={"3"}
              label={"Address"}
              register={register}
              type={"address"}
              error={errors.address}
              typeInp="text"
            />
            <ErrorMessage errors={errors.address} />
          </Col>
          <Col md="6">
            <Input
              count={"4"}
              label={"Salary"}
              register={register}
              type={"salary"}
              error={errors.salary}
              typeInp="number"
              min={"0"}
            />
            <ErrorMessage errors={errors.salary} />
          </Col>
          <Col md="6">
            <Input
              count={"5"}
              label={"Phone"}
              register={register}
              type={"phone"}
              error={errors.phone}
              typeInp="number"
              min={0}
            />
            <ErrorMessage errors={errors.phone} />
          </Col>
          <Col md="6">
            <Input
              count={"6"}
              label={"Rate"}
              register={register}
              type={"rate"}
              error={errors.rate}
              typeInp="number"
              min={"0"}
              max={"5"}
            />
            <ErrorMessage errors={errors.rate} />
          </Col>
          <Col md="6">
            <FloatingLabel controlId={`floatingInput9`} label={"Department"}>
              <Form.Select
                className={`mb-3 ${
                  theme.mode === "dark" ? "dark" : "light-revers"
                } ${errors.department && "border-danger"}`}
                {...register("department")}
              >
                <option></option>
                {departs.departmentes.map((item) => (
                  <>
                    <option value={item.name}>{item.name}</option>
                  </>
                ))}
              </Form.Select>
            </FloatingLabel>
            <ErrorMessage errors={errors.department} />
          </Col>
          <Col md="6">
            <FloatingLabel controlId={`floatingInput10`} label={"Branch"}>
              <Form.Select
                className={`mb-3 ${
                  theme.mode === "dark" ? "dark" : "light-revers"
                } ${errors.branch && "border-danger"}`}
                {...register("branch")}
              >
                <option></option>
                {branches.branches.map((item) => (
                  <>
                    <option value={item.name}>{item.name}</option>
                  </>
                ))}
              </Form.Select>
            </FloatingLabel>
            <ErrorMessage errors={errors.branch} />
          </Col>
          <Col md="6">
            <FloatingLabel controlId={`floatingInput11`} label={"Role"}>
              <Form.Select
                className={`mb-3 ${
                  theme.mode === "dark" ? "dark" : "light-revers"
                } ${errors.role && "border-danger"}`}
                {...register("role")}
              >
                <option></option>
                {branches.roles.map((item) => (
                  <>
                    <option value={item.role}>{item.role}</option>
                  </>
                ))}
              </Form.Select>
            </FloatingLabel>
            <ErrorMessage errors={errors.role} />
          </Col>
        </Row>
        <Row className="justify-content-center pt-3">
          <Button
            variant={theme.mode === "dark" ? "light" : "dark"}
            type="submit"
            error="submit"
            className="w-25"
          >
            Save
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
