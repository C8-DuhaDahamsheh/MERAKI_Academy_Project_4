import "./App.css";
import React, { useState, createContext } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import Category from "./components/Category"
function App() {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <>slider</>
      
      <Routes>
        <Route path="/" />
        <Route path="/" element={<Category/>}/>
      </Routes>
    </div>
  );
}

export default App;
