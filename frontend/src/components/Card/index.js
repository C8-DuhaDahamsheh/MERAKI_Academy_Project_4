import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
const Card = () => {
  const { token } = useContext(userContext);
  
  const [item, setItem] = useState([]);
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
        console.log(err);
      });
  }, []);
  
  if (!item) {
    return <h1>loding</h1>;
  }
  return (
    <div>
      {item.map((store, i) => {

        return (
          <div key={i}>
            <img src={store.product.image} width="100" height="100" />
            <h3>{store.product.name}</h3>
            <h3>Price :{store.product.price}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
