import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
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
  const { token,cardId ,userId ,setOrderId ,total, setTotal }  = useContext(userContext);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
const [success , setSuccess]=useState("")

  useEffect(() => {
    axios
      .get("http://localhost:5000/card", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.card);
        
        setItem(response.data.card);
      })
      .catch((err) => {
        console.log(err.response.status);
        if(err.response.status){
          return localStorage.removeItem("token");
        }
      });
  }, []);
console.log(item);
const calculateTotal = (item) => {
  return item.product.price * item.quantity;
};

const grandTotal = item.reduce(
  (total, item) => total + calculateTotal(item),
  0
);
  setTotal(grandTotal)
  localStorage.setItem("total" , grandTotal)
console.log(grandTotal);
  if (!item) {
    return <h1>loding</h1>;
  }

 
  return (
    
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol md="10">
     <div className="d-flex justify-content-between align-items-center mb-4">
          <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
            Shopping Cart
          </MDBTypography>
          {/* <div>
            <p className="mb-0">
              <span className="text-muted">Sort by:</span>
              <a href="#!" className="text-body">
                price <i className="fas fa-angle-down mt-1"></i>
              </a>
            </p>
          </div> */}
        </div>
      {item.map((store, i) => {
return(
        

        <MDBCard className="rounded-3 mb-4">
          <MDBCardBody className="p-4">
            <MDBRow className="justify-content-between align-items-center">
              <MDBCol md="2" lg="2" xl="2">
                <MDBCardImage className="rounded-3" fluid
                  src={store.product.image}
                  alt="Cotton T-shirt"  onClick={() => {
                    navigate(`/productInfo/${store.product._id}`);
                  }} />
              </MDBCol>
              <MDBCol md="3" lg="3" xl="3">
                <p className="lead fw-normal mb-2" onClick={() => {
                    navigate(`/productInfo/${store.product._id}`);
                  }}>{store.product.name}</p>
                <p>
                  <span className="text-muted">Size:  {store.size}</span>
                  <span className="text-muted">Color:{store.color} </span>
                </p>
              </MDBCol>
              
              <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                <MDBTypography tag="h5" className="mb-0">
                {store.product.price} JD
                </MDBTypography>
              </MDBCol>
              <MDBCol md="1" lg="1" xl="1" className="text-end">
                <a href="#!" className="text-danger" >
                <MDBBtn noRipple className='me-1' color='danger' onClick={() => {
                axios
                  .delete(`http://localhost:5000/card/${store._id}`, {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  })
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
              }}>
        Delete
      </MDBBtn>
                  <MDBIcon fas icon="trash text-danger" size="lg"  />
                </a>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard> )})}

        <MDBCard className="mb-4">
          <MDBCardBody className="p-4 d-flex flex-row">
          
            <MDBInput label="Phone Number" wrapperClass="flex-fill" size="lg"  
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}/>
        
          <MDBInput label="Your Address" wrapperClass="flex-fill" size="lg"  
        onChange={(e) => {
          setAdress(e.target.value);
        }}/>
            <MDBBtn  noRipple className="ms-3" color="warning" outline size="lg" onClick={() => {
          console.log(cardId)
          axios
            .post("http://localhost:5000/order/", {
              user: userId,
              card :cardId,
              phoneNumber,
              address,
            })
            .then((response) => {
                setSuccess(response.data.message)
          setOrderId(response.data.order._id)
          
           localStorage.setItem("orderId" , response.data.order._id)
              
            })
            .catch((err) => {
              console.log(err);
            });
        }}>
              Apply
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        

        <MDBCard>
          <MDBCardBody>
          <h4>Total Cost : {total} JD</h4>
            <MDBBtn noRipple className="ms-3" color="warning" block size="lg" onClick={()=>{
        
        axios.put(`http://localhost:5000/card/${userId}/user`,{isOrderd:true},{
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((response)=>{
         console.log(response);

        }).catch((err)=>{
          console.log(err);
        })
          navigate("/order")
        }}>
              Order It ?
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>

  )











        // return (
        //   <div key={i}>
        //     <img
        //       src={store.product.image}
        //       width="100"
        //       height="100"
        //       onClick={() => {
        //         navigate(`/productInfo/${store.product._id}`);
        //       }}
        //     />
        //     <h3
        //       onClick={() => {
        //         navigate(`/productInfo/${store.product._id}`);
        //       }}
        //     >
        //       {store.product.name}
        //     </h3>
        //     <h3>Price :{store.product.price} JD</h3>
        //     <h3>color : {store.color}</h3>
        //     <h3>size : {store.size}</h3>

        //     <button
        //       onClick={() => {
        //         axios
        //           .delete(`http://localhost:5000/card/${store._id}`, {
        //             headers: {
        //               authorization: `Bearer ${token}`,
        //             },
        //           })
        //           .then((response) => {
        //             setItem(
        //               item.filter((product) => {
        //                 return product._id !== store._id;
        //               })
        //             );
        //           })
        //           .catch((err) => {
        //             console.log(err);
        //           });
        //       }}
        //     >
        //       Remove
        //     </button>
        //   </div>
        // );
      // )})}
       {/* <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Your Address"
        onChange={(e) => {
          setAdress(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(cardId)
          axios
            .post("http://localhost:5000/order/", {
              user: userId,
              card :cardId,
              phoneNumber,
              address,
            })
            .then((response) => {
                setSuccess(response.data.message)
          setOrderId(response.data.order._id)
          
           localStorage.setItem("orderId" , response.data.order._id)
              
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Submit
      </button> */}
      {/* <h4>{success}</h4>
      <button onClick={()=>{
        
      axios.put(`http://localhost:5000/card/${userId}/user`,{isOrderd:true},{
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response)=>{
       console.log(response);
//         const result = item.filter((card)=>{
//   console.log(card);
//   return card.isOrderd === "true"
// })
// setItem(result)
      }).catch((err)=>{
        console.log(err);
      })
        navigate("/order")
      }}>Order It?</button> */}
   
  
};

export default Card;
