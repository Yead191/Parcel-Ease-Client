import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from 'react-query';

const useParcel = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, data: parcels = [], isLoading } = useQuery({
        queryKey: ['parcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        }
    })
    return [parcels, refetch, isLoading]
};

export default useParcel;