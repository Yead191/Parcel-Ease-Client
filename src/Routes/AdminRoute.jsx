import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';
import React from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    if (user && isAdmin) {
        return children
    }

    return (
        <Navigate to={'/'} state={location.pathname}>
            {
                toast.error('You are not allowed to visit Admin Routes!')
            }
        </Navigate>
    );
};

export default AdminRoute;