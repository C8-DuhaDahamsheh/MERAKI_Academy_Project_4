import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "../Card/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
const Card = () => {
  const { token, cardId, userId, setOrderId, total, setTotal } =
    useContext(userContext);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/card", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        

        setItem(response.data.card);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status) {
          return localStorage.removeItem("token");
        }
      });
  }, []);

  const calculateTotal = (item) => {
    return item.product.price * item.quantity;
  };

  const grandTotal = item.reduce(
    (total, item) => total + calculateTotal(item),
    0
  );
  setTotal(grandTotal);
  localStorage.setItem("total", grandTotal);
 

  const notifySucc = () =>
    toast.success("Order Created...", {
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
    toast.error("The Item Was Deleted...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  if (!item) {
    return <h1>loding</h1>;
  }

  return (
    <MDBContainer className="cart py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol md="10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
              Shopping Cart
            </MDBTypography>
          </div>
          {item.map((store, i) => {
            return (
              <MDBCard className="cardbody1 rounded-3 mb-4">
                <MDBCardBody className="p-4">
                  <MDBRow className="justify-content-between align-items-center">
                    <MDBCol md="2" lg="2" xl="2">
                      <MDBCardImage
                        className="rounded-3"
                        fluid
                        src={store.product.image}
                        alt="Cotton T-shirt"
                        onClick={() => {
                          navigate(`/productInfo/${store.product._id}`);
                        }}
                      />
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="3">
                      <p
                        className="lead fw-normal mb-2"
                        onClick={() => {
                          navigate(`/productInfo/${store.product._id}`);
                        }}
                      >
                        {store.product.name}
                      </p>
                      <p>
                        <span className="text-muted">Size: {store.size}</span>
                        <br />
                        <span className="text-muted">Color:{store.color} </span>
                      </p>
                    </MDBCol>

                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                      <MDBTypography tag="h5" className="mb-0">
                        {store.product.price} JD
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                      <a href="#!" className="text-danger">
                        <MDBBtn
                          noRipple
                          className="deleteButton me-1"
                          color="danger"
                          onClick={() => {
                            notifyErr();
                            axios
                              .delete(
                                `http://localhost:5000/card/${store._id}`,
                                {
                                  headers: {
                                    authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((response) => {
                                setItem(
                                  item.filter((product) => {
                                    return product._id !== store._id;
                                  })
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Delete
                        </MDBBtn>

                        <MDBIcon fas icon="trash text-danger" size="lg" />
                      </a>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            );
          })}

          <MDBCard className="mb-4">
            <MDBCardBody className="p-4 d-flex flex-row">
              <MDBInput
                label="Phone Number"
                wrapperClass="flex-fill"
                size="lg"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />

              <MDBInput
                label="Your Address"
                wrapperClass="flex-fill"
                size="lg"
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
              />
              <MDBBtn
                noRipple
                className="ms-3"
                color="info"
                outline
                size="lg"
                onClick={() => {
                 
                  notifySucc();
                  axios
                    .post("http://localhost:5000/order/", {
                      user: userId,
                      card: [...cardId],
                      phoneNumber,
                      address,
                      chekedOut: "Not Cheked Out",
                    })
                    .then((response) => {
                      setSuccess(response.data.message);
                      setOrderId(response.data.order._id);

                      localStorage.setItem("orderId", response.data.order._id);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Apply
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

          <MDBCard>
            <MDBCardBody>
              <h4>Total Cost : {total} JD</h4>
              <MDBBtn
                noRipple
                className="ms-3"
                color="primary"
                block
                size="lg"
                onClick={() => {
                  axios
                    .put(
                      `http://localhost:5000/card/${userId}/user`,
                      { isOrderd: true },
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                  navigate("/order");
                }}
              >
                Order It ?
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
          <ToastContainer />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Card;
