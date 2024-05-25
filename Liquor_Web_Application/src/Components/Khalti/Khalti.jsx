import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";
import { useLocation } from "react-router-dom";

export default function Khalti() {
  const location = useLocation();
  const formData = location.state.formData;
  const {  address, phoneNumber, totalAmount } = formData;

  let checkout = new KhaltiCheckout(config);

  let boxStyles = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    marginTop: "50px",
  };

  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
    width: "100%",
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6" style={boxStyles}>
          <div>
            <h3 className="text-center mb-4">Order Details</h3>
         
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
            <p><strong>Total Amount:</strong> {totalAmount}</p>
          </div>
          <button onClick={() => checkout.show({ amount: totalAmount*100 })} style={buttonStyles}>
            Pay Via Khalti
          </button>
        </div>
      </div>
    </div>
  );
}
