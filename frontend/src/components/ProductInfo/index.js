import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";
import "../ProductInfo/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

const ProductInfo = () => {
  const [itemInfo, setItemInfo] = useState(null);
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  
  const {
    token,
    setShow,
    setCardId,
    cardId,
    color,
    setColor,
    size,
    setSize,
    userId,
  } = useContext(userContext);
  useEffect(() => {
    axios
      .get(`${process.env.React_App_URL}/product/${id}`)
      .then((response) => {
   
        setItemInfo(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const notifyFav = () =>
    toast.success("Add Successfully To Favorit", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyBag = () =>
    toast.success("Add Successfully To Bag", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  if (!itemInfo) {
    return (
      <div className="item">
        <Loader
          type="bubble-loop"
          bgColor={"pink"}
          title={"bubble-loop"}
          color={"pink"}
          size={100}
        />
      </div>
    );
  }
  return (
    <div>
      {/* <div className="productInfo"> */}
      <MDBCard className="productInfo">
        <MDBRow className="g-1">
          <MDBCol md="4">
            <MDBCardImage
              position="left"
              src={itemInfo.image}
              className="h-75 w-75"
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody className="info">
              <MDBCardTitle>{itemInfo.name}</MDBCardTitle>
              <MDBCardText>Price :{itemInfo.price} JD</MDBCardText>
              <MDBCardText>Product Detail :</MDBCardText>
              <MDBCardText>{itemInfo.discreption}</MDBCardText>
              <MDBCardText>Size :</MDBCardText>
              {itemInfo.size.map((siz, i) => {
                return (
                  <MDBBtn
                    noRipple
                    // outline
                    color="info"
                    onClick={() => {
                      setSize(siz);
                    }}
                  >
                    {siz}
                  </MDBBtn>
                );
              })}
              <MDBCardText>Color :</MDBCardText>
              {itemInfo.color.map((colr, i) => {
                return (
                  <MDBBtn
                    noRipple
                    // outline
                    color="info"
                    onClick={() => {
                      setColor(colr);
                    }}
                  >
                    {colr}
                  </MDBBtn>
                );
              })}
              <MDBCardText>Quantity :</MDBCardText>
              <MDBInput
                min={0}
                defaultValue={1}
                className="quantity w-25"
                type="number"
                size="md"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </MDBCardBody>
            <MDBBtn
              noRipple
              className="mx-2"
              color="primary"
              onClick={() => {
                {
                  token ? notifyBag() : navigate("/users/login");
                }
                axios
                  .post(
                    `${process.env.React_App_URL}/card/`,
                    {
                      product: itemInfo._id,
                      quantity,
                      isOrderd: false,
                      color,
                      size,
                    },
                    {
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((respones) => {
                    
                    setCardId([...cardId, respones.data.card._id]);
                    localStorage.setItem("cardId", [respones.data.card._id]);
                  })
                  .catch((err) => {
                    console.log(err);
                    if (err.response.status) {
                      return localStorage.removeItem("token");
                    }
                  });
              }}
            >
              ADD TO BAG
            </MDBBtn>
            <MDBBtn
              noRipple
              // outline
              className="mx-2"
              color="primary"
              onClick={() => {
                {
                  token ? notifyFav() : navigate("/users/login");
                }
                axios
                  .post(`${process.env.React_App_URL}/favorit`, {
                    product: itemInfo._id,
                    user: userId,
                  })
                  .then((respones) => {
                    console.log(respones.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                // navigate(`/favorit`);
              }}
            >
              ADD TO FAVORIT
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <MDBBtn
          noRipple
          // outline
          color="secondary"
          className="w-25"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </MDBBtn>
        <MDBBtn
          noRipple
          // outline
          color="secondary"
          className="w-25"
          onClick={() => {
            navigate("/card");
          }}
        >
          Go To Cart
        </MDBBtn>
      </MDBCard>
      <ToastContainer />
    </div>
  );
};

export default ProductInfo;
