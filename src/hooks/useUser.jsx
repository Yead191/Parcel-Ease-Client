import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from 'react-query';

const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
    })
    return [users, refetch, isLoading]
};

export default useUser;