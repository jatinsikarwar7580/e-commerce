import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Login } from "../pages/login";
import { Home } from "../pages/home";
import {Checkout }from "../../src/components";

const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      
    
      <Route
        path="/checkout"
        element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
      />

      
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
      />
    </Routes>
  );
};

export default AppRoutes;
