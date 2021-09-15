import { Button, CircularProgress } from "@material-ui/core";
import {
  FavoriteBorderOutlined,
  LocalMallOutlined,
  Star,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UseProduct } from "../../context/ProductContext";
import { addProductToCart, wishlistManipulation } from "../../utils/CallApi";
import { isInWishlist } from "../CommonFunctions";
import "./ProductDetail.css";
import { BACKEND } from "../../backend";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");
  const { state, dispatch } = UseProduct();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const {
        data: { response },
        status,
      } = await axios.get(`${BACKEND}/product/${productId}`);
      if (status === 200) {
        setProduct(response);
      }
    })();
  }, []);

  const isInCart = (id, cart) => {
    return cart.map((item) => item._id).includes(id);
  };

  return (
    <>
      {product && (
        <div className="productDetails">
          <div className="productDetails__imgContainer">
            <img
              className="productDetails__img"
              src={product.image}
              alt={product.type}
            />
          </div>
          <div className="productDetails__detailsContainer">
            <div className="productDetails__name">{product.name}</div>
            <div className="productDetails__description">
              {product.description}
            </div>
            <div className="productDetails__rating">
              {product.rating}
              <Star style={{ color: "#14958f" }} />
            </div>
            <div className="productDetails__price">
              <h3 className="price__current">
                <strong>
                  Rs.{" "}
                  {Math.floor(
                    product.price -
                      (product.price * product.discountPercentage) / 100
                  )}{" "}
                </strong>
              </h3>
              <h3 className="price__strikethrough">Rs. {product.price}</h3>
              <h3 className="price__discount">
                ({product.discountPercentage}% OFF)
              </h3>
            </div>
            <small className="green-txt">inclusive of all taxes</small>
            <div className="productDetails__buttons">
              {isInCart(product._id, state.cart) ? (
                <Link to="/checkout/cart">
                  <Button className="addToCart">GO TO CART</Button>
                </Link>
              ) : (
                <Button
                  onClick={(e) => {
                    if (!auth.token) {
                      navigate("/login");
                      return;
                    }
                    addProductToCart(e, dispatch, product._id, auth.token);
                  }}
                  className="addToCart"
                  startIcon={<LocalMallOutlined />}
                >
                  ADD TO BAG
                </Button>
              )}
              {isInWishlist(state.wishlist, product._id) ? (
                <Link to="/wishlist">
                  <Button
                    className="wishlistBtn"
                    startIcon={<FavoriteBorderOutlined />}
                  >
                    GO TO WISHLIST
                  </Button>
                </Link>
              ) : (
                <Button
                  className="wishlistBtn"
                  startIcon={<FavoriteBorderOutlined />}
                  onClick={(e) => {
                    if (!auth.token) {
                      navigate("/login");
                      return;
                    }
                    wishlistManipulation(
                      e,
                      state,
                      dispatch,
                      auth.token,
                      product._id
                    );
                  }}
                >
                  WISHLIST
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {!product && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
