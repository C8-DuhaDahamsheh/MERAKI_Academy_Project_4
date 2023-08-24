import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
const Order = () => {
  const [order, setOrder] = useState([]);
  const {orderId}=useContext(userContext)
  useEffect(()=>{
    axios.get(`http://localhost:5000/order/${orderId}`).then((response)=>{
        console.log(response.data.order);

        setOrder(response.data.order)
    }).catch((err)=>{
console.log(err);
    })
  },[])
  if(!order){
    return <h4>hi</h4>
  }
  return (
    <div>
      <h4>hiiii</h4>
      <h4>ADDRESS :</h4>
      <h4>{order.address}</h4>
      <h4>PHONE NUMBER :</h4>
      <h4>{order.phoneNumber}</h4>
      {/* {order.card.map((crd,i)=>{
        return <div>
          <h4>{crd.product}</h4>
        </div>
      })} */}
       </div>
  );
};

export default Order;
