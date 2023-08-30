import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
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
        console.log(response.data.order);
        setCard(response.data.order.card);
        setOrder(response.data.order);
        setUsers(response.data.order.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* <h4>Your Address:</h4>
      <h4>{order.address}</h4>
      <h4>Your Phone Number :</h4>
      <h4>{order.phoneNumber}</h4>
      <h4>Costumer Name :</h4>
      <h4>
        {users.fname} {users.lname}
      </h4>
      <h4>{users.email}</h4>
      <h4>{users.country}</h4>
      <h4>{total}</h4>
      {card.map((product, i) => {
        return (
          <div key={i}>
            <h4>{product.product.name}</h4>
            <img src={product.product.image} width="70" height="70" />
          </div>
        );
      })}
      <button
        onClick={() => {
          axios
            .put(`http://localhost:5000/order/${orderId}`, {
              chekedOut: "Cheked Out",
            })
            .then((response) => {
              console.log(response.data);
              
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        ChekedOut?
      </button> */}

      <>
        <section className="vh-100" style={{ backgroundColor: "#35558a" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100 text-center">
              <MDBCol>
                <MDBBtn noRipple color="light" size="lg" onClick={toggleShow}>
                  <MDBIcon fas icon="info me-2" /> Get information
                </MDBBtn>
                <MDBModal
                  show={basicModal}
                  setShow={setBasicModal}
                  tabIndex="-1"
                >
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
                              <p className="fw-bold mb-0">
                                
                                Ether Chair({card.length})
                              </p>
                              <p className="text-muted mb-0">
                              {total} JD
                              </p>
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
                           {17 + 10 + (total)} JD
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
                              .put(`http://localhost:5000/order/${orderId}`, {
                                chekedOut: "Cheked Out",
                              })
                              .then((response) => {
                                console.log(response.data);
                                
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
        </section>
      </>

      {/* <button
        onClick={() => {
          axios
            .get(`http://localhost:5000/order/user/${userId}`)
            .then((response) => {
              console.log(response.data.order);
              setShow(true)
              setPrevioue(response.data.order) 
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        See Previous Order ?
      </button>
      {show ? <div>
      {previous.map((ordr,i)=>{
        
        return <div key={i}>
<h4>{ordr.address}</h4>
<h4>{ordr.phoneNumber}</h4>
<h4>{ordr.chekedOut}</h4>
<h4>{ordr.user.fname} {ordr.user.lname}</h4>
<h4>{ordr.user.country}</h4>
<h4>{ordr.user.email}</h4>
{ordr.card.map((crd,i)=>{
  console.log(crd.product);
  return <div key={i}>
    <h4>{crd.product.name}</h4>
    <img src={crd.product.image} width="70" height="70" />
  </div>

})}

 </div>
      })}</div>:<></>} */}
    </div>
  );
};

export default Order;
