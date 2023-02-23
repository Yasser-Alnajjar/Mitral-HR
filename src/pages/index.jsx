import Input from "@/components/Forms/Input";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "@/components/Forms/ErrorMessage";
import { login } from "redux/slices/user-slice";
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Head from "next/head";

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
    setTimeout(() => {
      if (user.user.status === "401") {
        toast.error(user.user.message);
      }
      if (user.user.status === "200") {
        toast.success(user.user.message);
        router.push("/dashboard");
      }
    }, 1000);
  };
  return (
    <div
      className={`${theme.mode} login position-fixed w-100 h-100 d-flex align-items-center justify-content-center`}
    >
      <Head>
        <title>Mitral HR /Login</title>
      </Head>
      <Container fluid>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className={`${styles.main_content} text-center shadow `}>
            <div className="pt-4">
              <span>
                <h2 className="text-black">
                  <AiOutlineUser />
                </h2>
              </span>
              <h4 className="text-black">Login</h4>
            </div>
            <Col className={styles.login_form}>
              <Container fluid>
                <Row>
                  <Form.Group>
                    <Row>
                      <Form.Control
                        {...register("email")}
                        type="email"
                        name="email"
                        className={styles.form__input}
                        placeholder="Email"
                      />
                      <ErrorMessage errors={errors.email} />
                    </Row>
                    <Row>
                      <input
                        type="password"
                        {...register("password")}
                        name="password"
                        className={styles.form__input}
                        placeholder="Password"
                      />
                      <ErrorMessage errors={errors.password} />
                    </Row>
                    <Row>
                      <input
                        type="submit"
                        value="Login"
                        className={styles.login_btn}
                      />
                    </Row>
                  </Form.Group>
                </Row>
              </Container>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
