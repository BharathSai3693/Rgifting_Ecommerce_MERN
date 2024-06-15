import React, { useState, useEffect } from 'react';
import { signIn } from '../auth'; // Assuming signOut function is available for logging out
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      console.log("Login", currentUser)
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {currentUser && <p className="text-center mb-4">Logged in as: {currentUser.email}</p>}
        {!currentUser && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
};

export default Login;
