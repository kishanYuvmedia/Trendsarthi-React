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
import Courses from "pages/LMS/Courses"
import StudyMaterial from "pages/LMS/StudyMaterial"
import Unverse from "pages/LMS/Unverse"
import Newsfeed from "pages/LMS/Newsfeed"
import SubscriberTips from "pages/LMS/SubscriberTips"
import ViewCourse from "pages/LMS/ViewCourse"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // Admin navigation
  { path: "/admin/paymentOrders", component: <PaymentOrders /> },
  { path: "/admin/packages", component: <Packages /> },
  { path: "/admin/user-list", component: <UserList /> },
  
  // LMS navigation
  { path: "/LMS/courses", component: <Courses /> },
  { path: "/LMS/courses/viewCourse/:courseID", component: <ViewCourse /> },
  { path: "/LMS/StudyMaterial", component: <StudyMaterial /> },
  { path: "/LMS/Newsfeed", component: <Newsfeed /> },
  { path: "/LMS/SubscriberTips", component: <SubscriberTips /> },
  { path: "/LMS/Unverse", component: <Unverse /> },
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
