import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";

const ProductInfo = () => {
  const [itemInfo, setItemInfo] = useState(null);
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { token, setShow, setCardId, cardId, color, setColor, size, setSize } =
    useContext(userContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => {
        console.log(response.data.product);
        setItemInfo(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!itemInfo) {
    return (
      <div className={"item"}>
        {setShow(false)}
        <Loader
          type="bubble-loop"
          bgColor={"pink"}
          title={"bubble-loop"}
          color={"pink"}
          size={100}
        />
      </div>
    );
  }
  return (
    <div>
      <img src={itemInfo.image} width="200" height="200" />
      <h3>{itemInfo.name}</h3>
      <h3>Price :{itemInfo.price} JD</h3>
      <h3>Product Detail :</h3>
      <h3>{itemInfo.discreption}</h3>
      <h3>Size :</h3>
      {itemInfo.size.map((siz, i) => {
        return (
          <input
            key={i}
            value={siz}
            onClick={() => {
              setSize(siz);
            }}
          />
        );
      })}
      <h3>Color :</h3>
      {itemInfo.color.map((colr, i) => {
        return (
          <input
            key={i}
            value={colr}
            onClick={() => {
              setColor(colr);
            }}
          />
        );
      })}
      <br />
      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          console.log(color);
          console.log(size);

          axios
            .post(
              "http://localhost:5000/card/",
              { product: itemInfo._id, quantity, isOrderd: false, color, size },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((respones) => {
              console.log(respones.data);
              setCardId([...cardId, respones.data.card._id]);
              localStorage.setItem("cardId", respones.data.card._id);
              token ? navigate(`/card`) : navigate("/users/login");
              
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
};

export default ProductInfo;
