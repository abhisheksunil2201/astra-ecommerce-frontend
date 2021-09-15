import React from "react";
import { Cancel } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { addProductToCart, wishlistManipulation } from "../../utils/CallApi";
import { UseProduct } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

export const WishlistCard = ({ item }) => {
  const { state, dispatch } = UseProduct();
  const { auth } = useAuth();
  return (
    <div className="wishlist__product">
      <Cancel
        onClick={(e) =>
          wishlistManipulation(e, state, dispatch, auth.token, item.product._id)
        }
        className="removeFromWishlist"
      />
      <img className="product__image" src={item.product.image} alt="product" />
      <div className="wishlistProduct__details">
        <p className="wishlistProduct__name">{item.product.name}</p>
        <div className="product__price">
          Rs.{" "}
          {Math.floor(
            item.product.price -
              (item.product.price * item.product.discountPercentage) / 100
          )}
          <div className="price__strikethrough">Rs. {item.product.price}</div>
          <div className="price__discount">
            ({item.product.discountPercentage}% OFF)
          </div>
        </div>
      </div>
      <Button
        onClick={(e) => {
          addProductToCart(e, dispatch, item.product._id, auth.token);
          wishlistManipulation(
            e,
            state,
            dispatch,
            auth.token,
            item.product._id
          );
        }}
        className="wishlistProduct__wishlistBtn"
        disableRipple={true}
      >
        MOVE TO CART
      </Button>
    </div>
  );
};
