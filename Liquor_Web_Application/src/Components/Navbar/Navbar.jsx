import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState(() => localStorage.getItem('menu') || "Home");
  const [loginAlert, setLoginAlert] = useState(false);
  const [signupAlert, setSignupAlert] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
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
    setLogoutAlert(true);
    setTimeout(() => {
      setLogoutAlert(false);
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
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <button>Login/SignUp</button>
          </Link>
        )}
        <Link to='/cart'>
          <img src={cart_icon} alt='cart' />
        </Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>

      {/* Alerts */}
      {loginAlert && <div className='alert'>Logged in successfully!</div>}
      {signupAlert && <div className='alert'>Signed up successfully!</div>}
      {logoutAlert && <div className='alert'>Logged out successfully!</div>}
    </div>
  );
};

export default Navbar;
