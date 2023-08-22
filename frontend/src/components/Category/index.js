import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Category/style.css";
import { userContext } from "../../App";
import Product from "../Product";
import Loader from "react-js-loader";

const Category = () => {
  const [categ, setCateg] = useState(null);
  const { setCategId } = useContext(userContext);
  const navigate = useNavigate();
  const getAllCategory = () => {
    axios
      .get("http://localhost:5000/category")
      .then((respones) => {
        setCateg(respones.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  if (!categ) {
    return (
      <div className={"item"}>
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
    <div className="collection">
      {categ.map((collction, i) => {
        return (
          <div key={i} className="category">
            <h2
              onClick={() => {
                {
                  setCategId(collction._id);
                }
                navigate(`/product/${collction._id}`);
              }}
            >
              {collction.name}
            </h2>

            <img
              src={collction.imag}
              width="200"
              height="200"
              onClick={() => {
                {
                  setCategId(collction._id);
                }

                navigate(`/product/${collction._id}`);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Category;
