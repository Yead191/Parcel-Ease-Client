
import React, { useContext, useEffect, useState } from 'react';
import { motion } from "motion/react"
import { Link, useLocation, useNavigate, } from 'react-router-dom';
// import { AuthContext } from '../provider/AuthProvider';
// import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Lottie from 'lottie-react';
import regAnimation from '../assets/register.json'
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { IoWarningOutline } from 'react-icons/io5';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import SocialLogin from '@/components/SocialLogin';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';




const Register = () => {


    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()

    const { creteUser, updateUserProfile } = useAuth()


    const [showPass, setShowPass] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'

    const onSubmit = values => {
        // console.log(values)

        creteUser(values.email, values.password)
            .then(res => {
                const user = res.user
                // console.log(user);
                const userInfo = {
                    name: values.name,
                    email: values.email,
                    photo: values.photo,
                    createdAt: user?.metadata?.creationTime,
                    role: values.role
                }
                // console.log(userInfo);
                updateUserProfile(values.name, values.photo)
                    .then(() => {
                        toast.success(`Successfully Created Account as: ${values.name}`)
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                // console.log(res);
                                if (res.data.insertedId) {
                                    reset()
                                    navigate(from)


                                }

                            })

                    })
                    .catch(error => toast.error(error))
            })
            .catch(error => toast.error(error.message))

    };


    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="flex items-center justify-center min-h-screen bg-base-100">
            <Helmet>
                <title >Register | Parcel Ease</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-white max-w-4xl w-full">
                {/* Left Section */}
                <div className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] text-white p-8 lg:w-1/2 flex flex-col justify-center items-center rounded-l-lg md:rounded-tr-[100px] md:rounded-br-[100px]">
                    <Lottie className='h-48' animationData={regAnimation}></Lottie>
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="mb-6 text-center">
                        Enter your personal details to use all of the site's features.
                    </p>
                    <Link to='/login' className="bg-white text-purple-700 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition">
                        SIGN IN
                    </Link>
                </div>

                {/* Right Section */}
                <div className="p-8 lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Create Account</h2>
                    <SocialLogin></SocialLogin>

                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                        <input

                            {...register("name", {
                                required: "Required",
                            })}
                            name='name'
                            type="text"
                            placeholder="Name"
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.name &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline /> Name is Required</p>
                        }
                        <input
                            {...register("photo")}
                            name='photo'
                            type="text"
                            placeholder="Photo URL"
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {/* {errors.photo &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline /> Photo URL is Required</p>
                        } */}
                        {/* Choose Role Dropdown */}
                        <div className="w-full mb-4">
                            <Select
                                onValueChange={(value) => {
                                    setValue("role", value);
                                }}
                            >
                                <SelectTrigger className="w-full border rounded-md px-4 py-2">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="User">User</SelectItem>
                                    <SelectItem value="DeliveryMan">Delivery Man</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-red-500 mb-1 inline-flex items-center gap-1 text-sm">
                                    <IoWarningOutline /> Role is required
                                </p>
                            )}
                        </div>

                        <input
                            {...register("email", {
                                required: "Required",
                            })}
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.email &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline /> Invalid Email</p>
                        }
                        <div className="relative w-full mb-4">
                            <input
                                {...register("password", {
                                    required: "Required",
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
                                })}
                                type={showPass ? 'text' : 'password'}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Password"
                                name="password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline />  Password is Required</p>
                        }
                        {errors.password?.type === 'minLength' &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1'> <IoWarningOutline /> Password Must be more than 6 Character </p>
                        }
                        {errors.password?.type === 'pattern' &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-xs'> <IoWarningOutline /> Password Must Have 1 UpperCase , 1 Lower Case, 1 Number & a Special Character </p>
                        }
                        <div className='flex justify-center items-center'>

                            <button className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] text-white hover:bg-purple-700 px-6 py-2 rounded-lg font-medium transition hover:scale-110">
                                SIGN UP
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </motion.div>
    );
};

export default Register;

