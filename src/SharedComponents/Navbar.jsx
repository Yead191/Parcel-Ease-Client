import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button"

const Navbar = () => {
    const [theme, setTheme] = useState("light");

    // const toggleTheme = () => {
    //     const newTheme = theme === "light" ? "dark" : "light";
    //     setTheme(newTheme);
    //     document.documentElement.setAttribute("data-theme", newTheme);
    // };

    const links = (
        <ul className="flex flex-col gap-4 lg:flex-row lg:gap-6 text-white">
            <li>
                <NavLink to="/" className="hover:text-pink-600">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/find-tutors" className="hover:text-pink-600">
                    Find Tutors
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className="hover:text-pink-600">
                    About Us
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className="hover:text-pink-600">
                    Contact Us
                </NavLink>
            </li>
        </ul>
    );

    return (
        <nav
            style={{
                background:
                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
            }}
            className="fixed top-0 z-50 w-full shadow-md lg:px-20"
        >
            <div className="flex items-center justify-between px-4 py-3">


                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-gray-50 text-gray-800">
                            <div className="p-4">
                                <h5 className="text-lg font-semibold text-gray-500 uppercase mb-4">
                                    Menu
                                </h5>
                                {links}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                {/* Logo */}
                <Link
                    to="/"
                    className="text-white text-2xl lg:text-3xl font-semibold"
                    style={{ fontVariant: "small-caps" }}
                >
                    Parcel Ease
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:block ">
                    <div className=" flex items-center gap-6 ">

                        {links}
                        <Link to={'/register'} className={buttonVariants({ variant: "outline" })}>Register</Link>

                    </div>


                </div>

                {/* Theme Toggle */}
                <div className="lg:hidden">
                    <Link to={'/register'} className={buttonVariants({ variant: "outline" })}>Register</Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
