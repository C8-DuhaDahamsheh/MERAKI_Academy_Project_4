import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const [succMssg, setSuccMssg] = useState("");
  const { setToken, setUserId } = useContext(userContext);

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          axios
            .post("http://localhost:5000/users/login", { email, password })
            .then((response) => {
              console.log(response);
              setUserId(response.data._id);
              setSuccMssg(response.data.message);
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token);
            })
            .catch((err) => {
              setErrMssg(err.response.data.message);
            });
        }}
      >
        Login
      </button>

      <h2>{succMssg}</h2>
      <h2>{errMssg}</h2>
    </div>
  );
};

export default Login;
