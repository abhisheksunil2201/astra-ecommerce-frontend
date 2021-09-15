import React, { useState } from "react";

export const AddressForm = () => {
  const [address, setAddress] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    address: "",
    town: "",
    state: "",
  });
  const [error, setError] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    address: "",
    town: "",
    state: "",
  });
  const onChangeHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  return (
    <div className="address-container">
      <div className="address__form">
        <h5>CONTACT DETAILS</h5>
        <div className="input-group">
          <input
            type="text"
            className="input-area"
            name="name"
            value={address.name}
            placeholder="Name"
            onChange={onChangeHandler}
          />
          {error.name && <small className="red-txt">*{error.name}</small>}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-area"
            name="mobileNumber"
            value={address.mobileNumber}
            placeholder="Mobile Number"
            onChange={onChangeHandler}
          />
          {error.mobileNumber && (
            <small className="red-txt">*{error.mobileNumber}</small>
          )}
        </div>
        <h5>ADDRESS</h5>
        <div className="input-group">
          <input
            type="text"
            className="input-area"
            name="pinCode"
            placeholder="Pin Code"
            value={address.pinCode}
            onChange={onChangeHandler}
          />
          {error.pinCode && <small className="red-txt">*{error.pinCode}</small>}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-area"
            name="address"
            placeholder="Address (House No, Building Street)"
            value={address.address}
            onChange={onChangeHandler}
          />
          {error.address && <small className="red-txt">*{error.address}</small>}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-area"
            name="town"
            placeholder="Town"
            value={address.town}
            onChange={onChangeHandler}
          />
          {error.town && <small className="red-txt">*{error.town}</small>}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-area"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={onChangeHandler}
          />
          {error.state && <small className="red-txt">*{error.state}</small>}
        </div>
      </div>
    </div>
  );
};
