import { Button } from "@material-ui/core";
import React from "react";
import { UseProduct } from "../../context/ProductContext";
import "./Cart.css";
import emptyCart from "../../assets/cart_empty.svg";
import CartItem from "./CartItem";
import { PriceDetail } from "./PriceDetail";
import { getTotalPrice, getTotalDiscountedPrice } from "../CommonFunctions";

export const Cart = () => {
  const { state } = UseProduct();

  return (
    <div className="cart">
      {state.cart.length === 0 && (
        <div className="cart__empty">
          <img src={emptyCart} alt="Cart is empty" />
          <h3>Hey, it feels so light!</h3>
          <small>There is nothing in your bag. Let's add some items</small>
          <Button className="cart__wishlistBtn">ADD ITEMS FROM WISHLIST</Button>
        </div>
      )}
      {state.cart.length > 0 && (
        <>
          <div className="cart__items">
            <div className="cartItems__heading">
              <h3>
                {state.cart.length === 1
                  ? `My Shopping Bag(1 Item)`
                  : `My Shopping Bag(${state.cart.length} Items)`}
              </h3>
              <h4>Total: Rs. {getTotalDiscountedPrice(state.cart)}</h4>
            </div>
            {state.cart.map(({ _id, product, quantity, type }) => (
              <CartItem
                product={product}
                key={_id}
                id={_id}
                quantity={quantity}
                type={type}
              />
            ))}
          </div>
          <PriceDetail />
          {/* <div className="cart__total">
            <h3>Price Details (1 item)</h3>
            <div className="cartTotal__price">
              <div className="cart__totalMrp">
                <p>Total MRP</p>
                <p>Rs. {getTotalPrice(state.cart)}</p>
              </div>
              <div className="cart__discountMrp">
                <p>Discount on MRP</p>
                <p className="greenText">
                  -Rs.{" "}
                  {getTotalPrice(state.cart) -
                    getTotalDiscountedPrice(state.cart)}
                </p>
              </div>
              <div className="cart__totalAmount">
                <h4>Total Amount</h4>
                <h4>Rs. {getTotalDiscountedPrice(state.cart)}</h4>
              </div>
              <Button className="placeOrderBtn">PLACE ORDER</Button>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};
