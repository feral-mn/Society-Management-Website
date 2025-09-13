import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../pages/user/Login'
import Signup from '../pages/user/Signup'
import Home from '../pages/user/Home'
import VerifyOtp from '../pages/user/VerifyOtp'
import Profile from '../pages/user/Profile'
import ProtectedRoute from '../components/ProtectedRoutes'
import ComplaintPage from '../pages/user/ComplaintPage'
import AnnouncmentPage from '../pages/user/AnnouncmentPage'
const UserRoute = () => (
<>
    <Route path="/user/login" element={<Login />} />
    <Route path="/user/signup" element={<Signup />} />
    <Route path="/user/verify-otp" element={<VerifyOtp />} />

    <Route path="/user/home" element={
        <ProtectedRoute allowedRoles={["user"]}>
            <Home />
        </ProtectedRoute>
    } />
    <Route path="/user/complaint" element={
        <ProtectedRoute allowedRoles={["user"]}>
            <ComplaintPage />
        </ProtectedRoute>
    } />
        <Route path="/user/announcment" element={
        <ProtectedRoute allowedRoles={["user"]}>
            <AnnouncmentPage />
        </ProtectedRoute>
    } />
    
    <Route path="/user/profile" element={<Profile />} />         
</>
)

export default UserRoute
