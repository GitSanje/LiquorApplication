import React, { useState,useEffect } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({ username: '',age:'', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [showPopup, setShowPopup] = useState('');

  useEffect(() => {
    if (showPopup) {
      setTimeout(() => {
        setShowPopup('');
      }, 2000);
    }
  }, [showPopup]);
  
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (state === 'Sign Up') {
      if (!formData.username.trim()) {
        formErrors.username = 'Username is required';
      } else if (formData.username.length < 5) {
        formErrors.username = 'Username must be at least 5 characters long';
      } else if (/^\d+$/.test(formData.username)) {
        formErrors.username = 'Username cannot be all numbers';
      }

      if (!formData.age.trim()) {
        formErrors.age = 'Age is required';
      } else if (isNaN(formData.age) || parseInt(formData.age, 10) < 18) {
        formErrors.age = 'You must be at least 18 years old';
      }
    }

    if (!formData.email.trim()) {
      formErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    } else if (!formData.email.endsWith('@gmail.com')) {
      formErrors.email = 'Email address must end with @gmail.com';
    }

    if (!formData.password.trim()) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const login = async () => {
    setAlertMessage('');
    setErrors({});
    if (!validateForm()) return;
   
    let dataObj;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data; });
    console.log(dataObj);
    if (dataObj.success) {
      setShowPopup('Login successful');
      localStorage.setItem('auth-token', dataObj.token);
      window.location.replace('/');
    } else {
      setAlertMessage(dataObj.errors);
    }
  };

  const signup = async () => {
    setAlertMessage('');
    setErrors({});
    if (!validateForm()) return;
 
    let dataObj;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data; });

    if (dataObj.success) {
      setShowPopup('Signup successful');
      localStorage.setItem('auth-token', dataObj.token);

      window.location.replace('/');
     

    } else {
      setAlertMessage(dataObj.errors);
    }
  };

  const switchToSignup = () => {
    setState('Sign Up');
    setFormData({ username: '', age:'', email: '', password: '' });
    setErrors({});
    setAlertMessage('');
  };

  const switchToLogin = () => {
    setState('Login');
    setFormData({ username: '', age:'', email: '', password: '' });
    setErrors({});
    setAlertMessage('');
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Your name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            
            <input
              type="number"
              placeholder="Your Age"
              name="age"
              value={formData.age}
              min="0"
              onChange={changeHandler}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </>
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button onClick={() => { 
          setAlertMessage('');
          setErrors({});
          state === "Login" ? login() : signup();
        }}>Continue</button>

        {state === "Login" ?
          <p className="loginsignup-login">Create an account? <span onClick={switchToSignup}>Click here</span></p>
          :
          <p className="loginsignup-login">Already have an account? <span onClick={switchToLogin}>Login here</span></p>}
      </div>
    </div>
  );
};

export default LoginSignup;
