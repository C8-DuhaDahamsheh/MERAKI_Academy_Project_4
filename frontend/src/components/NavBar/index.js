import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../NavBar/style.css"
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBCol, MDBFormInline
} from "mdb-react-ui-kit";

import { IconName } from "react-icons/di";
const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showBasic, setShowBasic] = useState(false);

  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <img
              src="https://dearguest.com/wp-content/uploads/2017/04/branding-750x430.jpg"
              height="70"
              alt=""
              loading="lazy"
            />
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/category">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/users/login">Login</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/users/register">Register</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/card">Cart</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/favorit">Favorit</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/order">Order</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/contactUs">ContactUs</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            
            <div className="search">
            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Type to search.."
                aria-label="Search"
                onChange={(e) => {
                  e.preventDefault()
                  setInput(e.target.value);
                }}
              />

              <MDBBtn  noRipple
                outline rounded className='mx-2' color='danger'
                onClick={(e) => {
                  e.preventDefault()
                  axios
                    .get(`http://localhost:5000/product?name=${input}`)
                    .then((response) => {
                      setSearch(response.data.product);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Search
              </MDBBtn>
              
            </form>
            {input ? (
       <div className="input">
         {search.map((name, i) => {
           return (
             <div key={i}>
               <p
                 onClick={() => {
                   navigate(`/productInfo/${name._id}`);
                 }}
               >
                 {name.name}
               </p>
             </div>
           );
         })}
       </div>
     ) : 
     null
     }
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

     
      
      {/* {input ? (
       <div className="input">
         {search.map((name, i) => {
           return (
             <div key={i}>
               <p
                 onClick={() => {
                   navigate(`/productInfo/${name._id}`);
                 }}
               >
                 {name.name}
               </p>
             </div>
           );
         })}
       </div>
     ) : 
     null
     } */}
      {/* <Link to="/category">Home</Link>
      <br />
      <Link to="/users/login">Login</Link>
      <br />
      <Link to="/users/register">Register</Link>
      <br />
      <Link to="/card">Card</Link> */}

      {/* <input
        type="Search"
        id="test"
        placeholder="Type to search.."
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      <button
        onClick={() => {
          axios
            .get(`http://localhost:5000/product?name=${input}`)
            .then((response) => {
              setSearch(response.data.product);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Search
      </button>  */}
      
    </div>
  );
};

export default NavBar;
