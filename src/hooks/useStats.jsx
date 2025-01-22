import React from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from './useAxiosSecure';

const useStats = () => {
    const axiosSecure = useAxiosSecure()
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stats')
            return res.data
        }
    })
    return [stats, statsLoading]
};

export default useStats;