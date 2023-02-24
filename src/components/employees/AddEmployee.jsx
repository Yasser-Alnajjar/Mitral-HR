import ErrorMessage from "@/components/Forms/ErrorMessage";
import Input from "@/components/Forms/Input";
import MainTitle from "@/components/Shared/MainTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
import { fetchBranch, fetchRoles } from "redux/slices/barnches-slice";
import { fetchDepartments } from "redux/slices/department-slice";
import { addEmployee } from "redux/slices/employees-slice";
import { number, object, string } from "yup";

export default function AddEmployee() {
  const { theme, departs, branches } = useSelector((state) => state);
  const dispatch = useDispatch();
  let schema = object({
    name: string().required(),
    password: string().required().min(6),
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    reset();
  };
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  const onError = (errors) => {
    errors.name && toast.error(errors.name.message);
    errors.email && toast.error(errors.email.message);
    errors.role && toast.error(errors.role.message);
    errors.address && toast.error(errors.address.message);
    errors.salary && toast.error(errors.salary.message);
    errors.phone && toast.error(errors.phone.message);
    errors.rate && toast.error(errors.rate.message);
    errors.department && toast.error(errors.department.message);
    errors.branch && toast.error(errors.branch.message);
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col md="6">
            <Input
              label={"Name"}
              register={register}
              type={"name"}
              typeInp="text"
              styleInp={errors.name && "border-danger"}
            />
            <ErrorMessage errors={errors.name} />
          </Col>
          <Col md="6">
            <Input
              label={"Email"}
              register={register}
              type={"email"}
              typeInp="email"
              styleInp={errors.email && "border-danger"}
            />
            <ErrorMessage errors={errors.email} />
          </Col>
          <Col md="6">
            <Input
              label={"Password"}
              register={register}
              type={"password"}
              typeInp="password"
              styleInp={errors.password && "border-danger"}
            />
            <ErrorMessage errors={errors.password} />
          </Col>
          <Col md="6">
            <Input
              label={"Address"}
              register={register}
              type={"address"}
              typeInp="text"
              styleInp={errors.address && "border-danger"}
            />
            <ErrorMessage errors={errors.address} />
          </Col>
          <Col md="6">
            <Input
              label={"Salary"}
              register={register}
              type={"salary"}
              typeInp="number"
              min={"0"}
              styleInp={errors.salary && "border-danger"}
            />
            <ErrorMessage errors={errors.salary} />
          </Col>
          <Col md="6">
            <Input
              label={"Phone"}
              register={register}
              type={"phone"}
              typeInp="number"
              min={0}
              styleInp={errors.phone && "border-danger"}
            />
            <ErrorMessage errors={errors.phone} />
          </Col>
          <Col md="6">
            <Input
              label={"Rate"}
              register={register}
              type={"rate"}
              typeInp="number"
              min={"0"}
              max={"5"}
              styleInp={errors.rate && "border-danger"}
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
            className="w-25"
          >
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
