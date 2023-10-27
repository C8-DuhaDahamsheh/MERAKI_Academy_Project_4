import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
import "../Order/style.css";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
const Order = () => {
  const [order, setOrder] = useState([]);
  const [card, setCard] = useState([]);
  const [users, setUsers] = useState("");
  const [previous, setPrevioue] = useState([]);
  const { orderId, userId, total } = useContext(userContext);
  const [show, setShow] = useState(false);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/order/${orderId}`)
      .then((response) => {
        
        setCard(response.data.order.card);
        setOrder(response.data.order);
        setUsers(response.data.order.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bigContainer">
      <MDBContainer className="storContainer">
        {card.map((store, i) => {
      
          return (
            <MDBCard className="orederCard  rounded-3 mb-4">
              <MDBCardBody className="p-4">
                <MDBRow className="justify-content-between align-items-center">
                  <MDBCol md="2" lg="2" xl="2">
                    <MDBCardImage
                      className="rounded-3"
                      fluid
                      src={store.product.image}
                      alt="Cotton T-shirt"
                      onClick={() => {}}
                    />
                  </MDBCol>
                  <MDBCol md="3" lg="3" xl="3">
                    <p className="lead fw-normal mb-2">{store.product.name}</p>
                    <p>
                      <span className="text-muted">Size: {store.size}</span>
                      <br />
                      <span className="text-muted">Color:{store.color} </span>
                      <br />
                    </p>
                  </MDBCol>

                  <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                    <MDBTypography tag="h5" className="mb-0">
                      {store.product.price} JD
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                    <MDBTypography tag="h5" className="mb-0">
                      ({store.quantity} piece)
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol md="1" lg="1" xl="1" className="text-end">
                    <a href="#!" className="text-danger">
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          );
        })}
      </MDBContainer>

      <MDBContainer className="py-5 h-50">
        <MDBRow className="justify-content-center align-items-center h-100 text-center">
          <MDBCol>
            <MDBBtn noRipple color="dark" size="lg" onClick={toggleShow}>
              <MDBIcon fas icon="info me-2" /> Get pay information
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader className="border-bottom-0">
                    <MDBBtn
                      noRipple
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody className="text-start text-black p-4">
                    <MDBTypography
                      tag="h5"
                      className="modal-title text-uppercase mb-5"
                      id="exampleModalLabel"
                    >
                      {users.fname} {users.lname}
                    </MDBTypography>
                    <MDBTypography
                      tag="h4"
                      className="mb-5"
                      style={{ color: "#35558a" }}
                    >
                      Thanks for your order
                    </MDBTypography>
                    <p className="mb-0" style={{ color: "#35558a" }}>
                      Payment summary
                    </p>
                    <hr
                      className="mt-2 mb-4"
                      style={{
                        height: "0",
                        backgroundColor: "transparent",
                        opacity: ".75",
                        borderTop: "2px dashed #9e9e9e",
                      }}
                    />
                    <div className="d-flex justify-content-between">
                      <p className="small mb-0">Your Address:</p>
                      <p className="small mb-0">{order.address}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="small mb-0">Your Phone Number :</p>
                      <p className="small mb-0">{order.phoneNumber}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="small mb-0">Your Email:</p>
                      <p className="small mb-0">{users.email}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="small mb-0">Your Country:</p>
                      <p className="small mb-0">{users.country}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="fw-bold mb-0">Ether Chair({card.length})</p>
                      <p className="text-muted mb-0">{total} JD</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="small mb-0">Shipping</p>
                      <p className="small mb-0">17.00 JD</p>
                    </div>

                    <div className="d-flex justify-content-between pb-1">
                      <p className="small">Tax</p>
                      <p className="small">10.00 JD</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="fw-bold">Total</p>
                      <p className="fw-bold" style={{ color: "#35558a" }}>
                        {17 + 10 + total} JD
                      </p>
                    </div>
                  </MDBModalBody>

                  <MDBModalFooter className="d-flex justify-content-center border-top-0 py-4">
                    <MDBBtn
                      noRipple
                      size="lg"
                      style={{ backgroundColor: "#35558a" }}
                      className="mb-1"
                      onClick={() => {
                        axios
                          .delete(`http://localhost:5000/order/${orderId}`)
                          .then((response) => {
                         
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      ChekedOut?
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Order;
