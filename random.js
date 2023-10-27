import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Favorit/style.css"  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 const Favorit = () => {
    const { token,cardId ,userId ,setOrderId ,total, setTotal }  = useContext(userContext);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [success , setSuccess]=useState("")

  useEffect(() => {
    axios
      .get("http://localhost:5000/card", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.card);
        
        setItem(response.data.card);
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response.status){
          return localStorage.removeItem("token");
        }
      });
  }, []);

  const notifyErr = () => toast.error("The Item Was Deleted...", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


  if (!item) {
    return <h1>loding</h1>;
  }
  return (
    <div className="favoritItem" >
      <MDBContainer>
<MDBRow className='row-cols-3 row-cols-md-3 g-4'>
        {item.map((store, i) => {
return (
  <div key={i}  >
    
      <MDBCol size="md" className="h-100">
        <MDBCard className='h-100 w-75'>
          <MDBCardImage 
            src={store.product.image}
            width="100"
            height="200"
                        position='top'
            onClick={() => {
              navigate(`/productInfo/${store.product._id}`);
            }}
          />
          <MDBCardBody>
            <MDBCardTitle  onClick={() => {
        navigate(`/productInfo/${store.product._id}`);
      }}>{store.product.name}</MDBCardTitle>
            <MDBCardText>
            Price :{store.product.price} JD
            </MDBCardText>
            <MDBBtn noRipple className='mx-2' color='danger'
                  
                  onClick={() => {
                    notifyErr()
                    axios
                  .delete(`http://localhost:5000/card/${store._id}`, {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  })
                  .then((response) => {
                    setItem(
                      item.filter((product) => {
                        return product._id !== store._id;
                      })
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                  }}

                   
                >
                  Remove
                </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <ToastContainer />













    {/* <img
      src={store.product.image}
      width="100"
      height="100"
      onClick={() => {
        navigate(`/productInfo/${store.product._id}`);
      }}
    />
    <h3
      onClick={() => {
        navigate(`/productInfo/${store.product._id}`);
      }}
    >
      {store.product.name}
    </h3>
    <h3>Price :{store.product.price} JD</h3>
    <button
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/card/${store._id}`, {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  })
                  .then((response) => {
                    setItem(
                      item.filter((product) => {
                        return product._id !== store._id;
                      })
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Remove
            </button> */}
          </div>
        );
      })}
      </MDBRow>
</MDBContainer>
    </div>
    
  )
}

export default Favorit