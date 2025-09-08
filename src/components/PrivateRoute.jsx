// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';

const PrivateRoute = ({ children }) => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <div>Cargando...</div>;
    }

    return loggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;