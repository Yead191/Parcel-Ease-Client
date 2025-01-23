import { useEffect } from "react";
import { FaTruck, FaRegClipboard, FaUsers, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

import useStats from "@/hooks/useStats";
import Lottie from "lottie-react";
import { motion } from 'framer-motion'
import parcel from '../assets/parcel.json'
import { Button } from "@/components/ui/button";

const About = () => {
    useEffect(() => {
        document.title = "About | Parcel Ease";
    }, []);

    const [stats, statsLoading] = useStats();

    if (statsLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid"></div>
            </div>
        );
    }

    return (
        <div className=" py-16 px-8">
            <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Section */}
                <div>
                    <h3 className="text-primary text-lg font-bold mb-2">Our Mission</h3>
                    <h1 className="text-4xl font-bold mb-6">
                        Simplifying Parcel Management, One Delivery at a Time
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        <span className="font-bold">Parcel Ease</span> is revolutionizing the way parcels are managed.
                        Whether you're booking a shipment, tracking parcel status, or ensuring a secure delivery,
                        our platform provides a seamless solution for users, admins, and delivery personnel alike.
                        We are committed to efficiency, transparency, and reliability, making parcel management easier for everyone.
                    </p>
                </div>

                {/* Right Section */}
                <div className="grid gap-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className=" flex-1">
                        <Lottie className='lg:w-[400px] xl:w-[550px]' animationData={parcel} loop={true} />
                    </motion.div>



                    <div className="grid grid-cols-2 gap-4">
                        {/* Stat 1 */}
                        <div className="bg-secondary p-4 rounded-lg shadow-md flex items-center space-x-3">
                            <FaTruck className="text-primary text-2xl" />
                            <div>
                                <p className="text-2xl font-bold">3+</p>
                                <p className="text-muted-foreground">Years of Excellence</p>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-secondary p-4 rounded-lg shadow-md flex items-center space-x-3">
                            <FaRegClipboard className="text-primary text-2xl" />
                            <div>
                                <p className="text-2xl font-bold">{stats.deliveries}+</p>
                                <p className="text-muted-foreground">Parcel Delivered</p>
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-secondary p-4 rounded-lg shadow-md flex items-center space-x-3">
                            <FaUsers className="text-primary text-2xl" />
                            <div>
                                <p className="text-2xl font-bold">{stats.users}+</p>
                                <p className="text-muted-foreground">Trusted Users</p>
                            </div>
                        </div>

                        {/* Stat 4 */}
                        <div className="bg-secondary p-4 rounded-lg shadow-md flex items-center space-x-3">
                            <FaDollarSign className="text-primary text-2xl" />
                            <div>
                                <p className="text-2xl font-bold">100%</p>
                                <p className="text-muted-foreground">Secure Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <Link to="/contact" className=" text-white">
                        <Button>Contact Us</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
