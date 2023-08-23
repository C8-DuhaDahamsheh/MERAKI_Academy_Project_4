import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
const Order = () => {
  const [order, setOrder] = useState([]);
  const {orderId}=useContext(userContext)
  useEffect(()=>{
    axios.get(`http://localhost:5000/order/${orderId}`).then((response)=>{
        console.log(response.data);
        setOrder(response.data.order.card)
    }).catch((err)=>{
console.log(err);
    })
  },[])
  return (
    <div>
    {order.map((card,i)=>{
        return <div>
            <h4>{card.name}</h4>
            <h4>{card.image}</h4>

        </div>
    })}
    </div>
  );
};

export default Order;
