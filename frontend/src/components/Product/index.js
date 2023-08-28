import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";
import "../Product/style.css"
const Product = () => {
  const {
    setInfo,
    token,
    setProductId,
    productId,
    userId,
    setShow,
    setCardId,
    cardId,
    size ,
    color
  } = useContext(userContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const { id } = useParams();

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

  if (item === undefined) {
    <div className={"item"}>
      <Loader
        type="bubble-loop"
        bgColor={"pink"}
        title={"bubble-loop"}
        color={"pink"}
        size={100}
      />
    </div>;
  }

  return (
    <div className="product">
      
      {item.map((produc, i) => {
        return (
          <div key={i} className="item">
            <img className="imgForProduct"
              src={produc.image}
              width="200"
              height="200"
              onClick={() => {
                setInfo(produc._id);
                navigate(`/productInfo/${produc._id}`);
              }}
            />
            <h3  className="nameOfProduct"
              onClick={() => {
                setInfo(produc._id);
                navigate(`/productInfo/${produc._id}`);
              }}
            >
              {produc.name}
            </h3>
            <h3 className="priceOfProduct">{produc.price} JD</h3>
            {/* <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            /> */}
            <button
              onClick={() => {
                // {
                //   token ? (
                //     <h4>add to bag successfully</h4>
                //   ) : (
                //     navigate("/users/login")
                //   );
                // }
                axios
                  .post(
                    "http://localhost:5000/card/",
                    { product: produc._id, quantity, isOrderd: false ,color ,size },
                    {
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((respones) => {
                    setCardId([...cardId, respones.data.card._id]);
                    localStorage.setItem("cardId", respones.data.card._id);
                    console.log(respones.data.card._id);
                    token ? navigate(`/favorit`) : navigate("/users/login");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              ADD TO Favorit
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
