import React from 'react';
import { Parallax } from 'react-parallax';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bannerLottie from '../assets/delivery.json'
import bannerParcel from '../assets/parcelBanner.png';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import Banner2 from '@/components/Banner2';
import FeaturesSection from '@/components/FeaturesSection';
import ServicesSection from '@/components/ServicesSection';
import TopDeliveryMan from '@/components/TopDeliveryMan';
import Stats from '@/components/Stats';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className=''>
            <Helmet>
                <title>Home | Parcel Ease</title>
            </Helmet>
            <div className="banner-bg">
                <Parallax
                    blur={{ min: -50, max: 50 }}
                    bgClassName="object-cover"
                    bgImage={bannerParcel}
                    bgImageAlt="cover image"
                    strength={-200}
                >
                    {/* Overlay */}
                    <div className="relative  lg:h-[600px] flex items-center justify-center px-6 lg:px-16 ">
                        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center w-full max-w-6xl">
                            {/* Left Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="space-y-6 text-center lg:text-left pt-16 md:pt-0">
                                <h1 className="text-4xl xl:text-5xl font-bold text-white">
                                    Manage Your Parcel Deliveries Effortlessly
                                </h1>
                                <p className=" text-gray-200 sm:text-sm">
                                    With ParcelEase, track, book, and manage your deliveries all in one place. Simplify logistics and stay updated on your parcel's journey, all from one dashboard.
                                </p>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Search your parcel ID..."
                                        className="lg:max-w-screen-sm bg-white text-slate-800"
                                    />
                                    <Button className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] ">
                                        Search
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Right Section (Placeholder) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className=" lg:block">
                                <Lottie
                                    className="h-[400px] lg:h-[550px]"
                                    animationData={bannerLottie}
                                />
                            </motion.div>
                        </div>
                    </div>
                </Parallax>
            </div>
            {/* banner 2 */}
            <Banner2></Banner2>
            <FeaturesSection></FeaturesSection>
            <ServicesSection></ServicesSection>
            <Stats></Stats>
            <TopDeliveryMan></TopDeliveryMan>

        </div>
    );
};

export default Home;
