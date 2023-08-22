import "./App.css";
import React, { useState, createContext } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Category from "./components/Category";
import Product from "./components/Product";
import ProductInfo from "./components/ProductInfo";

export const userContext = createContext()
function App() {
const [categId , setCategId] = useState("")
const [info , setInfo] = useState([])
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <>slider</>
      <NavBar />
      <userContext.Provider value={{info , setInfo,setCategId,categId}}>
      <Routes>
        <Route path="/category" element={<Category />} />
        <Route path= "/product/:id" element={<Product/>}/>
        <Route path="/productInfo/:id" element={<ProductInfo/>}/>
      </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
