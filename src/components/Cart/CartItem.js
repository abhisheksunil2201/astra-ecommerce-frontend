import { Button, IconButton } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UseProduct } from "../../context/ProductContext";
import {
  productAddToWishlist,
  productRemoveFromCart,
  updateCart,
} from "../../utils/CallApi";
import { isInWishlist } from "../CommonFunctions";

const CartItem = ({ id, product, quantity }) => {
  const { state, dispatch } = UseProduct();
  const { auth } = useAuth();
  const handleRemove = (e) => {
    productRemoveFromCart(e, dispatch, auth.token, product._id);
  };
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { image, name, description, type } = product;

  const addToWishlist = async (e) => {
    e.preventDefault();
    await productRemoveFromCart(e, dispatch, auth.token, product._id);
    if (!isInWishlist(state.wishlist, product._id)) {
      await productAddToWishlist(dispatch, auth.token, product._id);
    }
  };
  return (
    <div key={id} className="cart__item">
      <div className="cartItem__product">
        <img className="cart__image" src={image} alt={type} />
        <div className="cartItem__details">
          <p className="cartItem__heading">{name}</p>
          <p>{description}</p>
          <div className="cartItem__price">
            <h4 className="cartItem__current">
              <strong>
                Rs.{" "}
                {Math.floor(
                  product.price -
                    (product.price * product.discountPercentage) / 100
                )}{" "}
              </strong>
            </h4>
            <h5 className="price__strikethrough">Rs. {product.price}</h5>
            <h5 className="price__discount">
              ({product.discountPercentage}% OFF)
            </h5>
          </div>
          <div className="cartItem__quantity">
            {itemQuantity - 1 === 0 ? (
              <IconButton disabled>
                <RemoveCircle />
              </IconButton>
            ) : (
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  updateCart(itemQuantity - 1, dispatch, auth.token, id);
                  setItemQuantity((itemQuantity) => itemQuantity - 1);
                }}
              >
                <RemoveCircle />
              </IconButton>
            )}
            <span>{itemQuantity}</span>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                updateCart(itemQuantity + 1, dispatch, auth.token, id);
                setItemQuantity((itemQuantity) => itemQuantity + 1);
              }}
            >
              <AddCircle />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="cartItem__buttons">
        <Button onClick={handleRemove} disableRipple={true}>
          REMOVE
        </Button>
        <Button disableRipple={true} onClick={addToWishlist}>
          MOVE TO WISHLIST
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
