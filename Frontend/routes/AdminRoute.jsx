import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../pages/admin/Login'
import Signup from '../pages/admin/Signup'
import Home from '../pages/admin/Home'
import VerifyOtp from '../pages/admin/VerifyOtp'
import ProtectedRoute from '../components/ProtectedRoutes'
import ComplaintPage from '../pages/admin/ComplaintPage'
import AnnouncmentPage from '../pages/admin/AnnouncmentPage'

const AdminRoute = () =>(
  <>
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin/signup" element={<Signup />} />
    <Route path="/admin/verify-otp" element={<VerifyOtp />} />    
    <Route path="/admin/home" element={
      <ProtectedRoute allowedRoles={["admin"]}>
          <Home />
      </ProtectedRoute>
    } />
        <Route path="/admin/complaint" element={
      <ProtectedRoute allowedRoles={["admin"]}>
          <ComplaintPage />
      </ProtectedRoute>
    } />
        <Route path="/admin/announcment" element={
      <ProtectedRoute allowedRoles={["admin"]}>
          <AnnouncmentPage />
      </ProtectedRoute>
    } />
  </>
)

export default AdminRoute