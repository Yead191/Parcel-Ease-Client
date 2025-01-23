import axios from 'axios';
import React from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://parcel-ease-server-snowy.vercel.app'
})
const useAxiosPublic = () => {
    return axiosSecure
};

export default useAxiosPublic;