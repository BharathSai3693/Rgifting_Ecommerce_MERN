import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';


import { AuthProvider } from './AuthContext'; // Import AuthProvider

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <hr></hr>
        <Routes>
          <Route path="/" element={<AuthProvider>
                <Login />
              </AuthProvider> } />
          <Route path="/login" element={<AuthProvider>
                <Login />
              </AuthProvider>} />
          <Route path="/signup" element={
              <AuthProvider>
                <Signup />
              </AuthProvider>} />
          
          {/* Wrap protected routes with AuthProvider */}
          <Route
            path="/dashboard"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
