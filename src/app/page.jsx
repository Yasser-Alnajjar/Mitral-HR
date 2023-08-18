"use client";
import { useRouter } from "next/navigation";
import { setCredentials } from "../redux/auth/authSlice";
import { useLoginMutation } from "../redux/auth/authApiSlice";
import { toast } from "react-hot-toast";
import LoadingComponent from "../components/LoadingComponent";
import { useForm } from "react-hook-form";
import Input from "../components/forms/input";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    email: "yasser@mail.com",
    password: "yasser123",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoadingComponent }] = useLoginMutation();
  useEffect(() => {
    reset({
      email: "admin@gmail.com",
      password: "password",
    });
  }, [reset]);
  const onSubmit = async (data) => {
    try {
      login({ ...data })
        .unwrap()
        .then((userdata) => {
          toast.success("Login successfuly");
          localStorage.setItem("password", JSON.stringify(data.password));
          localStorage.setItem("user", JSON.stringify(data.email));
          dispatch(setCredentials(userdata));
          router.push("/dashboard");
          reset();
        })
        .catch((err) => {
          toast.error(err.data);
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  let content = (
    <section className="login">
      <h2 className="login_title">Login</h2>
      <div className="card p-lg mt-lg">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={"email"}
            register={register}
            error={errors.email}
            required={`Email is required`}
            type={"email"}
          />
          <Input
            label={"password"}
            register={register}
            error={errors.password}
            required={`Password is required`}
            type={"password"}
          />
          <button type="submit" className="btn btn-primary form-submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );

  return isLoadingComponent ? <LoadingComponent /> : content;
};

export default Login;
