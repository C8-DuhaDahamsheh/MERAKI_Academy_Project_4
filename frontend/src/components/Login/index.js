import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(userContext);

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
      <button onClick={async()=>{
        try {
            axios.post("http://localhost:5000/users/login", { email, password })
        } catch (error) {
            
        }
      }}>Login</button>
    </div>
  );
};

export default Login;
