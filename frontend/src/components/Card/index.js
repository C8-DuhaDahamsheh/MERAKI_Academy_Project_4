import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Card = () => {
  const { token ,setShow ,setCardId ,cardId ,userId ,setOrderId }  = useContext(userContext);
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
        console.log(response.data);
        
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
            <img
              src={store.product.image}
              width="100"
              height="100"
              onClick={() => {
                navigate(`/productInfo/${store.product._id}`);
              }}
            />
            <h3
              onClick={() => {
                navigate(`/productInfo/${store.product._id}`);
              }}
            >
              {store.product.name}
            </h3>
            <h3>Price :{store.product.price}</h3>
            <button
              onClick={() => {
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
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
       <input
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
      </button>
      <h4>{success}</h4>
      <button onClick={()=>{
        navigate("/order")
      }}>Order It?</button>
    </div>
  );
};

export default Card;
