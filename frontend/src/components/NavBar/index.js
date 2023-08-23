import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      
      <Link to="/category">Home</Link>
      <br/>
      <Link to="/users/login">Login</Link>
      <br/>
      <Link to="/users/register">Register</Link>
      <br/>
      <Link to="/card">Card</Link>
      

    </div>
  );
};

export default NavBar;
