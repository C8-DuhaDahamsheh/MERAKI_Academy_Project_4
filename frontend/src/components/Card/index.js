import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../App";
const Card = () => {
const {userId , productId}=useContext(userContext)
  const { id } = useParams();
  const [item, setItem] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/card")
  }, []);
  console.log(item);
  if (!item) {
    return <h1>loding</h1>;
  }
  return (
    <div>
      {item.map((store, i) => {
        return (
          <div key={i}>
            <img src={store.image} width="100" height="100" />
            <h3>{store.name}</h3>
            <h3>Price :{store.price}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
