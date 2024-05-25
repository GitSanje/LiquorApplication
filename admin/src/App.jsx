import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Admin from './Pages/Admin/Admin'
import LoginSignup from './Pages/LoginSignup'

import {Routes,Route, BrowserRouter} from "react-router-dom"
const App = () => {

  const isAuthenticated = !!localStorage.getItem('auth-token');
  console.log(isAuthenticated)
  return (

    <div>
    

      <Navbar />
      
      <Routes>
        {isAuthenticated ? (
          <Route path='/*' element={<Admin />} />
        ) :
         (
          <Route path='/' element={<LoginSignup />} />
        )}
        </Routes>

    
 
    </div>
   
  )
}

export default App
