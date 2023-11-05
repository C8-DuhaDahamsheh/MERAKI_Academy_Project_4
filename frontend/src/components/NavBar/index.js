import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  MDBCollapse,
} from "mdb-react-ui-kit";

const NavBar = () => {
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
              src="\BRANDING STOR (2).png"
              height="80"
              width="100"
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
                      .get(`${process.env.React_App_URL}/product?name=${input}`)
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
    </div>
  );
};

export default NavBar;
