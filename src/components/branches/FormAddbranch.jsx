import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Input from "../Forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import ErrorMessage from "../Forms/ErrorMessage";
import { useDispatch } from "react-redux";
import { addBranch, fetchBranch } from "../../redux/slices/barnches-slice";
import { toast, Toaster } from "react-hot-toast";
export default function FormAddbranch() {
  const dispatch = useDispatch();
  let schema = object({
    name: string().trim().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onSubmit = (data) => {
    dispatch(addBranch(data));
    setTimeout(() => {
      dispatch(fetchBranch());
    }, 200);
    reset();
  };
  const onError = () => {
    errors.name && toast.error(errors.name.message);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            typeInp={"text"}
            label={"Branch Name"}
            register={register}
            type="name"
          />
          <ErrorMessage errors={errors.name} />
          <Button variant="warning" className="mt-2" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </>
  );
}
