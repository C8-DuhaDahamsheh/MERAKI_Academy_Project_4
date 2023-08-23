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
// import Carousel from 'react-bootstrap/Carousel';
export const userContext = createContext();
function App() {
  const tok = localStorage.getItem("token");
  const usrId = localStorage.getItem("userId");
  const [categId, setCategId] = useState("");
  const [info, setInfo] = useState([]);
  const [token, setToken] = useState(tok || "");
  const [productId, setProductId] = useState("");
const [show , setShow]=useState(false)
  const [userId, setUserId] = useState(usrId || "");
  const ProductList = [
    "Airsense Pleated Pants",
    "Men's Lakewashed Stretch Khakis, Natural Fit, Straight Leg",
    "Women's Ultrasoft Sweats, Straight-Leg",
    "Cotton Tee Shirt",
    "Cotton Twill Shirt",
    "Mock Neck Wool Collar",
    "Rainbow Rhinestone Hanging Earrings",
    "Pearl Ring",
    "Delicate Pearl Necklace",
    "Slim Flared Tailored Trousers",
    "BOURBON STREET BURGUNDY LINEN SUIT",
    "Newborn Infant Baby Girl Clothes Romper Shorts Set Floral Summer Outfits Cute Baby Clothes Girl",
    "Baby-Sets aussuchen",
    "Pink/White Floral Footless Baby Sleepsuits 4 Pack",
    "Casual Sneaker White Shoes For Girls And Women Sneakers For women (white)",
    "Bacca Bucci MAJESTY Running Shoes for Men",
  ];

  const [filteredList, setFilteredList] =useState(ProductList);

  const filterBySearch = (event) => {
    setShow(true)
    
  
    const query = event.target.value;
    
    let updatedList = [...ProductList];
   
    updatedList = updatedList.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  
    setFilteredList(updatedList);
  };

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      {/* <section className="slider container mb-3">
　　　        <Carousel>
　　　      <Carousel.Item className='slide'>
　　　        <img
　　　          className="d-block w-100"
　　　          src= "https://shopping.cmayds.com/themes/electro/image_hub/slider/shopping_slider_1.jpg"
　　　          alt="First slide"
　　　        />
　　　      </Carousel.Item>
　　　      <Carousel.Item className='slide'>
　　　        <img
　　　          className="d-block w-100"
　　　          src="https://media.slidesgo.com/storage/75565/responsive-images/0-shopping-mall___media_library_original_1600_900.jpg"
　　　          alt="Second slide"
　　　        />
　　　      </Carousel.Item>
　　　      <Carousel.Item className='slide'>
　　　        <img
　　　          className="d-block w-100"
　　　          src="https://media.slidesgo.com/storage/34245341/responsive-images/0-shopping-center-infographics___media_library_original_1600_900.jpg"
　　　          alt="Third slide"
　　　        />
　　　      </Carousel.Item>
　　　    </Carousel>
　　　    </section> */}
      <NavBar />
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={(e)=>{
          filterBySearch(e)
        }}/>
      </div>
      {show ? <div id="item-list">
        {filteredList.map((item , i)=>{
          return <div>
            
            <h4 key={i} onClick={()=>{

            }}>{item}</h4></div>
        })}
      </div>:<></>}
     
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
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
