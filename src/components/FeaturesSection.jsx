import React, { useRef } from 'react';
import { FaShippingFast, FaUserShield, FaSyringe, FaShieldAlt } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
const FeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <section className="bg-gray-100 py-12 px-6 lg:px-16" >
            <div className="container mx-auto">
                {/* First Row: Features */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    ref={ref}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center flex flex-col items-center">
                        <div className="text-5xl text-blue-500 mb-4">
                            <FaShippingFast />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Swift Delivery</h3>
                        <p className="text-gray-600">Fast and reliable parcel delivery service.</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center flex flex-col items-center">
                        <div className="text-5xl text-green-500 mb-4">
                            <FaUserShield />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Trusted Service</h3>
                        <p className="text-gray-600">Service you can trust with peace of mind.</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center flex flex-col items-center">
                        <div className="text-5xl text-yellow-500 mb-4">
                            <FaSyringe />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Vaccinated Couriers</h3>
                        <p className="text-gray-600">Safety and health protocols ensured.</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center flex flex-col items-center">
                        <div className="text-5xl text-red-500 mb-4">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Safety Protocol</h3>
                        <p className="text-gray-600">Your parcels are handled with care.</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;