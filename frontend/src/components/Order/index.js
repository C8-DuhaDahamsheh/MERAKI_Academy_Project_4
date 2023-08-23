import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
const Order = () => {
  const [order, setOrder] = useState([]);
  
  useEffect(()=>{
    axios.get(`http://localhost:5000/order/:id`)
  },[])
  return (
    <div>
    
    </div>
  );
};

export default Order;
