import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import Home from "./pages/Home";
import Items from "./pages/Items";
import Giftpage from "./pages/Giftpage";
import ShoppingCart from "./pages/ShoppingCart";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLayout from "./Layouts/AdminLayout";
import AdminItems from "./pages/adminpages/AdminItems";
import Navbar from "./Components/Navbar/Navbar";
import UserLayout from "./Layouts/UserLayout";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <hr />
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="items" element={<Items />} />
              <Route path="gift" element={<Giftpage />} />
              <Route path="cart" element={<ShoppingCart />} />
            </Route>

            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="items" element={<AdminItems />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
