import { SiteFooter } from '@/SharedComponents/Footer';
import Footer from '@/SharedComponents/Footer1';
import Navbar from '@/SharedComponents/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='cinzel flex flex-col min-h-screen'>
            root
            <nav className='h-[68px]'>
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