import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import StoresList from './pages/StoresList';
import StoreDetail from './pages/StoreDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/stores" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/stores" element={<ProtectedRoute><StoresList /></ProtectedRoute>} />
        <Route path="/stores/:id" element={<ProtectedRoute><StoreDetail /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute role="System Administrator"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute role="Normal User"><UserDashboard /></ProtectedRoute>} />
        <Route path="/owner" element={<ProtectedRoute role="Store Owner"><OwnerDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
