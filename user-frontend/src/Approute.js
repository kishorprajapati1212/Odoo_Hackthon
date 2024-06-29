import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Productdetail from './Component/Product/Productdetail';
import Home from './Component/Home_page/Home';
import Login from './Component/Login_page/Login';
import Sign from './Component/Login_page/Sign';
import Forgot from './Component/Login_page/Forgot';
import Cart from './Component/Cart_pages/Cart';

const Approute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productdetail/:productId" element={<Productdetail />} />

      {/* Login Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Sign />} />
      <Route path="/forgotpas" element={<Forgot />} />

      <Route path="/cart" element={<Cart />} />


    </Routes>
  );
};

export default Approute;
