import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Orders from '../../Components/Orders/Orders';
import OrderDetails_main from '../../Components/Orders/OrderDetails_main';
import { RemoveOrderProvider } from '../../Context/RemoveOrderProvider';

const Admin = () => {

  const isAuthenticated = !!localStorage.getItem('auth-token');
  return (
   
    <div className='admin'>
       {isAuthenticated ? (
        <>
      <Sidebar />
      <Routes>
        <Route path='' element={<AddProduct />} />
        <Route path='addproduct' element={<AddProduct />} />
        <Route path='listproduct' element={<ListProduct />} />
        <Route path='orders' element={<Orders/>} />
        <Route path="/orderdetails" element={<OrderDetails_main />} />
      </Routes> </>): 
      (<Route path='/' element={<LoginSignup />} />)

       }
    </div>
  
  );
};

export default Admin;
