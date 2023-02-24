import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Input from "../Forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addDepartment, fetchDepartments } from "redux/slices/department-slice";
import ErrorMessage from "../Forms/ErrorMessage";
export default function AddDepartment({ open, setOpen }) {
  const dispatch = useDispatch();
  let schema = object({
    name: string().trim().required(),
  });
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onSubmit = (data) => {
    dispatch(addDepartment(data));
    data && setOpen(false);
    setTimeout(() => {
      dispatch(fetchDepartments());
    }, 200);
    reset();
  };

  const onError = () => {
    errors.name && toast.error(errors.name.message);
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input
          type="name"
          register={register}
          label={"Department Name"}
          styleInp={errors.name && "border-danger"}
        />
        <ErrorMessage errors={errors.name} />
        <Button variant="warning" className="mt-2" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
}
