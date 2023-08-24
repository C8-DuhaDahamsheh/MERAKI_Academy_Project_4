import "./App.css";
import React, { useState, createContext, useId } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Category from "./components/Category";
import Product from "./components/Product";
import ProductInfo from "./components/ProductInfo";
import Register from "./components/Register";
import Login from "./components/Login";
import Card from "./components/Card";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Order from "./components/Order";
export const userContext = createContext();
function App() {
  const tok = localStorage.getItem("token");
  const usrId = localStorage.getItem("userId");
  const ordrId = localStorage.getItem("orderId")
  const crdId = localStorage.getItem("cardId")
  const [categId, setCategId] = useState("");
  const [info, setInfo] = useState([]);
  const [token, setToken] = useState(tok || "");
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(usrId || "");
const[cardId , setCardId]=useState([])
const [orderId , setOrderId]=useState(ordrId||"")
const [ordered , setOrdered] = useState(false)

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      {/* <section className="slider container mb-3">
        　　　
        <Carousel>
          　　　
          <Carousel.Item className="slide">
            　　　
            <img
              className="d-block w-100" width="200"
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
        　　　
      </section> */}
      
      <NavBar />

      <userContext.Provider
        value={{
          info,
          setInfo,
          setCategId,
          categId,
          token,
          setToken,
          productId,
          setProductId,
          userId,
          setUserId,
          setShow,
          cardId,
          setCardId,
          orderId,
          setOrderId ,
          ordered,
          setOrdered
        }}
      >
        <Routes>
          <Route path="" element={<Category />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/card" element={<Card />} />
          <Route path="/order" element={<Order/>}/>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
