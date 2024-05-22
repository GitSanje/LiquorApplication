import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
import navSignUpIcon from "../../assets/sign_up.png";
import navprofileIcon from "../../assets/login_icon.jpeg";
import '../../../../Liquor_Web_Application/src/Components/Navbar/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    // setLogoutAlert(true);
    // setTimeout(() => {
    //   setLogoutAlert(false);
      window.location.replace("/");
    // }, 2000);
  };

  return (
    <div className="navbar">
      <img src={navlogo} className="nav-logo" alt="" />

      <span></span>

      <div className="nav-login-cart">
        
        {localStorage.getItem("auth-token") ? (
          <button onClick={handleLogout}>Logout
            <img src={navprofileIcon} className="nav-profile" alt="" /> 
          </button>
        ) : (
          <Link to="/" style={{ textDecoration: "none" }}>
            <button >Login/SignUp
             <span className=""> <img src={navSignUpIcon} className="nav-profile" alt="" /></span> 
            </button>
 
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
