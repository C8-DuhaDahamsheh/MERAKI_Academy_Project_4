import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
const Order = () => {
  const [order, setOrder] = useState([]);
  const [card, setCard] = useState([]);
  const [users, setUsers] = useState("");
  const { orderId, userId } = useContext(userContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/order/${orderId}`)
      .then((response) => {
        console.log(response.data.order);
        setCard(response.data.order.card);
        setOrder([...order,response.data.order]);
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
            .get(`http://localhost:5000/order/${userId}/user`, {
              chekedOut: "Cheked Out",
            })
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        See Previous Order ?
      </button>
    </div>
  );
};

export default Order;
