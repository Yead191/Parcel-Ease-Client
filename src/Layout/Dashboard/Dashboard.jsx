import React from "react";
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

const Dashboard = () => {
    const isAdmin = false;
    const isDeliveryMan = false

    return (
        <div className="h-screen flex cinzel">
            {/* Sidebar for Large Devices */}
            <div className="w-64 hidden lg:block">

                <div style={{
                    background:
                        "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                }} className="  *:text-white lg:flex flex-col w-64 hidden min-h-screen fixed z-10">
                    <div className="p-6 font-bold text-center ">
                        <h1 style={{ fontVariant: "small-caps" }} className="text-xl lg:text-3xl">Parcel Ease</h1>
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
                        <SidebarLink to="/contact" icon={<FaEnvelope />} label="Contact" />
                    </ul>
                </div>
            </div>

            {/* Top Navbar */}
            <div style={{
                background:
                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
            }} className="lg:hidden p-4  text-white flex flex-row-reverse items-center justify-between fixed z-10 w-full">
                <Link style={{ fontVariant: 'small-caps' }} to="/" className="text-xl font-bold text-white">
                    Parcel Ease
                </Link>
                <Sheet>
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
                    <SheetContent side="left" className="bg-gray-50 text-gray-800">
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-gray-500 uppercase mb-4">
                                Services
                            </h5>
                            {/* Links for small screens */}
                            <ul className="space-y-4 ">
                                {isAdmin ? (
                                    <>

                                        <SidebarLink to="/dashboard/add-items" icon={<ImSpoonKnife />} label="Add Items" />
                                        <SidebarLink to="/dashboard/manage-items" icon={<IoMdMenu />} label="Manage Items" />
                                        <SidebarLink to="/dashboard/payment" icon={<BsFillJournalBookmarkFill />} label="Manage Bookings" />
                                        <SidebarLink to="/dashboard/users" icon={<FaUsers />} label="All Users" />
                                        <SidebarLink to="/dashboard/profile" icon={<FaUser />} label="Admin Profile" />
                                    </>
                                ) : (
                                    <>
                                        <SidebarLink to="/dashboard/userHome" icon={<FaHome />} label="User Home" />
                                        <SidebarLink to="/dashboard/book-parcel" icon={<FaBook />} label="Book Parcel" />
                                        <SidebarLink to="/dashboard/payment" icon={<FaHistory />} label="Payment" />
                                        <SidebarLink to="/dashboard/cart" icon={<FaCartPlus />} label="My Cart" />
                                        <SidebarLink to="/dashboard/add-review" icon={<FaEdit />} label="Add Review" />
                                        <SidebarLink to="/dashboard/payment-history" icon={<FaConciergeBell />} label="Payment History" />
                                    </>
                                )}
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

const SidebarLink = ({ to, icon, label }) => (
    <li>
        <NavLink
            style={{ fontVariant: "small-caps" }}
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 ${isActive ? "text-white border p-2 rounded-lg bg-black lg:text-md opacity-100" : "text-slate-800 lg:text-white opacity-60 hover:text-pink-600"
                }`
            }
        >
            {icon} <span>{label}</span>
        </NavLink>
    </li>
);

export default Dashboard; 
