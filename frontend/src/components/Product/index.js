import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "react-js-loader";
import axios from "axios";
import "../Product/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
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
      .get(`${process.env.React_App_URL}/product/${id}/category`)
      .then((respones) => {
        setItem(respones.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const notify = () =>
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

  if (item.length == 0) {
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
      {/* <MDBContainer> */}
        {/* <MDBRow className="row-cols-3 row-cols-md-3 g-4"> */}
          <div className="responsve" >
          {item.map((produc, i) => {
            return (
              <div key={i}>
                <MDBCol size="md" className="h-100" >
                  <MDBCard className="h-100 w-75">
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
                        color="info"
                        onClick={() => {
                          {
                            token ? notify() : navigate("/users/login");
                          }
                          axios
                            .post(`${process.env.React_App_URL}/favorit`, {
                              product: produc._id,
                              user: userId,
                            })
                            .then((respones) => {
                              console.log(respones.data);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          setProductId(produc._id);
                          // navigate(`/favorit`)
                        }}
                      >
                        Add To Favorit
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </div>
            );
          })}
</div>
          <ToastContainer />
        {/* </MDBRow> */}
      {/* </MDBContainer> */}
      <div className="buttonProduct">
        <MDBBtn
          noRipple
          color="secondary"
          className="w-100"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </MDBBtn>
        <br />
        <MDBBtn
          noRipple
          color="secondary"
          className="w-100"
          onClick={() => {
            navigate("/card");
          }}
        >
          Go To Cart
        </MDBBtn>
      </div>
    </div>
  );
};

export default Product;
