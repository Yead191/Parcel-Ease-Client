import ReviewCard from '@/components/ReviewCard';
import SectionHeading from '@/components/SectionHeading';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React from 'react';
import { useQuery } from 'react-query';

const MyReviews = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: MyReviews = [] } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user.email}`)
            return res.data
        }
    })
    // console.log(MyReviews);
    return (
        <div>
            <SectionHeading heading={"My Reviews"}></SectionHeading>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-11/12 mx-auto gap-3' >
                {
                    MyReviews.map(review => (
                        <ReviewCard review={review}></ReviewCard>
                    ))
                }
            </div>
        </div>
    );
};

export default MyReviews;