import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";

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
    <div>
      {setShow(false)}
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
            <h3
              onClick={() => {
                setInfo(produc._id);
                navigate(`/productInfo/${produc._id}`);
              }}
            >
              {produc.name}
            </h3>
            <h3>{produc.price}</h3>
            {/* <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            /> */}
            <button
              onClick={() => {
                {
                  token ? (
                    <h4>add to bag successfully</h4>
                  ) : (
                    navigate("/users/login")
                  );
                }
                axios
                  .post(
                    "http://localhost:5000/card/",
                    { product: produc._id, quantity, isOrderd: false },
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
                  })
                  .catch((err) => {
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
