import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminRoute = ({ element, ...rest }) => {
  const { currentUser } = useAuth();

  // if (!currentUser || !currentUser.isAdmin) {
  //   return <Navigate to="/login" />;
  // }

  console.log(currentUser)
  if (!currentUser) {
    alert("KJHGC")
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={element} />;
};

export default AdminRoute;
