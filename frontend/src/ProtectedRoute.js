// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const isAdmin = localStorage.getItem('isAdmin'); // Adjust this based on how you store admin status

//   return isAdmin ? children : <Navigate to="/admin-login" />;
// };

// export default ProtectedRoute;
