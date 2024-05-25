import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';
import user_login from '../Assets/user.png';
import sign_up from '../Assets/sign_up.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [menu, setMenu] = useState(() => localStorage.getItem('menu') || "Home");

  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  useEffect(() => {
    localStorage.setItem('menu', menu);
  }, [menu]);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');

    setTimeout(() => {
     
      window.location.replace("/");
    }, 2000);
  };

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu("Home") }} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="" style={{ width: '60px', height: '60px' }} />
        <p>TIPSY</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("Home") }} ><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "Home" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Whisky") }} ><Link style={{ textDecoration: 'none' }} to='/Whisky'>Whisky</Link>{menu === "Whisky" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Wine") }} ><Link style={{ textDecoration: 'none' }} to='/Wine'>Wine</Link>{menu === "Wine" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Beer") }} ><Link style={{ textDecoration: 'none' }} to='/Beer'>Beer</Link>{menu === "Beer" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Gin") }} ><Link style={{ textDecoration: 'none' }} to='/Gin'>Gin</Link>{menu === "Gin" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Vodka") }} ><Link style={{ textDecoration: 'none' }} to='/Vodka'>Vodka</Link>{menu === "Vodka" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Rum") }} ><Link style={{ textDecoration: 'none' }} to='/Rum'>Rum</Link>{menu === "Rum" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Tequila") }} ><Link style={{ textDecoration: 'none' }} to='/Tequila'>Tequila</Link>{menu === "Tequila" ? <hr /> : <></>}</li>
      </ul>
      <div className='nav-login-cart'>

      {localStorage.getItem('auth-token') ? (
            <div className="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={user_login} />
                </button>
                <ul class="dropdown-menu">
                    <Link to="/orderdetails" className="dropdown-item">Order Details</Link>
                    <Link to="" className="dropdown-item">Profile</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </ul>
            </div>
        ) : (
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <button> <img src={sign_up} /></button>
            </Link>
        )}
     


        <Link to='/cart'>
          <img src={cart_icon} alt='cart' />
        </Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>

      
    </div>
  );
};

export default Navbar;
