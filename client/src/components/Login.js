import axios from "axios";
import React, { useState, useCallback } from "react";

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
      setErr("");
    },
    [user]
  );

  const onSubmitRegister = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("1");
      try {
        const res = await axios.post("/users/register", {
          username: user.name,
          email: user.email,
          password: user.password,
        });
        setUser({ name: "", password: "", email: "" });
        setErr(res.data.msg);
      } catch (err) {
        err.response.data.message && setErr(err.response.data.message);
      }
    },
    [user]
  );
  const onSubmitLogin = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("2");
      try {
        const res = await axios.post("/users/login", {
          email: user.email,
          password: user.password,
        });
        setUser({ name: "", password: "", email: "" });
        localStorage.setItem("tokenStorage", res.data.token);
        setIsLogin(true);
      } catch (err) {
        err.response.data.message && setErr(err.response.data.message);
      }
    },
    [user]
  );
  return (
    <div>
      <section>
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={onSubmitLogin}>
            <input onChange={onChangeInput} type="email" name="email" required id="login-email" placeholder="Email" value={user.email} />
            <input
              onChange={onChangeInput}
              type="password"
              name="password"
              autoComplete="true"
              required
              id="login-password"
              placeholder="Password"
              value={user.password}
            />

            <button type="submit">Login</button>
            <p>
              You dont have account ?<span>Register Now</span>
            </p>
          </form>
        </div>
        <div className="register">
          <h2>Register</h2>
          <form onSubmit={onSubmitRegister}>
            <input type="name" name="name" required id="login-name" placeholder="Name" value={user.name} onChange={onChangeInput} />
            <input type="email" name="email" required id="login-email" placeholder="Email" value={user.email} onChange={onChangeInput} />
            <input
              type="password"
              name="password"
              required
              id="login-password"
              placeholder="Password"
              value={user.password}
              autoComplete="true"
              onChange={onChangeInput}
            />

            <button type="submit">Register</button>
            <p>
              You have an account ?<span>Login Now</span>
            </p>
          </form>
          <h3>{err}</h3>
        </div>
      </section>
    </div>
  );
};

export default Login;
