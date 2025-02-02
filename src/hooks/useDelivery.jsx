import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from './useAuth';

const useDelivery = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: deliveryMen = [], isLoading, refetch: deliveryRefetch } = useQuery({
        queryKey: ['deliveryMen', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/delivery-men')
            return res.data
        }
    })
    return [deliveryMen, isLoading, deliveryRefetch]
};

export default useDelivery;