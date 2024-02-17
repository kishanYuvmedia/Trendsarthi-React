import React from "react"
import { Navigate } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import UserList from "../pages/Registered-Users/user-list"

import AddCategory from "pages/Settings/Add-Category"
import AddInfluencer from "pages/Registered-Users/add-influencer"
import InfluencerList from "pages/Registered-Users/influencer-list"
import Upload from "pages/Registered-Users/upload"
import PaymentOrders from "pages/Dashboard/PaymentOrders"
import Packages from "pages/Dashboard/Packages"
import Courses from "pages/Dashboard/Courses"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard/paymentOrders", component: <PaymentOrders /> },
  { path: "/dashboard/packages", component: <Packages /> },
  { path: "/dashboard/user-list", component: <UserList /> },
  { path: "/dashboard/courses", component: <Courses /> },
  
  // old navigation
  { path: "/settings/add-category", component: <AddCategory /> },
  { path: "/influencer/add-influencer", component: <AddInfluencer /> },
  { path: "/influencer/influencer-list", component: <InfluencerList /> },
  { path: "/influencer/add-Images-Vedio/:profileId", component: <Upload /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]
const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
]

export { authProtectedRoutes, publicRoutes }
