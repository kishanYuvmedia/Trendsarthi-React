import React from "react"
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
// Dashboard
import Dashboard from "../pages/Dashboard/index"
// Derivatives
import DerivativeDashboard from "pages/Derivatives/DerivativeDashboard"
import OptionChain from "pages/Derivatives/OptionChain"
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  // derivatives
  { path: "/DerivativeDashboard", component: <DerivativeDashboard /> },
  { path: "/NiftyOptionChain", component: <OptionChain type="NIFTY" /> },
  {
    path: "/BankNiftyOptionChain",
    component: <OptionChain type="BANKNIFTY" />,
  },
  { path: "/FinNiftyOptionChain", component: <OptionChain type="FINNIFTY" /> },
  { path: "/MidCapOptionChain", component: <OptionChain type="MIDCPNIFTY" /> },
]

const publicRoutes = [
  { path: "/", component: <Login /> },
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }
