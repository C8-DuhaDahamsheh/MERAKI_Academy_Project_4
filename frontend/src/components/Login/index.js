import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "../Login/style.css";
import { decodeToken } from "react-jwt";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const [succMssg, setSuccMssg] = useState("");
  const { setToken, setUserId, setShow } = useContext(userContext);
  const [google, setGoogle] = useState();

  const notifySucc = () =>
    toast.success("Login Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyErr = () =>
    toast.error(
      { errMssg },
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  const responseMessage = (response) => {
    
    const a = decodeToken(response.credential);
    setGoogle(a);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const navigate = useNavigate();
  return (
    <div className="loginPag">
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
              noRipple
              className="mb-4 w-100"
              size="lg"
              onClick={() => {
                notifySucc();
                axios
                  .post("http://localhost:5000/users/login", {
                    email,
                    password,
                  })
                  .then((response) => {
                   
                    setUserId(response.data.userId);
                    setSuccMssg(response.data.message);
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);

                    navigate("/category");
                  })
                  .catch((err) => {
                    console.log(err);
                    setErrMssg(err.response.data.message);
                    notifyErr();
                  });
              }}
            >
              Sign in
            </MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>
            <MDBBtn
              noRipple
              outline
              onClick={() => {
                notifySucc();
                axios
                  .post("http://localhost:5000/users/login", {
                    email: google.email,
                    password: google.sub,
                  })
                  .then((response) => {
                   
                    setUserId(response.data.userId);
                    setSuccMssg(response.data.message);
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    navigate("/category");
                  })
                  .catch((err) => {
                    console.log(err);
                    setSuccMssg(err.response.data.message);
                    notifyErr();
                  });
              }}
            >
              <GoogleLogin
                className="w-100"
                onSuccess={responseMessage}
                onError={errorMessage}
              />
              Login With Google
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <ToastContainer />
      </MDBContainer>
    </div>
  );
};

export default Login;
