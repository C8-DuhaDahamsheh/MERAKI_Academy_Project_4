import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
  MDBInputGroup
} from "mdb-react-ui-kit";
import { IconName } from "react-icons/di";
const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
const [search  ,setSearch]=useState([])
const navigate =useNavigate()
  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Navbar</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/category">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/card">Card</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/users/login">Login</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/users/register">Register</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  disabled
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  Disabled
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
          <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' onChange={(e)=>{
        
        axios.get(`http://localhost:5000/product?name=${e.target.value}`).then((response)=>{
          console.log(response.data.product);
          setSearch(response.data.product)
          {search ? <div>{search.map((name , i)=>{
            return <div key={i}><p onClick={()=>{
              navigate(`/productInfo/${name._id}`)
            }}>{name.name}</p></div>
          })}</div> :<></>}
        }).catch((err)=>{
          console.log(err);
        })
      }}/>
      {/* {search ? <div>{search.map((name , i)=>{
        return <div key={i}><p onClick={()=>{
          navigate(`/productInfo/${name._id}`)
        }}>{name.name}</p></div>
      })}</div> :<></>} */}
          <MDBBtn outline>Search</MDBBtn>
        </MDBInputGroup>
        </MDBContainer>
      </MDBNavbar>
      {/* <Link to="/category">Home</Link>
      <br />
      <Link to="/users/login">Login</Link>
      <br />
      <Link to="/users/register">Register</Link>
      <br />
      <Link to="/card">Card</Link> */}

{/* <input type="Search"
               id="test"
               placeholder="Type to search.." onChange={(e)=>{
        
        axios.get(`http://localhost:5000/product?name=${e.target.value}`).then((response)=>{
          console.log(response.data.product);
          setSearch(response.data.product)
        }).catch((err)=>{
          console.log(err);
        })
      }}/>
      {search ? <div>{search.map((name , i)=>{
        return <div key={i}><p onClick={()=>{
          navigate(`/productInfo/${name._id}`)
        }}>{name.name}</p></div>
      })}</div> :<></>}
      <button  onClick={()=>{
        axios.get("http://localhost:5000/product/").then((response)=>{
          console.log(response);
        }).catch((err)=>{
          console.log(err);
        })
      }}>Search</button> */}
    </div>
  );
};

export default NavBar;
