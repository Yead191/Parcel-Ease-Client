import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Lottie from 'lottie-react';
import loginLottie from '../assets/login.json'
// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

// import SocialLogin from '../components/SocialLogin';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import useAuth from '@/hooks/useAuth';
import SocialLogin from '@/components/SocialLogin';




const Login = () => {


    // useEffect(() => {
    //     loadCaptchaEnginge(6)

    // }, [])
    const { loginUser } = useAuth()



    // const [disabled, setDisabled] = useState(true)


    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    // console.log(location, 'location');

    const navigate = useNavigate()
    const from = location.state || '/'
    // console.log('login', location.state);


    // const handleCaptcha = (e) => {
    //     const captchaValue = e.target.value
    //     // console.log(value);
    //     if (validateCaptcha(captchaValue)) {
    //         setDisabled(false)
    //     }
    //     else {
    //         setDisabled(true)
    //     }
    // }
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        loginUser(email, password)
            .then(res => {
                const user = res.user
                toast.success(`Logged in as: ${user.displayName}`)
                // console.log(res.user);
                navigate(from)
                form.reset()

            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)

            });

    }

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="flex items-center justify-center min-h-screen bg-base-100">
            <Helmet>
                <title>Login | Parcel Ease</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-white max-w-4xl w-full">
                {/* Left Section */}
                <div className="p-8 lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign In</h2>
                    <SocialLogin></SocialLogin>
                    <form onSubmit={handleLogin} className='w-full'>
                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required />
                        <div className="relative w-full mb-4">
                            <input
                                type={showPass ? 'text' : 'password'}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Password"
                                name="password"
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

                        {/* <div>
                            <LoadCanvasTemplate />
                            <input
                                onBlur={handleCaptcha}
                                name='captcha'
                                type="text"
                                placeholder="Enter Captcha Code"
                                className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                required />

                        </div> */}



                        <div className='flex items-center justify-center'>

                            <button

                                className={` bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] hover:bg-purple-7 text-white 00 px-6 py-2 rounded-xl font-medium transition hover:scale-110`}>
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section */}
                <div className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654]  text-white p-8 lg:w-1/2 flex flex-col justify-center items-center rounded-r-lg md:rounded-tl-[100px] md:rounded-bl-[100px]">
                    <Lottie className='w-full h-36 ' animationData={loginLottie}></Lottie>
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