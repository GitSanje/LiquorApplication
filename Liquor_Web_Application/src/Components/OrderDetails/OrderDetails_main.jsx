import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const OrderDetails_main = () => {
  const { products } = useContext(ShopContext);

  const [checkouts, setCheckouts] = useState(() => {
    const storedCheckouts = localStorage.getItem("checkouts");
    if (storedCheckouts === null || storedCheckouts === undefined) {
      return [];
    } else {
      return JSON.parse(storedCheckouts);
    }
  });

  useEffect(() => {
    const fetchCheckouts = async () => {
      if (localStorage.getItem("auth-token")) {
        try {
          const response = await fetch("http://localhost:4000/getCheckOut", {
            method: "GET",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.success) {
            console.log("Fetched checkouts data:", data);
            if (data.checkouts.length === 0) {
              localStorage.removeItem("checkouts"); // Remove checkouts from local storage if fetched data is empty
            } else {
              localStorage.setItem("checkouts", JSON.stringify(data.checkouts));
            }
            setCheckouts(data.checkouts);
          } else {
            localStorage.removeItem("checkouts");
            setCheckouts([]);
            console.log("Fetched checkouts data:", data.message);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCheckouts();
  }, []);

  console.log(checkouts);

  const mergedCartData =
    checkouts && checkouts.length > 0
      ? checkouts.reduce((acc, checkout) => {
          Object.entries(checkout.cartData).forEach(([productId, quantity]) => {
            if (acc[productId]) {
              acc[productId] += quantity;
            } else {
              acc[productId] = quantity;
            }
          });
          return acc;
        }, {})
      : {};

  const totalAmount =
    checkouts && checkouts.length > 0
      ? checkouts.reduce((acc, checkout) => {
          return acc + (checkout.totalAmount || 0); // If totalAmount is undefined, default to 0
        }, 0)
      : 0;

  const firstCheckout = checkouts.length > 0 ? checkouts[0] : {};
  const { address, phoneNumber, paymentMethod, status } = firstCheckout;

  const boxStyles = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    maxWidth: "800px",
    margin: "20px auto",
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10" style={boxStyles}>
          {checkouts.length === 0 ? (
            <h4>No orders have been placed.</h4>
          ) : (
            <>
              <div>
                <h3 className="text-center mb-4">Order Details</h3>
                <p>
                  <strong>Address:</strong> {address}
                </p>
                <p>
                  <strong>Phone Number:</strong> {phoneNumber}
                </p>
                <p>
                  <strong>Payment Method:</strong> {paymentMethod}
                </p>
                <p>
                  <strong>Status:</strong> {status}
                </p>
                <p>
                  <strong>Total Amount:</strong> Rs {totalAmount}
                </p>
              </div>
              <div>
                <div className="cartitems-format-main">
                  <p>Products</p>
                  <p>Title</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Amount</p>
                </div>
                <hr />
                {products.map((e) => {
                  const quantity = mergedCartData?.[e.id] ?? 0;
                  if (quantity > 0) {
                    return (
                      <div key={e.id}>
                        <div className="cartitems-format cartitems-format-main">
                          <img
                            src={e.image}
                            alt=""
                            className="carticon-product-icon"
                          />
                          <p>{e.name}</p>
                          <p>Rs {e.new_price}</p>
                          <button className="cartitems-quantity">
                            {quantity}
                          </button>
                          <p>Rs {e.new_price * quantity}</p>
                        </div>
                        <hr />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails_main;
