import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { UseProduct } from "../../context/ProductContext";
import "./Wishlist.css";
import { WishlistCard } from "./WishlistCard";

export const Wishlist = () => {
  const { state } = UseProduct();
  return (
    <>
      {state.wishlist.length !== 0 && (
        <h3 className="wishlist__heading">My Wishlist</h3>
      )}
      <div
        className="wishlist"
        style={
          state.wishlist.length === 0 ? { justifyContent: "center" } : null
        }
      >
        {state.wishlist.length === 0 && (
          <div className="wishlist__empty">
            <h3>YOUR WISHLIST IS EMPTY</h3>
            <small>
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </small>
            <Link to="/">
              <Button className="cart__wishlistBtn">CONTINUE SHOPPING</Button>
            </Link>
          </div>
        )}
        {state.wishlist.length !== 0 &&
          state.wishlist.map((item) => (
            <Link key={item._id} to={`/products/${item.product._id}`}>
              <WishlistCard item={item} />
            </Link>
          ))}
      </div>
    </>
  );
};
