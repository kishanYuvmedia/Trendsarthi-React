import React from "react"
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Successfully from "../pages/Authentication/Successfully"
import SubscribePlan from "pages/Authentication/SubscribePlan"
import PlanView from "pages/Authentication/planView"
import IndicatorChart from "pages/Dashboard/Indicator-chart"
// Dashboard
import Dashboard from "../pages/Dashboard/index"
import DeliveryAverageScanner from "pages/Dashboard/delivery-average-scanner"
// Derivatives
import DerivativeDashboard from "pages/Derivatives/DerivativeDashboard"
import OptionChain from "pages/Derivatives/OptionChain"
import { Mustwatch } from "pages/MustWatch/mustwatch"
import Sectors from "pages/MustWatch/sectors"
import MarketPulse from "pages/Marketpulse/MarketPulse"



const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/Indicator-chart", component: <IndicatorChart /> },
  // derivatives
  { path: "/DerivativeDashboard", component: <DerivativeDashboard /> },
  { path: "/NiftyOptionChain", component: <OptionChain type="NIFTY" /> },
  { path: "/BankNiftyOptionChain", component: <OptionChain type="BANKNIFTY" />, },
  { path: "/FinNiftyOptionChain", component: <OptionChain type="FINNIFTY" /> },
  { path: "/MidCapOptionChain", component: <OptionChain type="MIDCPNIFTY" /> },
  { path: "/mustwatch", component: <Mustwatch /> },
  { path: "/sectors/:product", component: <Sectors /> },
  { path: "/delivery-average-scanner", component: <DeliveryAverageScanner /> },

  // New page
  { path: "/marketpulse", component: <MarketPulse /> },
]
const publicRoutes = [
  { path: "/", component: <Login /> },
  // { path: "/dashboard", component: <Dashboard /> },

  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/successfully/:username", component: <Successfully /> },
  { path: "/subscribe-plan/:username", component: <SubscribePlan /> },
  { path: "/plan-view/:username/:planId", component: <PlanView /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }
