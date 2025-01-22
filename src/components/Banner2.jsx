import React from 'react';
import Lottie from "lottie-react";
import deliveryAnimation from "../assets/deliveryAnimation.json"; 
import { Button } from './ui/button';

const Banner2 = () => {
    return (
        <section className=" py-12 lg:py-0 px-6 lg:px-16  lg:w-10/12 xl:w-8/12 mx-auto">
            <div className="container mx-auto flex flex-col lg:h-[580px] justify-center lg:flex-row items-center gap-8">
                {/* Left Section: Lottie Animation */}
                <div className=" flex-1">
                    <Lottie className='lg:w-[400px] xl:w-[550px]' animationData={deliveryAnimation} loop={true} />
                </div>
                
                {/* Right Section: Text Content */}
                <div className="w-full flex-1 space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                        Simplify Your Deliveries with ParcelEase
                    </h2>
                    <p className="text-lg text-gray-600">
                        ParcelEase is your trusted partner for managing parcel deliveries. 
                        Whether you're booking, tracking, or ensuring your parcels reach their destination on time, 
                        we make the process seamless and efficient.
                    </p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </section>
    );
};

export default Banner2;
