import React, { useEffect, useState,useContext } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";


const ShopCategory = (props) => {
 
    const {products}= useContext(ShopContext);

       
  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
       
        {/* <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div> */}
      </div>
      <div className="shopcategory-products">
      {
         products.map((item, i) => {
      if (props.category.toLowerCase()  === item.category.toLowerCase()  && item.image) {
        console.log(item.image)
        return (
          <Item
            id={item.id}
            key={i}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        );
      } else {
        return null;
      }
    })
  }

      </div>
      <div className="shopcategory-loadmore">
      <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;
