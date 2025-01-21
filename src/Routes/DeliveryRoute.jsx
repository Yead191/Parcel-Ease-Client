import useAuth from '@/hooks/useAuth';
import useDeliveryMan from '@/hooks/useDeliveryMan';
import React from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const DeliveryRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan()

    if (loading || isDeliveryManLoading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    if (user && isDeliveryMan) {
        return children
    }
    
    toast.error('You are not allowed to visit Delivery Man Routes!')
    return (
        <Navigate to={'/'}>    
        </Navigate>
    );
};

export default DeliveryRoute;