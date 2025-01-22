import { SiteFooter } from '@/SharedComponents/Footer';
import Footer from '@/SharedComponents/Footer1';
import Navbar from '@/SharedComponents/Navbar';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '/parcel.png'


const Root = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulating a short delay to display loader
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    if (loading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#540654] border-solid">
            </div>
            <div className='flex items-center gap-2'>
                <h1 className="text-[#540654] text-2xl lg:text-3xl font-semibold"
                    style={{ fontVariant: "small-caps" }}
                >
                    Parcel Ease
                </h1>
                <img className="w-12" src={logo} alt="" />
            </div>

        </div>

    }
    return (
        <div className='cinzel flex flex-col min-h-screen'>
            root
            <nav className='h-[48px]'>
                <Navbar></Navbar>
            </nav>
            <main className='flex-grow'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
                {/* <SiteFooter></SiteFooter> */}
            </footer>

        </div>
    );
};

export default Root;