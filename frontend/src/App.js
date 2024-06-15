import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Giftpage from "./pages/Giftpage";
import ShoppingCart from "./pages/ShoppingCart";
import AdminDashboard from "./pages/adminpages/AdminDashboard"


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          {/* <Navbar /> */}
          <hr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/items" element={<Items />} />
            <Route path="/gift" element={<Giftpage />} />
            <Route path="/cart" element={<ShoppingCart />} />

            <Route path="/admin" element={
              <AdminDashboard />
            }></Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
