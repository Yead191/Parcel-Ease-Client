import useAxiosPublic from '@/hooks/useAxiosPublic';
import React from 'react';
import { useQuery } from 'react-query';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
const TopDeliveryMan = () => {
    const axiosPublic = useAxiosPublic()
    const { data: topDeliveries = [] } = useQuery({
        queryKey: ['topDeliveries'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top-delivery-men')
            return res.data
        }
    })
    // console.log(topDeliveries);
    return (
        <div className='mt-8 mb-16'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ y: 0, opacity: 1 }}
                className='text-center'
            >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    Top Delivery Man
                </h2>
                <p className="text-gray-600 mb-12">
                    Meet Our Top Delivery Men
                </p>
            </motion.div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12  place-items-center md:w-10/12 lg:w-8/12 xl:w-6/12 gap-6 mx-auto'>

                {
                    topDeliveries?.slice(0, 3).map(delivery => <motion.Card
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="w-full ">
                        <CardHeader className="p-0 h-64 md:h-56 ">
                            <img
                                className="object-cover object-top w-full h-full rounded-t-lg"
                                src={delivery.photo}
                                alt="avatar"
                            />
                        </CardHeader>
                        <CardContent className="py-5 ">
                            <CardTitle className="text-xl font-bold">{delivery.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-700 dark:text-gray-200">
                                {delivery.role}
                            </CardDescription>
                            <div className="mt-3">
                                <p className="text-sm font-semibold">
                                    Parcels Delivered: <span className="font-medium">{delivery.totalDelivered}</span>
                                </p>
                                <p className="text-sm font-semibold">
                                    Average Rating: <span className="font-medium">{(delivery.totalRating / delivery.reviewCount).toFixed(2)}/5</span>
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center  justify-start px-4 py-3">
                            <Button variant="">Contact</Button>
                        </CardFooter>
                    </motion.Card>)
                }



            </div>

        </div>
    );
};

export default TopDeliveryMan;