import React, { useRef } from 'react';
import Lottie from "lottie-react";
import deliveryAnimation from "../assets/deliveryAnimation.json";
import { Button } from './ui/button';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';


const Banner2 = () => {
    const ref = useRef(null);
    // const isInView = useInView(ref, { once: true });
    return (
        <section className=" py-12  px-6 lg:w-10/12 mx-auto" >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
                viewport={{once: true}}
                className="container mx-auto flex flex-col  justify-center lg:flex-row items-center gap-8" ref={ref}>
                {/* Left Section: Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className=" flex-1">
                    <Lottie className='lg:w-[500px] ' animationData={deliveryAnimation} loop={true} />
                </motion.div>

                {/* Right Section: Text Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex-1 space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                        Simplify Your Deliveries with ParcelEase
                    </h2>
                    <p className="text-lg text-gray-600">
                        ParcelEase is your trusted partner for managing parcel deliveries.
                        Whether you're booking, tracking, or ensuring your parcels reach their destination on time,
                        we make the process seamless and efficient.
                    </p>
                    <Link to={'/dashboard/book-parcel'}>

                        <Button>Get Started</Button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner2;
