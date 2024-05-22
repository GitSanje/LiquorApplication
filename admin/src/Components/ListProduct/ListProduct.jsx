import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png';
import edit_icon from '../../assets/edit.png'; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditProductModal from "../EditProduct/EditProductModel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  const fetchInfo = () => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await fetch('http://localhost:4000/removeproduct', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id }),
            });

            fetchInfo();
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const saveProduct = async (productDetails) => {
    await fetch('http://localhost:4000/updateproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productDetails),
    })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.message);
      }
      else{
        toast.error(data.errors);
      }
  })
    fetchInfo();
    setSelectedProduct(null); 
  };

  return (
    <div className="listproduct">
       <ToastContainer />
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => (
          <div key={e.id}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={e.image} alt="" />
              <p className="cartitems-product-title">{e.name}</p>
              <p>Rs {e.old_price}</p>
              <p>Rs {e.new_price}</p>
              <p>{e.category}</p>
              <div className="listproduct-actions">
                <img
                  className="listproduct-remove-icon"
                  onClick={() => { removeProduct(e.id); }}
                  src={cross_icon}
                  alt=""
                />
                <img
                  className="listproduct-edit-icon"
                  onClick={() => { setSelectedProduct(e); }}
                  src={edit_icon}
                  alt="Edit"
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={saveProduct}
        />
      )}
    </div>
  );
};

export default ListProduct;
