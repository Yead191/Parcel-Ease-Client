import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';

const useDelivery = () => {
    const axiosSecure = useAxiosSecure()

    const { data: deliveryMen = [], isLoading, refetch } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/delivery-men')
            return res.data
        }
    })
    return [deliveryMen, isLoading, refetch]
};

export default useDelivery;