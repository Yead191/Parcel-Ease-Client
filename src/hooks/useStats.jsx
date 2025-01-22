import React from 'react';
import { useQuery } from 'react-query';

import useAxiosPublic from './useAxiosPublic';

const useStats = () => {
    // const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stats')
            return res.data
        }
    })
    return [stats, statsLoading]
};

export default useStats;