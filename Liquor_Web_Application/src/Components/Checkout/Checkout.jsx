import React, { useState, useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Checkout.css";
import khalti_icon from '../Assets/Khalti_Logo_Color.png'
import cash_icon from '../Assets/cash.png'
import { ShopContext } from "../../Context/ShopContext";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link ,useNavigate} from 'react-router-dom';


const CheckoutForm = () => {


const {getTotalCartAmount, clearCart, cartItems} = useContext(ShopContext);
const navigate = useNavigate();
  
const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    address: '',
    city: 'Kathmandu',
    paymentMethod: 'khalti',
    totalAmount: '',
    cartData:'',
  });
 console.log("from checkout",formData)

  const [errors, setErrors] = useState({
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchTotalAmount = async () => {
      const totalAmount = await getTotalCartAmount();
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalAmount: totalAmount,
        cartData:cartItems,
        
      }));
    };
  
    fetchTotalAmount();
  }, [getTotalCartAmount]);

  // useEffect(() => {
  //   const fetchCheckoutData = async () => {
  //     const storedCheckout = localStorage.getItem("checkouts");
  //     if (storedCheckout !== "undefined" && storedCheckout && storedCheckout.length > 0) {
  //       const checkoutData = JSON.parse(storedCheckout);
  //       const { city, address, phoneNumber, paymentMethod } = checkoutData[0] || {};
        
  //       setFormData({
  //         phoneNumber: phoneNumber || '',
  //         address: address || '',
  //         city: city || 'Kathmandu',
  //         paymentMethod: paymentMethod || 'khalti',
  //       });
  //     }
  //   };
  
  //   fetchCheckoutData();
  // }, []);
  
  


  useEffect(() => {
   
    const getEmailFromToken = () => {
      const token = localStorage.getItem('auth-token'); 
      if (token) {
        try {
          const decoded = jwtDecode(token)
          
          if (decoded.user.email) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              email: decoded.user.email,
            }));
          }
        } catch (error) {
          localStorage.removeItem("checkouts")
          console.error('Error decoding token:', error);
        }
      }
    };
   
    getEmailFromToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate phone number length
    if (name === 'phoneNumber') {
      if (value.length !== 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Phone number must be 10 digits',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: '',
        }));
      }
    }
  };
  
  const handleOnlineCheckout = () => {
    // Redirect to Khalti page with formData
    navigate('/khalti', { state: { formData: formData } });
  };

  
  const handleCashCheckout = async () => {
    try {
        confirmAlert({
          title: 'Confirmed Order',
          message: (
            <div>
              <p>Your order has been placed successfully!</p>
              <p>You can view your order in order detail</p>
            </div>
          ),
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                await fetch('http://localhost:4000/checkout', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                });
               // Reset the form fields
              setFormData({
                phoneNumber: '',
                address: '',
                totalAmount: ''
              });

              // Clear the cart items
              clearCart();
              navigate('/')
              
              } 
            },
          ],
        });
      
      
    } catch (error) {
      console.error('Error submitting checkout:', error);
      alert('An error occurred while submitting the checkout');
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for phone number length before submitting
    if (formData.phoneNumber.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Phone number must be 10 digits',
      }));
      return;
    }

   // Handle different checkout methods
   if (formData.paymentMethod === 'cash') {
    handleCashCheckout();
  }
   else if (formData.paymentMethod === 'khalti') {
    console.log("khalti")
    handleOnlineCheckout();
   }

  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Delivery Address</h2>
        <form onSubmit={handleSubmit}>
        <input type='hidden' id='totalAmount' name="totalAmount" value={formData.totalAmount} />
        <input type='hidden' id='cartData' name="cartData" value={formData.cartData} />

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Full Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <select
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="Kathmandu">Kathmandu</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Lalitpur">Lalitpur</option>
            </select>
          </div>

          <div className="form-group">
            <h3>Payment Method</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cash"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="cash">
                <img src={cash_icon} alt="Cash" style={{ width: '80px', marginRight: '10px' }} />   Cash On Delivary
             
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="khalti"
                value="khalti"
                checked={formData.paymentMethod === 'khalti'}
                onChange={handleChange}
              />
              <label className="form-check-label font-weight-bold" htmlFor="khalti">
                <img src={khalti_icon} alt="khalti" style={{ width: '100px', marginRight: '10px' }} />
                Khalti
              </label>
            </div>
          </div>
     
          <button type="submit" onSubmit={handleSubmit} className="btn btn-primary w-100">Checkout</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
