import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Category/style.css";
import { userContext } from "../../App";
import Product from "../Product";
import Loader from "react-js-loader";
import Carousel from "react-bootstrap/Carousel";

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
    <div>
    <section className="slider container mb-3">
        　　　
    <Carousel>
      　　　
      <Carousel.Item className="slide">
        　　　
        <img
          className="d-block w-100"
          width="200"
          height="300"
          src="https://shopping.cmayds.com/themes/electro/image_hub/slider/shopping_slider_1.jpg"
          alt="First slide"
        />
        　　　
      </Carousel.Item>
      　　　
      <Carousel.Item className="slide">
        　　　
        <img
          className="d-block w-100"
          width="200"
          height="300"
          src="https://media.slidesgo.com/storage/75565/responsive-images/0-shopping-mall___media_library_original_1600_900.jpg"
          alt="Second slide"
        />
        　　　
      </Carousel.Item>
      　　　
      <Carousel.Item className="slide">
        　　
        <img
          width="200"
          height="300"
          className="d-block w-100"
          src="https://media.slidesgo.com/storage/34245341/responsive-images/0-shopping-center-infographics___media_library_original_1600_900.jpg"
          alt="Third slide"
        />
        　　　
      </Carousel.Item>
      　　　
    </Carousel>
    　　　
  </section>
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

            <img className="imag"
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
    </div>
  );
};

export default Category;
