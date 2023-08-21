import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";


const ProductInfo = () => {
  const { info } = useContext(userContext);
    console.log(info);
  return <div>
      {info.map((pice, i) => {
        return (
          <div key={i}>
            <h3>{pice.name}</h3>
            <h3>{pice.price}</h3>
            <h3>Product Information : {pice.discreption}</h3>
            <h3>Color</h3>
            {pice.color.map((clr, i) => {
              return <div>
                
                <button>{clr}</button></div>
            })}
            <h3>Size</h3>
            {pice.size.map((siz, i) => {
              return <div>
                
                <button>{siz}</button></div>;
            })}
            <img src={pice.image} width="200" height="200" />
          </div>
        );
      })}
    </div>
  
  }

export default ProductInfo;
