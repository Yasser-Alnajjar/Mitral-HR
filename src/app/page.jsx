"use client";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCredentials } from "../redux/auth/authSlice";
import { useLoginMutation } from "../redux/auth/authApiSlice";
import { toast } from "react-hot-toast";
const Login = () => {
  const router = useRouter();
  const userRef = useRef();
  const [user, setUser] = useState("yasser@mail.com");
  const [password, setPassword] = useState("yasser123");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email: user, password }).unwrap();
      localStorage.setItem("token", password);
      dispatch(setCredentials({ ...userData }));
      toast.success("Login successfuly");
      setUser("");
      setPassword("");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.data);
    }
  };

  const handleUser = ({ target }) => setUser(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);
  let content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <h2 className="login_title">Login</h2>
      <form className="login_form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="login_form_input-email"
          value={user}
          onChange={handleUser}
          ref={userRef}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="login_form_input-password"
          value={password}
          onChange={handlePassword}
          required
        />
        <button type="submit" className="login_form_btn">
          Submit
        </button>
      </form>
    </section>
  );
  return content;
};

export default Login;
