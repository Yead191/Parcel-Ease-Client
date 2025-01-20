import ParcelTable from '@/components/ParcelTable';
import SectionHeading from '@/components/SectionHeading';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useParcel from '@/hooks/useParcel';
import React from 'react';
import { useQuery } from 'react-query';

const MyParcel = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    // const { data: parcels = [], isLoading } = useQuery({
    //     queryKey: ['parcels'],
    //     enabled: !loading,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/parcels/${user.email}`)
    //         return res.data
    //     }
    // })
    const [parcels, refetch, isLoading] = useParcel()
    // console.log(parcels);
    if (loading || isLoading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    return (
        <div>
            <SectionHeading heading={'My Parcels'}></SectionHeading>
            <ParcelTable  parcels={parcels}></ParcelTable>
        </div>
    );
};

export default MyParcel;