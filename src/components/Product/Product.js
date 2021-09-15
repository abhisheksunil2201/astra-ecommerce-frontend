import { FavoriteBorder } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

export const Product = ({ id, name, image, price, description, discount }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="product" key={id}>
        <img className="product__image" src={image} alt="product" />
        <div className="product__details">
          <p className="product__name">{name}</p>
          <p className="product__description">{description}</p>
          <div className="product__price">
            Rs. {Math.floor(price - (price * discount) / 100)}
            <div className="price__strikethrough">Rs. {price}</div>
            <div className="price__discount">({discount}% OFF)</div>
          </div>
          <div className="product__wishlist">
            <FavoriteBorder />
            WISHLIST
          </div>
        </div>
      </div>
    </Link>
  );
};
