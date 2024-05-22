import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Whisky",
    new_price: "",
    old_price: ""
  });
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!productDetails.name) errors.name = "Product title is required.";
    if (!productDetails.old_price) errors.old_price = "Price is required.";
    if (!productDetails.new_price) errors.new_price = "Offer price is required.";
    if (!image) errors.image = "Product image is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addProduct = async () => {
    if (!validate()) return;

    let dataObj;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.image = dataObj.image_url;

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            toast.success("Product Added Successfully!");
            // Clear form fields
            setProductDetails({
              name: "",
              image: "",
              category: "Whisky",
              new_price: "",
              old_price: ""
            });
            setImage(null);
          } else {
            toast.error(data.errors);
          }
        });
    }
  };



  return (
    <div className="addproduct">
      <ToastContainer />
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            min="0"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
          {errors.old_price && <span className="error">{errors.old_price}</span>}
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            min="0"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
          {errors.new_price && <span className="error">{errors.new_price}</span>}
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
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
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>
      <button className="addproduct-btn" onClick={addProduct}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
