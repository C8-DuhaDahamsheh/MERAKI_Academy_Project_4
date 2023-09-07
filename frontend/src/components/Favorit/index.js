import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";
import Loader from "react-js-loader";
import "../Favorit/style.css";
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

const Favorit = () => {
  const { userId } = useContext(userContext);
  const [itemInfo, setItemInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/favorit/user/${userId}`)
      .then((response) => {
        console.log(response.data.product);
        setItemInfo(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notifyFav = () =>
    toast.error(" Item Removed From Favorit", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  console.log(itemInfo);

  if (itemInfo.length === 0) {
    return (
      <div className={"item"}>
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
    <div className="favo">
      <MDBContainer>
        <MDBRow className="row-cols-3 row-cols-md-3 g-4">
          {itemInfo.map((fav, i) => {
            return (
              <div key={i}>
                <MDBCol size="md" className="h-100">
                  <MDBCard className="h-100 w-75">
                    <MDBCardImage
                      src={fav.product.image}
                      width="100"
                      height="200"
                      position="top"
                      onClick={() => {
                        navigate(`/productInfo/${fav.product._id}`);
                      }}
                    />
                    <a>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>

                    <MDBCardBody>
                      <MDBCardTitle
                        className="title"
                        onClick={() => {
                          navigate(`/productInfo/${fav.product._id}`);
                        }}
                      >
                        {fav.product.name}
                      </MDBCardTitle>
                      <MDBCardText className="price">
                        {fav.product.price} JD
                      </MDBCardText>
                      <MDBBtn
                        noRipple
                        color="danger"
                        onClick={() => {
                          notifyFav();
                          axios
                            .delete(`http://localhost:5000/favorit/${fav._id}`)
                            .then((respones) => {
                              console.log(respones);
                              console.log(itemInfo);

                              setItemInfo(
                                itemInfo.filter((favo) => {
                                  console.log(favo);
                                  console.log(fav);
                                  return favo._id !== fav._id;
                                })
                              );
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        remove
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </div>
            );
          })}
        </MDBRow>
        <ToastContainer />
        <div className="backButton">
          <MDBBtn
            noRipple
            color="secondary"
            className="w-100"
            onClick={() => {
              navigate("/category");
            }}
          >
            Back To Home
          </MDBBtn>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Favorit;
