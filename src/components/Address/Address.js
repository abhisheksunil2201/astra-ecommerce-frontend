import React from "react";
import { AddressForm } from "./AddressForm";
import "./Address.css";
import { UseProduct } from "../../context/ProductContext";
import { PriceDetail } from "../Cart/PriceDetail";

export const Address = () => {
  const { state } = UseProduct();
  return (
    <div>
      <div className="address-wrapper">
        <AddressForm />
        <PriceDetail />
      </div>
    </div>
  );
};
