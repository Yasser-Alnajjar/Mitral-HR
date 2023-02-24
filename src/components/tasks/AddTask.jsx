import ErrorMessage from "@/components/Forms/ErrorMessage";
import Input from "@/components/Forms/Input";
import MainTitle from "@/components/Shared/MainTitle";
import { parseDateString } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "redux/slices/task-slice";
import { date, object, string } from "yup";

export default function AddTask() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  let schema = object({
    taskname: string().trim().required(),
    description: string().trim().required(),
    employee: string().trim().required(),
    startDate: string().required(),
    endDate: string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(addTask(data));
    reset();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="taskname"
          register={register}
          label={"Task Name"}
          placeholder={"Task Name"}
          error={errors.taskname}
        />
        <ErrorMessage errors={errors.taskname} />
        <Input
          type="description"
          register={register}
          label={"Description"}
          placeholder={"Description"}
          error={errors.description}
        />
        <ErrorMessage errors={errors.description} />
        <Input
          type="employee"
          register={register}
          label={"Employee"}
          placeholder={"Employee"}
          error={errors.employee}
        />
        <ErrorMessage errors={errors.employee} />
        <FloatingLabel controlId={`floatingInput4`} label={"Start Date"}>
          <Form.Control
            className={`mb-3 ${theme.mode} ${
              errors.startDate && "border-danger"
            }`}
            {...register("startDate")}
            type={"date"}
            placeholder={`Enter Start Date`}
          />
        </FloatingLabel>
        <ErrorMessage errors={errors.startDate} />
        <FloatingLabel controlId={`floatingInput4`} label={"End Date"}>
          <Form.Control
            className={`mb-3 ${theme.mode} ${
              errors.endDate && "border-danger"
            }`}
            {...register("endDate")}
            type={"date"}
            placeholder={`Enter End Date`}
          />
          <ErrorMessage errors={errors.endDate} />
        </FloatingLabel>
        <Button variant="warning" className="mt-2" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
}
