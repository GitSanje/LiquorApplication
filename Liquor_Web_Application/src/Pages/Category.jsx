// import React, { useContext } from 'react'
// import './CSS/Category.css'
// import { HomeContext } from '../Context/HomeContext';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
// import Item from '../Components/Item/Item'

// const Category = (props) => {
//   const {all_product} = useContext(HomeContext);
//   return (
//     <div className='home-category'>
//       <img className='homecategory-banner' src={props.banner} alt="" />
//       <div className="homecategory-indexSort">
//         <p>
//           {/* <span>Showing 1-12</span> out of 36 products */}
//         </p>
//         <div className="homecategory-sort">
//           Sort by <img src={dropdown_icon} alt="" />
//         </div>
//       </div>
//       <div className="homecategory-products">
//         {all_product.map((item,i)=>{
//           if (props.category===item.category){
//             return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//           }
//           else{
//             return null;
//           }
//         })}
//       </div>
//       <div className="homecategory-loadmore">
//         Explore More
//       </div>
//     </div>
//   )
// }

// export default Category