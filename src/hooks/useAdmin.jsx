import React from 'react';
import { useQuery } from 'react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin 
        }

    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;