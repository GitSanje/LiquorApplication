
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Product from './Pages/Product';  
import Cart from './Pages/Cart';  
import LoginSignup from './Pages/LoginSignup';  
import Footer from './Components/Footer/Footer';

import ShopCategory from './Pages/ShopCategory';
import CheckoutForm from './Components/Checkout/Checkout';

function App() {


  return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Whisky' element={<ShopCategory category="Whisky"/>}/>
          <Route path='/Wine' element={<ShopCategory category="Wine"/>}/>
          <Route path='/Beer' element={<ShopCategory category="Beer"/>}/>
          <Route path='/Gin' element={<ShopCategory category="Gin"/>}/>
          <Route path='/Vodka' element={<ShopCategory category="Vodka"/>}/>
          <Route path='/Rum' element={<ShopCategory category="Rum"/>}/>
          <Route path='/Tequila' element={<ShopCategory category="Tequila"/>}/>
          
          <Route path="/Product/:productId" element={<Product/>}/>
         
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Login' element={<LoginSignup/>}/>
          <Route path='/Checkout' element={<CheckoutForm/>}/>
        </Routes>
        <Footer/>
  
        </BrowserRouter>
    </div>
  );
}

export default App;
