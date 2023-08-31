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
import Order from "./components/Order";
import Favorit from "./components/Favorit";
import ContactUs from "./components/ContactUs";

export const userContext = createContext();
function App() {
  const navigate = useNavigate();
  const tok = localStorage.getItem("token");
  const usrId = localStorage.getItem("userId");
  const ordrId = localStorage.getItem("orderId");
  const crdId = localStorage.getItem("cardId");
  const totalCost =localStorage.getItem("total")
  const [categId, setCategId] = useState("");
  const [info, setInfo] = useState([]);
  const [token, setToken] = useState(tok || "");
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(usrId || "");
  const [cardId, setCardId] = useState([]);
  const [orderId, setOrderId] = useState(ordrId || "");
  const [ordered, setOrdered] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [total, setTotal] = useState(totalCost||0);

  console.log(productId);
console.log(cardId); 

  return (
    <div className="App">
      
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
          setOrderId,
          ordered,
          setOrdered,
          color,
          setColor,
          size,
          setSize,
          total,
          setTotal,
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
          <Route path="/favorit" element={<Favorit/>}/>
          <Route path="/order" element={<Order />} />
          <Route path="/contactUs" element={<ContactUs/>}/>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
