import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../NavBar/style.css";
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
  MDBCol,
  MDBFormInline,
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
          <MDBNavbarBrand href="#" className="navbarImeg">
            <img
              src="https://png2.cleanpng.com/sh/37e89fda72e78474130b352436713d5c/L0KzQYm3V8A0N6p4jZH0aYP2gLBuTgBmeqR0htN1LXL1cbBrif5oNZN3edDtLX3kfrLuhf1mdqUyedZBZYL3ecTwjvcuaqZ4RadrM3O3RoG4gsdnOpU4RqQ5Nki6RoSAUcU0OGc8Tqk8N0e4Q4a1kP5o/kisspng-personal-branding-brand-management-advertising-bus-5b3c4601b7f2d3.2068763715306767377535.png "
              height="50"
              width="150"
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
                    e.preventDefault();
                    setInput(e.target.value);
                  }}
                />

                <MDBBtn
                  noRipple
                  outline
                  rounded
                  className="mx-2"
                  color="danger"
                  onClick={(e) => {
                    e.preventDefault();
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
              ) : null}
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
