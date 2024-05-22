import React, { useState } from "react";
import "./EditProductModel.css";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [productDetails, setProductDetails] = useState({ ...product });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const saveProduct = () => {
    onSave(productDetails);
  };

  return (
    <div className="edit-product-modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <div className="edit-product-itemfield">
          <p>Product title</p>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="edit-product-price">
          <div className="edit-product-itemfield">
            <p>Price</p>
            <input
              type="number"
              name="old_price"
              min="0"
              value={productDetails.old_price}
              onChange={changeHandler}
              placeholder="Type here"
            />
          </div>
          <div className="edit-product-itemfield">
            <p>Offer Price</p>
            <input
              type="number"
              name="new_price"
              min="0"
              value={productDetails.new_price}
              onChange={changeHandler}
              placeholder="Type here"
            />
          </div>
        </div>
        <div className="edit-product-itemfield">
          <p>Product category</p>
          <select
            value={productDetails.category}
            name="category"
            className="edit-product-selector"
            onChange={changeHandler}
          >
            <option value="Whisky">Whisky</option>
            <option value="Gin">Gin</option>
            <option value="Vodka">Vodka</option>
            <option value="Rum">Rum</option>
            <option value="Tequila">Tequila</option>
            <option value="Wine">Wine</option>
            <option value="Beer">Beer</option>
          </select>
        </div>
        <button className="save-btn" onClick={saveProduct}>
          Save
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
