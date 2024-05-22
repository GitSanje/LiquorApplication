import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductDisplay = (props) => {
    const {product}= props;
    const {addToCart} = useContext(ShopContext);

    console.log("Product display", product)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <hr />
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">Rs {product.old_price}</div>
                <div className="productdisplay-right-price-new">Rs {product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>Quarter</div>
                    <div>Half</div>
                    <div>Full</div> 
                </div>
            </div>
            {localStorage.getItem('auth-token') ? (
         <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        ) : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <button>ADD TO CART</button>
          </Link>
        )}
            
            <p className='productdisplay-right-category'><span>Category :</span>Whisky</p>
            <p className='productdisplay-right-category'><span>Brand :</span>Jack Daniels</p>
        </div>
    </div>
  )
}

export default ProductDisplay