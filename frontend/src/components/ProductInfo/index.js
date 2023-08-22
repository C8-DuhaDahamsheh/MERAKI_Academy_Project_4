import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

const ProductInfo = () => {
  const [itemInfo, setItemInfo] = useState();
  const { info } = useContext(userContext);
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

  console.log(itemInfo);

  return (
    <div>
      {/* <img src={itemInfo.image} width="200" height="200" /> */}
      {/* <h3>{itemInfo.name}</h3>
      <h3>{itemInfo.price}</h3>
      <h3>{itemInfo.discreption}</h3> */}
    </div>
  );
};

export default ProductInfo;
