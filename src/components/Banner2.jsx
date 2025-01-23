import React, { useRef } from 'react';
import Lottie from "lottie-react";
import deliveryAnimation from "../assets/deliveryAnimation.json";
import { Button } from './ui/button';
import { motion, useInView } from 'framer-motion';


const Banner2 = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <section className=" py-12 lg:py-0 px-6 lg:px-16  lg:w-10/12 xl:w-8/12 mx-auto" >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="container mx-auto flex flex-col lg:h-[580px] justify-center lg:flex-row items-center gap-8" ref={ref}>
                {/* Left Section: Lottie Animation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className=" flex-1">
                    <Lottie className='lg:w-[400px] xl:w-[550px]' animationData={deliveryAnimation} loop={true} />
                </motion.div>

                {/* Right Section: Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full flex-1 space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                        Simplify Your Deliveries with ParcelEase
                    </h2>
                    <p className="text-lg text-gray-600">
                        ParcelEase is your trusted partner for managing parcel deliveries.
                        Whether you're booking, tracking, or ensuring your parcels reach their destination on time,
                        we make the process seamless and efficient.
                    </p>
                    <Button>Get Started</Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner2;
