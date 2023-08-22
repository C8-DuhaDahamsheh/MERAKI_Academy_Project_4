import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const ProductInfo = () => {
  const [itemInfo, setItemInfo] = useState(null);

  const { id } = useParams();
  console.log(id);

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
  }, []);

  if (!itemInfo) {
    return <h1>loding</h1>;
  }
  return (
    <div>
      <img src={itemInfo.image} width="200" height="200" />
      <h3>{itemInfo.name}</h3>
      <h3>Price :{itemInfo.price}</h3>
      <h3>Product Detail :</h3>
      <h3>{itemInfo.discreption}</h3>
      <h3>Size :</h3>
      {itemInfo.size.map((siz, i) => {
        return <button>{siz}</button>;
      })}
      <h3>Color :</h3>
      {itemInfo.color.map((colr, i) => {
        return <button>{colr}</button>;
      })}
      <br/>
      <button>ADD TO BAG</button>
    </div>
  );
};

export default ProductInfo;
