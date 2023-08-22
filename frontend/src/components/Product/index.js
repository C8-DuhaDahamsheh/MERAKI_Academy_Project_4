import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

const Product = () => {
  const { setInfo, token, setProductId, productId, userId } =
    useContext(userContext);
    const [quantity ,setQuantity]=useState("")
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const { id } = useParams();
  console.log(id);
  console.log(token);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}/category`)
      .then((respones) => {
        setItem(respones.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
     
      {item.map((produc, i) => {
        return (
          <div key={i}>
            <img
              src={produc.image}
              width="200"
              height="200"
              onClick={() => {
                setInfo(produc._id);
                navigate(`/productInfo/${produc._id}`);
              }}
            />
            <h3>{produc.name}</h3>
            <h3>{produc.price}</h3>
            <input type="number" placeholder="Quantity" onChange={(e)=>{
        setQuantity(e.target.value)
      }}/>
            <button
              onClick={() => {
                axios.post(
                  "http://localhost:5000/card/",
                  { product:produc._id,quantity},
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  }
                ).then((respones)=>{
                  console.log(respones.data);
                  
                    token
                      ? navigate(`/card`)
                      : navigate("/users/login");
                  
                }).catch((err)=>{
                  console.log(err);
                });
               
              }}
            >
              ADD TO BAG
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
