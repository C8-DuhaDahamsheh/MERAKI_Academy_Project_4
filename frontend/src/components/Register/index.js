import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <h3>Register</h3>

      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />

      <input
        type="number"
        placeholder="Age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Country"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />

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
            .post("http://localhost:5000/users/register", {
              fName,
              lName,
              email,
              password,
              age,
              country,
            })
            .then((response) => {
              setSuccess(response.data.message);
            }).catch((err)=>{
                console.log(err);
                setError(err.response.data.err)
            })
        }}
      >
        Register
      </button>

      <h3>{success}</h3>
      <h3>{error}</h3>
    </div>
  );
};

export default Register;
