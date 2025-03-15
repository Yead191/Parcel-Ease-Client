import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Lottie from 'lottie-react';
import loginLottie from '../assets/login.json';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import useAuth from '@/hooks/useAuth';
import SocialLogin from '@/components/SocialLogin';
import { Badge } from '@/components/ui/badge';

const Login = () => {
    const { loginUser } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleBadgeClick = (email, password) => {
        setCredentials({ email, password });
    };

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(res => {
                const user = res.user;
                toast.success(`Logged in as: ${user.displayName}`);
                navigate(from);
                form.reset();
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="flex items-center justify-center min-h-screen bg-base-100">
            <Helmet>
                <title>Login | Parcel Ease</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-white max-w-4xl w-full">
                {/* Left Section */}
                <div className="p-8 lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign In</h2>
                    <SocialLogin />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}

                        className="flex gap-3 mb-4">
                        <Badge className="cursor-pointer bg-[#540654]" onClick={() => handleBadgeClick('yead@user.com', 'Yead123@456')}>User</Badge>
                        <Badge className="cursor-pointer bg-[#cc0d85]" onClick={() => handleBadgeClick('sajib@bormon.com', 'Yead123@456')}>DeliveryMan</Badge>
                        <Badge className="cursor-pointer bg-green-400" onClick={() => handleBadgeClick('yead@admin.com', 'Yead123@456')}>Admin</Badge>
                    </motion.div>
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
                        onSubmit={handleLogin} className='w-full'>
                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#540654]"
                            required />
                        <div className="relative w-full mb-4">
                            <input
                                type={showPass ? 'text' : 'password'}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#540654]"
                                placeholder="Password"
                                name="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
                            className='flex items-center justify-center'>
                            <button className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] hover:bg-purple-7 text-white px-6 py-2 rounded-xl font-medium transition hover:scale-110">
                                SIGN IN
                            </button>
                        </motion.div>
                    </motion.form>
                </div>

                {/* Right Section */}
                <div className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] text-white p-8 lg:w-1/2 flex flex-col justify-center items-center rounded-r-lg md:rounded-tl-[100px] md:rounded-bl-[100px]">
                    <Lottie className='w-full h-36' animationData={loginLottie}></Lottie>
                    <p className="my-2 text-sm text-center">
                        Register with your personal details to use all of the site's features.
                    </p>
                    <Link to='/register' className="bg-white text-purple-700 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition hover:scale-110">
                        SIGN UP
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
