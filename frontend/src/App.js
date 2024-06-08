import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./AuthContext"; // Import AuthProvider
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Items from "./pages/Items";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <hr></hr>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/items" element={<Items />} />
            <Route path="/additems" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }/> 
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
