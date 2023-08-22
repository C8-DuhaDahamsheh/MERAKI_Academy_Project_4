import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

const ProductInfo = () => {
 const [itemInfo , setItemInfo] = useState()
    
const {id}=useParams()
  useEffect(()=>{
    axios.get(`http://localhost:5000/product/${id}`).then((response)=>{
      
setItemInfo(response.data.product)
    }).catch((error)=>{
      console.log(error);
    })
  },[])


console.log(id);
console.log(itemInfo);

  return <div>
      
    </div>
  
  }

export default ProductInfo;
