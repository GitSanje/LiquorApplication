import React from 'react'
import './Featured.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import Product from '../../Pages/Product'

const Featured = () => {
  return (
    <div className='Featured'>
        <h1>Featured Products</h1>
        <hr />
        <div className="Featured-item">  
            {data_product.map((item , i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
            })}
        </div>
    </div>
  )
}

export default Featured

