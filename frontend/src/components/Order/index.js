import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
const Order = () => {
  const [order, setOrder] = useState([]);
  const [card, setCard] = useState([]);
  const [users, setUsers] = useState("");
  const [previous ,setPrevioue] =useState([])
  const { orderId, userId ,total } = useContext(userContext);
  const [show , setShow] =useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/order/${orderId}`)
      .then((response) => {
        // console.log(response.data.order);
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
      <h4>Your Address:</h4>
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
      </button>
      <button
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
      })}</div>:<></>}
    </div>
  );
};

export default Order;
