import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router";
import { UseProduct } from "../../context/ProductContext";
import { getTotalDiscountedPrice, getTotalPrice } from "../CommonFunctions";

export const PriceDetail = () => {
  const { state } = UseProduct();
  const totalPrice = getTotalPrice(state.cart);
  const totalDiscountPrice = getTotalDiscountedPrice(state.cart);
  const navigate = useNavigate();
  return (
    <div className="cart__total">
      <h3>Price Details (1 item)</h3>
      <div className="cartTotal__price">
        <div className="cart__totalMrp">
          <p>Total MRP</p>
          <p>Rs. {totalPrice}</p>
        </div>
        <div className="cart__discountMrp">
          <p>Discount on MRP</p>
          <p className="greenText">-Rs. {totalPrice - totalDiscountPrice}</p>
        </div>
        <div className="cart__totalAmount">
          <h4>Total Amount</h4>
          <h4>Rs. {totalDiscountPrice}</h4>
        </div>
        <Button
          onClick={() => navigate("/checkout/address")}
          className="placeOrderBtn"
        >
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
};
