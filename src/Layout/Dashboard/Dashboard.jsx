import React, { useState } from "react";
import {
    FaHome,
    FaCartPlus,
    FaHistory,
    FaRegCalendarAlt,
    FaEdit,
    FaConciergeBell,
    FaShoppingBag,
    FaEnvelope,
    FaBook,
    FaUser,
} from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { Link, NavLink, Outlet } from "react-router-dom";

import { FaBars, FaUsers } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import useAdmin from "@/hooks/useAdmin";
import useDeliveryMan from "@/hooks/useDeliveryMan";
import logo from '/parcel.png'

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isDeliveryMan] = useDeliveryMan()
    // console.log('admin:', isAdmin, 'delivery:', isDeliveryMan);

    const [isDrawerOpen, setDrawerOpen] = useState(false);


    const closeDrawer = () => setDrawerOpen(false);

    return (
        <div className="h-screen flex cinzel">
            {/* Sidebar for Large Devices */}
            <div className="w-64 hidden lg:block">

                <div style={{
                    background:
                        "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                }} className="  *:text-white lg:flex flex-col w-64 hidden min-h-screen fixed z-10">
                    <div className="p-6 font-bold text-center flex  items-center gap-1">
                        <h1 style={{ fontVariant: "small-caps" }} className="text-xl lg:text-3xl">Parcel Ease</h1>
                        <img className="w-10" src={logo} alt="" />
                    </div>

                    {/* Sidebar Links */}
                    <div className=" ">
                        {
                            isAdmin &&
                            <ul className="space-y-4 p-4 text-white">
                                <SidebarLink to="/dashboard/statistics" icon={<FaHome />} label="Statistics" />
                                <SidebarLink to="/dashboard/all-parcel" icon={<IoMdMenu />} label="All Parcel" />
                                <SidebarLink to="/dashboard/delivery-men" icon={<BsFillJournalBookmarkFill />} label="All Delivery Man" />
                                <SidebarLink to="/dashboard/users" icon={<FaUsers />} label="All Users" />
                                <SidebarLink to="/dashboard/profile" icon={<FaUser />} label="Admin Profile" />

                            </ul>
                        }
                        {
                            isDeliveryMan &&
                            <ul className="space-y-4 p-4 text-white">
                                <SidebarLink to="/dashboard/my-delivery" icon={<FaBook />} label="My Delivery List" />
                                <SidebarLink to="/dashboard/my-reviews" icon={<LiaEdit />} label="My Reviews" />
                                <SidebarLink to="/dashboard/profile" icon={<FaHome />} label="My Profile" />

                            </ul>

                        }

                        {!isAdmin && !isDeliveryMan &&
                            <ul className="space-y-4 p-4 text-white">
                                <SidebarLink to="/dashboard/profile" icon={<FaHome />} label="User Home" />
                                <SidebarLink to="/dashboard/book-parcel" icon={<FaBook />} label="Book Parcel" />
                                <SidebarLink to="/dashboard/my-parcel" icon={<LiaEdit />} label="My Parcels" />
                                <SidebarLink to="/dashboard/payment-history" icon={<FaHistory />} label="Payment History" />

                            </ul>
                        }
                    </div>

                    {/* Footer Links */}
                    <hr className="border-t border-white mx-4" />
                    <ul className="space-y-4 p-4 text-white lg:text-md">
                        <SidebarLink to="/" icon={<FaHome />} label="Home" />
                        <SidebarLink to="/about" icon={<FaHome />} label="About Us" />
                        <SidebarLink to="/contact" icon={<FaEnvelope />} label="Contact" />
                    </ul>
                </div>
            </div>

            {/* Top Navbar */}
            <div style={{
                background:
                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
            }} className="lg:hidden p-4  text-white flex flex-row-reverse items-center justify-between fixed z-10 w-full">
                <div className="flex items-center gap-2">
                    <Link style={{ fontVariant: 'small-caps' }} to="/" className="text-xl font-bold text-white">
                        Parcel Ease
                    </Link>
                    <img className="w-10" src={logo} alt="" />
                </div>
                <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                    {/* Drawer Trigger Button */}
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="text-white">
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
                        </Button>
                    </SheetTrigger>

                    {/* Drawer Content */}
                    <SheetContent
                        side="left"
                        className="bg-gray-50 text-gray-800"
                    >
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-gray-500 uppercase mb-4">
                                Menu
                            </h5>
                            {/* Links for small screens */}
                            {isAdmin && (
                                <ul className="space-y-4 p-4 text-white">
                                    <SidebarLink
                                        to="/dashboard/statistics"
                                        icon={<FaHome />}
                                        label="Statistics"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/all-parcel"
                                        icon={<IoMdMenu />}
                                        label="All Parcel"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/delivery-men"
                                        icon={<BsFillJournalBookmarkFill />}
                                        label="All Delivery Man"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/users"
                                        icon={<FaUsers />}
                                        label="All Users"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/profile"
                                        icon={<FaUser />}
                                        label="Admin Profile"
                                        onClick={closeDrawer}
                                    />
                                </ul>
                            )}
                            {isDeliveryMan && (
                                <ul className="space-y-4 p-4 text-white">
                                    <SidebarLink
                                        to="/dashboard/my-delivery"
                                        icon={<FaBook />}
                                        label="My Delivery List"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/my-reviews"
                                        icon={<LiaEdit />}
                                        label="My Reviews"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/profile"
                                        icon={<FaHome />}
                                        label="My Profile"
                                        onClick={closeDrawer}
                                    />
                                </ul>
                            )}
                            {!isAdmin && !isDeliveryMan && (
                                <ul className="space-y-4 p-4 text-white">
                                    <SidebarLink
                                        to="/dashboard/profile"
                                        icon={<FaHome />}
                                        label="User Home"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/book-parcel"
                                        icon={<FaBook />}
                                        label="Book Parcel"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/my-parcel"
                                        icon={<LiaEdit />}
                                        label="My Parcels"
                                        onClick={closeDrawer}
                                    />
                                    <SidebarLink
                                        to="/dashboard/payment-history"
                                        icon={<FaHistory />}
                                        label="Payment History"
                                        onClick={closeDrawer}
                                    />
                                </ul>
                            )}
                            {/* Footer Links */}
                            <hr className="border-t border-white mx-4" />
                            <ul className="space-y-4 p-4 text-white lg:text-md">
                                <SidebarLink to="/" icon={<FaHome />} label="Home" />
                                <SidebarLink to="/about" icon={<FaHome />} label="About Us" />
                                <SidebarLink to="/contact" icon={<FaEnvelope />} label="Contact" />
                            </ul>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col  p-2">
                <Outlet />
            </div>
        </div >
    );
};

const SidebarLink = ({ to, icon, label, onClick }) => (
    <li>
        <NavLink
            style={{ fontVariant: "small-caps" }}
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 ${isActive
                    ? "text-white border p-2 rounded-lg bg-black lg:text-md opacity-100"
                    : "text-slate-800 lg:text-white opacity-60 hover:text-pink-600"
                }`
            }
            onClick={onClick}
        >
            {icon} <span>{label}</span>
        </NavLink>
    </li>
);


export default Dashboard; 
