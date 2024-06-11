import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import Items from "./pages/Items";
import Giftpage from "./pages/Giftpage";
import ShoppingCart from "./pages/ShoppingCart";
import AdminLayout from "./Components/admin/AdminLayout";

const App = () => {
  
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <hr></hr>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/items" element={<Items />} />
            <Route path="/gift" element={<Giftpage />} />
            <Route path="/cart" element={<ShoppingCart />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* <Route path="additems" element={<AddItems />} /> */}
              {/* Add more admin routes as needed */}
            </Route>
            
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
