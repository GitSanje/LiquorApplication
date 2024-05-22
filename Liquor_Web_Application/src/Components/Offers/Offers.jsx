// import React from 'react'
// import './Offers.css'
// import new_collection from '../Assets/new_collections'
// import Item from '../Item/Item'

// const Offers = () => {
//   return (
//     <div className='Offers'>
//         <h1>Exclusive Offers</h1>
//         <hr/>
//         <div className="Collections">
//             {new_collection.map((item, i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//             })}
//         </div>
//     </div>
//   )
// }

// export default Offers

import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
