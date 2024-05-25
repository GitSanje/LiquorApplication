import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRemoveOrder } from "../../Context/RemoveOrderProvider";

const OrderDetails_main = () => {
  const { state } = useLocation();
  const { checkout } = state;
  const [products, setProducts] = useState([]);

  const removeOrder = useRemoveOrder();

  const [orderStatus, setOrderStatus] = useState(checkout.status);
  const navigate = useNavigate();

  console.log(removeOrder)

  useEffect(() => {

    const storedProducts = localStorage.getItem('allProducts');

    if (storedProducts && storedProducts !== "undefined") {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('allProducts', JSON.stringify(data));
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, []);

  const mergedCartData = checkout.cartData
    ? Object.entries(checkout.cartData).reduce((acc, [productId, quantity]) => {
        if (acc[productId]) {
          acc[productId] += quantity;
        } else {
          acc[productId] = quantity;
        }
        return acc;
      }, {})
    : {};

  const totalAmount = checkout.totalAmount || 0;
  const { address, phoneNumber, paymentMethod } = checkout;

  const boxStyles = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    maxWidth: "800px",
    margin: "20px auto",
  };

  const updateOrderStatus = (status) => {
    fetch('http://localhost:4000/Orderstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: checkout._id, status }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOrderStatus(status);
          toast.success(`Order has been ${status.toLowerCase()}`);
          // removeOrder(checkout._id)
          setTimeout(() => {
            navigate('/orders'); // Redirect to the order list page after a delay
          }, 3000); // 3 seconds delay
        } else {
          toast.error(`Error updating order status: ${data.message}`);
        }
      })
      .catch(error => {
        toast.error(`Error: ${error}`);
      });
  };

  

  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-10" style={boxStyles}>
          <div>
            <h3 className="text-center mb-4">Order Details</h3>
           
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            <p><strong>Total Amount:</strong> Rs {totalAmount}</p>
          </div>
          <div>
            <div className="cartitems-format-main row">
              <div className="col"><strong>Products</strong></div>
              <div className="col"><strong>Title</strong></div>
              <div className="col"><strong>Price</strong></div>
              <div className="col"><strong>Quantity</strong></div>
              <div className="col"><strong>Amount</strong></div>
            </div>
            <hr />
            {products.map((product) => {
              const quantity = mergedCartData[product.id] || 0;
              if (quantity > 0) {
                return (
                  <div key={product.id}>
                    <div className="cartitems-format cartitems-format-main row">
                      <div className="col">
                        <img src={product.image} alt="" className="carticon-product-icon" />
                      </div>
                      <div className="col">{product.name}</div>
                      <div className="col">Rs {product.new_price}</div>
                      <div className="col">
                        <button className="cartitems-quantity">{quantity}</button>
                      </div>
                      <div className="col">Rs {product.new_price * quantity}</div>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}

          </div>
          <div className="text-center mb-4">
            <button className="btn btn-success mx-2" onClick={() => updateOrderStatus('Your order has been approved')}>Approve</button>
            <button className="btn btn-danger mx-2" onClick={() => updateOrderStatus('Your order has been declined')}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails_main;
