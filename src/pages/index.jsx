import Input from "@/components/Forms/Input";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "@/components/Forms/ErrorMessage";
import { login } from "redux/slices/user-slice";
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import Head from "next/head";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { setDarkTheme, setDefaultTheme } from "redux/slices/theme-slice";

export default function Login() {
  const { theme, user } = useSelector((state) => state);
  const router = useRouter();
  const dispatch = useDispatch();
  let schema = object({
    email: string().trim().email().required(),
    password: string().trim().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    data && dispatch(login(data));

    // setTimeout(() => {
    //   if (user.user.status === "401") {
    //     toast.error(user.user.message);
    //   }
    //   if (user.user.status === "200") {
    //     toast.success(user.user.message);
    //     router.push("/dashboard");
    //   }
    // }, 1000);
  };
  const handleTheme = () => {
    if (theme.mode === "dark") {
      dispatch(setDefaultTheme());
    } else {
      dispatch(setDarkTheme());
    }
  };
  let backgrpundImg = {
    backgroundImage:
      theme.mode === "dark" ? "url(/darklogin.jpg)" : "url(/lightlogin.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return (
    <div
      className={`${theme.mode} mvh-100  d-flex align-items-center flex-column`}
      // style={backgrpundImg}
    >
      <Head>
        <title>Login</title>
      </Head>
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "right-top",
          style: {},
          className: `${
            theme.mode === "dark"
              ? "bg-gray-alt text-white"
              : "bg-white text-dark"
          } shadow`,
        }}
      />
      <div className="d-flex w-100">
        <Button
          className="ms-2 mt-3 "
          variant={theme.mode === "dark" ? "light" : "dark"}
          onClick={handleTheme}
        >
          {theme.mode === "dark" ? <FaRegSun /> : <FaRegMoon />}
        </Button>
      </div>
      <Container>
        <Row className="align-items-center">
          <Row className="justify-content-center pb-4">
            <Col md="6">
              <div
                className={`pt-4 text-center ${
                  theme.mode === "dark" ? "text-light" : "text-black"
                }`}
              >
                <span>
                  <h2>
                    <AiOutlineUser />
                  </h2>
                </span>
                <h4>Login</h4>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="6">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Input
                      label={"Email"}
                      register={register}
                      type={"email"}
                      typeInp="email"
                      styleInp={`${errors.email && "border-danger"} ${
                        theme.mode
                      }`}
                    />
                    <ErrorMessage errors={errors.email} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      label={"Password"}
                      register={register}
                      type={"password"}
                      typeInp="password"
                      styleInp={errors.password && "border-danger"}
                    />
                    <ErrorMessage errors={errors.password} />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col className="text-center mt-2">
                    <Button
                      type="submit"
                      disabled={
                        errors.email ? true : errors.password ? true : false
                      }
                      variant={
                        theme.mode === "dark" ? "outline-light" : "outline-dark"
                      }
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}
