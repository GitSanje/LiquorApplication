import React, { createContext, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products,setProducts] = useState([]);
  const storedProducts = localStorage.getItem('allProducts');
 

  if (products.length <=0) {
    setProducts(JSON.parse(storedProducts));
  } 
  useEffect(() => {
   
      // Fetch all products if not available in localStorage
      fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('allProducts', JSON.stringify(data));
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    
  }, []); // Empty dependency array ensures this runs only once



  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  const [cartItems, setCartItems] = useState(getDefaultCart());
  
 // Fetch cart items if user is authenticated
useEffect(() => {
  if (localStorage.getItem("auth-token")) {
    fetch('http://localhost:4000/getcart', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'auth-token': `${localStorage.getItem("auth-token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem('cartItems', JSON.stringify(data));
      setCartItems(data);
    })
    .catch((error) => console.error('Error fetching cart items:', error));
  }
}, []);


   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];;
      }
    }
    return totalItem;
  };

  
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/addtocart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"itemId":itemId}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
  };

  const removeFromCart = (itemId) => {
    // Define a function to remove item from cart
    const removeItemFromCart = () => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if (localStorage.getItem("auth-token")) {
        fetch('http://localhost:4000/removefromcart', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem("auth-token")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "itemId": itemId }),
        })
          .then((resp) => resp.json())
          .then((data) => { console.log(data) });
      }
    };
  
    // Confirm before removing item
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to remove this item from cart?',
      buttons: [
        {
          label: 'Yes',
          onClick: removeItemFromCart // Call removeItemFromCart function if user confirms
        },
        {
          label: 'No',
          onClick: () => {} // Do nothing if user cancels
        }
      ]
    });
  };

  const clearCart =  () => {
    if (localStorage.getItem('auth-token')) {
      try {
         fetch('http://localhost:4000/clearcart', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json'
          }
        });
        setCartItems(getDefaultCart());
        localStorage.setItem('cartItems', '');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setCartItems(getDefaultCart());
    }
  };
  const contextValue = {products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount ,clearCart};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
