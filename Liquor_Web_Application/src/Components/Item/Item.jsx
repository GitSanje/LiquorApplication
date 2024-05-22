import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  console.log("item", props.image)
  return (
    <div className='Item'>
        
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="Item-prices">
            <div className="Item-price-new">
                Rs {props.new_price}
            </div>
            <div className="Item-price-old">
              Rs  {props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item