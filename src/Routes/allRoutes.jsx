import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Product from "../pages/product/Index";
import Cart from "../pages/cart/Index";
import Purchase from "../pages/purchase/Index";

const authProtectedRoutes = [
  {
    path: "/product",
    component: <Product />,
  },
  {
    path: "/cart",
    component: <Cart />,
  },
  {
    path: "/purchase",
    component: <Purchase />,
  },
  { path: "*", component: <Navigate to="/" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
