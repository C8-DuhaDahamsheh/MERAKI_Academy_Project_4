import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google'
import { decodeToken } from "react-jwt";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Register/style.css"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
const Register = () => {
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [google ,setGoogle] = useState ()
  const navigate = useNavigate();


  const notifySucc = () => toast.success({success}, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


    const notifyErr = () => toast.error({error}, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

  const responseMessage = (response) => {
    console.log(response);
    const a = decodeToken(response.credential)
    console.log(a);
    setGoogle(a)
};
const errorMessage = (error) => {
    console.log(error);
};
  return (
    <div className="registerPag">
      
      <MDBContainer  >
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                
                  <MDBBtn noRipple  outline onClick={() => {
                    axios
                      .post("http://localhost:5000/users/register", {
                        fname: google.given_name,
                        lname: google.family_name,
                        email :google.email,
                        password :google.sub,
                        age :google.iat,
                        country :google.jti,
                      })
                      .then((response) => {
                        
                        navigate("/users/login");
                        setSuccess(response.data.message);
                        notifySucc()
                      })
                      .catch((err) => {
                        console.log(err);
                        setError(err.response.data.err);
                        notifyErr()

                      });
                  }}><GoogleLogin onSuccess={responseMessage} onError={errorMessage} />Register With Google</MDBBtn>
                <br/>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="First Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      setFirstName(e.target.value );
                       
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Last Name"
                    id="form2"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      setLastName(e.target.value );
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Age"
                    id="form3"
                    type="number"
                    className="w-100"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Country"
                    id="form4"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form5"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form6"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your password"
                    id="form4"
                    type="password"
                  />
                </div> */}

                <div className="mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>

                <MDBBtn  noRipple
                  className="mb-4"
                  size="lg"
                  onClick={() => {
                    axios
                      .post("http://localhost:5000/users/register", {
                        fname : fName,
                        lname:lName,
                        email ,
                        password ,
                        age ,
                        country ,
                      })
                      .then((response) => {
                        setSuccess(response.data.message);
                        navigate("/users/login");
                        notifySucc()
                      })
                      .catch((err) => {
                        console.log(err);
                        setError(err.response.data.err);
                        notifyErr()
                      });
                  }}
                >
                  Register
                </MDBBtn>
                <h3>{success}</h3>
                <h3>{error}</h3>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <ToastContainer />
      </MDBContainer>
      {/* <input
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
      /> */}

      {/* <input
        type="number"
        placeholder="Age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      /> */}
      {/* <input
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
      /> */}

      {/* <button
        onClick={() => {
          axios
            .post("http://localhost:5000/users/register", {
              fname: fName,
              lname: lName,
              email,
              password,
              age,
              country,
            })
            .then((response) => {
              setSuccess(response.data.message);
              navigate("/users/login");
            })
            .catch((err) => {
              console.log(err);
              setError(err.response.data.err);
            });
        }}
      >
        Register
      </button> */}

      
    </div>
  );
};

export default Register;
