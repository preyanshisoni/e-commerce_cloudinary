import React from 'react'
import Signup from './component/SignUp/Signup'
import { Route, Routes } from 'react-router'
import Login from './component/LoginPage/LoginPage'
import Forgot from './component/Forgot_Passsord/Reset'
import Forgot_Passsord from './component/Forgot_Passsord/Forgot-Email'
import Reset from './component/Forgot_Passsord/Reset'
import Products from './component/Products/Product'
import Img from './component/Products/Img'
import ProductDetails from './component/Products/ProductDetails'





export default function App() {
  return (
    <>
    <Routes>
      
      <Route path='/' element={<Signup/>}></Route>
       
      
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgot-password' element={<Forgot_Passsord/>}></Route>
      <Route path='/reset-password' element={<Reset/>}></Route>
      <Route path='/product' element={<Products/>}></Route>
      <Route path='/productdetails' element={<ProductDetails/>}></Route>
  </Routes>
    
    </>
    
    
  )
}
