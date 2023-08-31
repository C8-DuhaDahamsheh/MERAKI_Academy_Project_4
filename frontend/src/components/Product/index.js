import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";
import "../Product/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
const Product = () => {
  const {
    setInfo,
    token,
    setProductId,
    productId,
    userId,
    setShow,
    setCardId,
    cardId,
    size,
    color,
  } = useContext(userContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const [add, setAdd] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}/category`)
      .then((respones) => {
        setItem(respones.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const notify = () => toast.success("Add Successfully To Favorit", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


  if (item === undefined) {
    <div className={"item"}>
      <Loader
        type="bubble-loop"
        bgColor={"pink"}
        title={"bubble-loop"}
        color={"pink"}
        size={100}
      />
    </div>;
  }

  return (
    <div className="product">
      <MDBContainer>
        
        <MDBRow className="row-cols-3 row-cols-md-3 g-4">
        
          {item.map((produc, i) => {
            return (
              <div key={i}>
                <MDBCol size="md" className="h-100">
                  <MDBCard className="h-100 w-75">
                    {/* <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              > */}
                    <MDBCardImage
                      src={produc.image}
                      width="100"
                      height="200"
                      position="top"
                      onClick={() => {
                        setInfo(produc._id);
                        navigate(`/productInfo/${produc._id}`);
                      }}
                    />
                    <a>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                    {/* </MDBRipple> */}
                    <MDBCardBody>
                      <MDBCardTitle
                        className="title"
                        onClick={() => {
                          setInfo(produc._id);
                          navigate(`/productInfo/${produc._id}`);
                        }}
                      >
                        {produc.name}
                      </MDBCardTitle>
                      <MDBCardText className="price">
                        {produc.price} JD
                      </MDBCardText>
                      <MDBBtn
                        noRipple
                        color="success"
                        onClick={() => {
                          {
                            token
                              ? notify()
                              : navigate("/users/login");
                          }
                          axios.post("http://localhost:5000/favorit",{product:produc._id ,user:userId }).then((respones)=>{
                            console.log(respones.data);
                          }).catch((err)=>{
                            console.log(err);
                          })
                            setProductId(produc._id)
                            // navigate(`/favorit`)
                        }}
                      >
                        Add To Favorit
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                {/* <img className="imgForProduct"
              src={produc.image}
              width="200"
              height="200"
              onClick={() => {
                setInfo(produc._id);
                navigate(`/productInfo/${produc._id}`);
              }}
            />
            <h3  className="nameOfProduct"
              onClick={() => {
                setInfo(produc._id);
                navigate(`/productInfo/${produc._id}`);
              }}
            >
              {produc.name}
            </h3>
            <h3 className="priceOfProduct">{produc.price} JD</h3> */}
                {/* <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            /> */}
                {/* <button
              onClick={() => {
                // {
                //   token ? (
                //     <h4>add to bag successfully</h4>
                //   ) : (
                //     navigate("/users/login")
                //   );
                // }
                axios
                  .post(
                    "http://localhost:5000/card/",
                    { product: produc._id, quantity, isOrderd: false ,color ,size },
                    {
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((respones) => {
                    setCardId([...cardId, respones.data.card._id]);
                    localStorage.setItem("cardId", respones.data.card._id);
                    console.log(respones.data.card._id);
                    token ? navigate(`/favorit`) : navigate("/users/login");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              ADD TO Favorit
            </button> */}
              </div>
            );
          })}
          <ToastContainer />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Product;
