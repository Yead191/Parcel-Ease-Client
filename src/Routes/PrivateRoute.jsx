import useAuth from '@/hooks/useAuth';
import React from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    if (user && user.email) {
        return children

    }

    return <Navigate to={'/login'} state={location.pathname}>
        {
            toast.error('Please Login to Continue!')
        }
    </Navigate>
};

export default PrivateRoute;