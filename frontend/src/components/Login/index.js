import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "../Login/style.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const [succMssg, setSuccMssg] = useState("");
  const { setToken, setUserId, setShow } = useContext(userContext);
const navigate =useNavigate()
  return (
    <div>
      <h1>Login</h1>
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              onClick={() => {
                axios
                  .post("http://localhost:5000/users/login", {
                    email,
                    password,
                  })
                  .then((response) => {
                    console.log(response.data.userId);
                    setUserId(response.data.userId);
                    setSuccMssg(response.data.message);
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    navigate("/category")
                  })
                  .catch((err) => {
                    console.log(err);
                    setErrMssg(err.response.data.message);
                  });
              }}
            >
              Sign in
            </MDBBtn>
            <h2>{succMssg}</h2>
            <h2>{errMssg}</h2>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}
            >
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with facebook
            </MDBBtn>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#55acee" }}
            >
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with twitter
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* {setShow(false)}
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
              console.log(response.data.userId);
              setUserId(response.data.userId);
              setSuccMssg(response.data.message);
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.userId);
            })
            .catch((err) => {
              console.log(err);
              setErrMssg(err.response.data.message);
            });
        }}
      >
        Login
      </button> */}

      {/* <h2>{succMssg}</h2>
      <h2>{errMssg}</h2> */}
    </div>
  );
};

export default Login;
