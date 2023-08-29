import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";
import "../ProductInfo/style.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

const ProductInfo = () => {
  const [itemInfo, setItemInfo] = useState(null);
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { token, setShow, setCardId, cardId, color, setColor, size, setSize } =
    useContext(userContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => {
        console.log(response.data.product);
        setItemInfo(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
                    outline
                    color="warning"
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
                    outline
                    color="warning"
                    onClick={() => {
                      setColor(colr);
                    }}
                  >
                    {colr}
                  </MDBBtn>
                );
              })}
              <MDBInput
                min={0}
                defaultValue={1}
                className="w-25"
                type="number"
                size="md"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </MDBCardBody>
            <MDBBtn
              noRipple
              outline
              className="mx-2"
              color="info"
              onClick={() => {
                {
                  token ? navigate(`/card`) : navigate("/users/login");
                }
                axios
                  .post(
                    "http://localhost:5000/card/",
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
                    console.log(respones.data);
                    setCardId([...cardId, respones.data.card._id]);
                    localStorage.setItem("cardId", respones.data.card._id);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              ADD TO BAG
            </MDBBtn>
            <MDBBtn
              noRipple
              outline
              className="mx-2"
              color="info"
              onClick={() => {
                {
                  token ? navigate(`/favorit`) : navigate("/users/login");
                }

                axios
                  .post(
                    "http://localhost:5000/card/",
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
                    console.log(respones.data);
                    setCardId([...cardId, respones.data.card._id]);
                    localStorage.setItem("cardId", respones.data.card._id);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              ADD TO FAVORIT
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCard>

      {/* <img src={itemInfo.image} width="350" height="350" />
        <div className="info">
          <h3>{itemInfo.name}</h3>
          <h3>Price :{itemInfo.price} JD</h3>
          <h3>Product Detail :</h3>
          <h3>{itemInfo.discreption}</h3>
          <h3>Size :</h3>
          {itemInfo.size.map((siz, i) => {
            return (
              <input
                key={i}
                value={siz}
                onClick={() => {
                  setSize(siz);
                }}
              />
            );
          })}
          <h3>Color :</h3>
          {itemInfo.color.map((colr, i) => {
            return (
              <input
                key={i}
                value={colr}
                onClick={() => {
                  setColor(colr);
                }}
              />
            );
          })}
          <br />
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
      </div>
      <br />
      <button
        onClick={() => {
          console.log(color);
          console.log(size);
          {
            token ? navigate(`/card`) : navigate("/users/login");
          }
          axios
            .post(
              "http://localhost:5000/card/",
              { product: itemInfo._id, quantity, isOrderd: false, color, size },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((respones) => {
              console.log(respones.data);
              setCardId([...cardId, respones.data.card._id]);
              localStorage.setItem("cardId", respones.data.card._id);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        ADD TO BAG
      </button>
      <button
        onClick={() => {
          {
            token ? navigate(`/favorit`) : navigate("/users/login");
          }

          axios
            .post(
              "http://localhost:5000/card/",
              { product: itemInfo._id, quantity, isOrderd: false, color, size },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((respones) => {
              console.log(respones.data);
              setCardId([...cardId, respones.data.card._id]);
              localStorage.setItem("cardId", respones.data.card._id);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        ADD TO FAVORIT
      </button> */}
    </div>
  );
};

export default ProductInfo;
