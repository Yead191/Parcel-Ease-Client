import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBox, FaHamburger, FaShoppingBasket } from 'react-icons/fa';

const ServicesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className="bg-white py-12 px-6 lg:px-16" >
            <div className="container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }} ref={ref}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        We Deliver Everything
                    </h2>
                    <p className="text-gray-600 mb-12">
                        From food to groceries, we’ve got you covered.
                    </p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    ref={ref}
                >
                    {/* Card 1 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}

                        className="p-6 bg-[#F0EFE6] rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
                        <div className="text-5xl text-orange-500 mb-4">
                            <FaHamburger />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Food And Drinks</h3>
                        <p className="text-gray-600">Fresh meals delivered to your door.</p>
                        <button className="mt-4 px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600">
                            Order Now
                        </button>
                    </motion.div>
                    {/* Card 2 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}

                        className="p-6 bg-[#F0EFE6] rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
                        <div className="text-5xl text-blue-500 mb-4">
                            <FaBox />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Packages</h3>
                        <p className="text-gray-600">Safe and secure parcel delivery.</p>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">
                            Order Now
                        </button>
                    </motion.div>
                    {/* Card 3 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}

                        className="p-6 bg-[#F0EFE6] rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
                        <div className="text-5xl text-green-500 mb-4">
                            <FaShoppingBasket />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Groceries</h3>
                        <p className="text-gray-600">Essentials at your doorstep.</p>
                        <button className="mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600">
                            Order Now
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
