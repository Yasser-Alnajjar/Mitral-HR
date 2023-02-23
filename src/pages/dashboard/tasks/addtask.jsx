import ErrorMessage from "@/components/Forms/ErrorMessage";
import Input from "@/components/Forms/Input";
import MainTitle from "@/components/Shared/MainTitle";
import { parseDateString } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "redux/slices/task-slice";
import { date, object, string } from "yup";

export default function AddTask() {
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
    // reset();
    console.log(data);
  };

  return (
    <div className="mvh-100">
      <MainTitle title={"Add Task"} />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="taskname"
            register={register}
            label={"Task Name"}
            placeholder={"Task Name"}
          />
          <ErrorMessage errors={errors.taskname} />
          <Input
            type="description"
            register={register}
            label={"Description"}
            placeholder={"Description"}
          />
          <ErrorMessage errors={errors.description} />
          <Input
            type="employee"
            register={register}
            label={"Employee"}
            placeholder={"Employee"}
          />
          <ErrorMessage errors={errors.employee} />

          <Form.Group className="mb-3" controlId="formBasic2">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              {...register("startDate")}
              type={"date"}
              placeholder={`Enter Start Date`}
            />
          </Form.Group>
          <ErrorMessage errors={errors.startDate} />
          <Form.Group className="mb-3" controlId="formBasic2">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              {...register("endDate")}
              type={"date"}
              placeholder={`Enter End Date`}
            />
          </Form.Group>
          <ErrorMessage errors={errors.endDate} />
          <Button variant="warning" className="mt-2" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </div>
  );
}
