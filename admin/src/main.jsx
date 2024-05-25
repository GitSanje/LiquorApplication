import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { RemoveOrderProvider } from './Context/RemoveOrderProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RemoveOrderProvider>
    <BrowserRouter>
    
       <App />
      
    </BrowserRouter>
    
    </RemoveOrderProvider>
  // </React.StrictMode>,
)
