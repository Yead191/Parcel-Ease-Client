import React from 'react';
import { useQuery } from 'react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useDeliveryMan = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: isDeliveryMan, isLoading: isDeliveryManLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryMan'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/delivery/${user.email}`)
            return res.data?.deliveryMan
        }

    })
    return [isDeliveryMan, isDeliveryManLoading]
};

export default useDeliveryMan;