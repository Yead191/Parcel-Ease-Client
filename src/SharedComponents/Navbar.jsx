import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { MdDashboard } from "react-icons/md";
import userimg from "../assets/user.png";
import logo from "/parcel.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const { user, logOut } = useAuth();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  // const toggleTheme = () => {
  //     const newTheme = theme === "light" ? "dark" : "light";
  //     setTheme(newTheme);
  //     document.documentElement.setAttribute("data-theme", newTheme);
  // };
  // console.log(user);
  const handleLogout = () => {
    toast.promise(logOut(), {
      loading: "Logging out...",
      success: <b>Log out Successful!</b>,
      error: (error) => <b>{error.message}</b>,
    });
  };

  const links = (
    <ul className="flex flex-col gap-4 lg:flex-row lg:gap-6  ">
      <li>
        <NavLink to="/" className="hover:text-pink-600 ">
          Home
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
      className="fixed top-0 z-50 w-full shadow-md lg:px-20 py-0"
    >
      <div className="flex items-center justify-between px-4  py-1">
        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
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
                <h5 className="text-lg font-semibold text-gray-500 uppercase ">
                  Menu
                </h5>
                <hr className="mt-2 mb-8" />
                <ul className="flex flex-col gap-4 lg:flex-row lg:gap-6 ">
                  <li className="">
                    <NavLink
                      to="/"
                      onClick={closeDrawer}
                      className="hover:text-pink-600"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      onClick={closeDrawer}
                      className="hover:text-pink-600"
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={closeDrawer}
                      className="hover:text-pink-600"
                    >
                      Contact Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      onClick={closeDrawer}
                      className="hover:text-pink-600"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-white text-2xl lg:text-3xl font-semibold"
            style={{ fontVariant: "small-caps" }}
          >
            Parcel Ease
          </Link>
          <img className="w-12 hidden md:block" src={logo} alt="" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block text-white py-0">
          <div className=" flex items-center gap-6 ">
            {links}
            {/* dropdown */}
            {/* <IoIosNotificationsOutline className="text-white text-2xl cursor-pointer font-bold" /> */}

            <div className="dropdown-end flex items-center justify-center">
              <div className="w-12 rounded-full ">
                {user?.photoURL ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img
                            alt="User Avatar"
                            src={user?.photoURL}
                            className="object-cover w-10 h-full rounded-full"
                          />
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52 mt-3">
                      <DropdownMenuItem>
                        <p className="text-slate-800">{user?.displayName}</p>
                      </DropdownMenuItem>
                      <Link to={`/dashboard/profile`}>
                        <DropdownMenuItem className="text-black inline-flex items-center gap-2 w-full">
                          <MdDashboard className="text-2xl" /> Dashboard
                        </DropdownMenuItem>
                      </Link>
                      {/* Add additional items here if needed */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full ">
                          <img
                            alt="User"
                            src={user?.displayName || userimg}
                            className="object-cover w-10 h-full rounded-full"
                          />
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52 mt-3">
                      <Link to={`/dashboard/profile`}>
                        <DropdownMenuItem className="text-black inline-flex items-center gap-2 w-full">
                          <MdDashboard className="text-2xl" /> Dashboard
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {user && user.email ? (
              <Button onClick={handleLogout}>Sign Out</Button>
            ) : (
              <Link
                style={{ color: "black" }}
                to={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          {/* <IoIosNotificationsOutline className="text-white text-2xl cursor-pointer font-bold" /> */}

          <div className="dropdown-end flex items-center justify-center">
            <div className="w-12 rounded-full ">
              {user?.photoURL ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 h-10 rounded-full ">
                        <img
                          alt="User Avatar"
                          src={user?.photoURL}
                          className="object-cover w-10 h-full rounded-full"
                        />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 mt-3">
                    <DropdownMenuItem>
                      <p className="text-slate-800">{user?.displayName}</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to={`/dashboard/profile`}
                        className="text-black inline-flex items-center gap-2 w-full"
                      >
                        <MdDashboard className="text-2xl" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {user && user.email ? (
                        <Button className="w-full" onClick={handleLogout}>
                          Sign Out
                        </Button>
                      ) : (
                        <Link
                          style={{ color: "black" }}
                          to={"/login"}
                          className={buttonVariants({ variant: "outline" })}
                        >
                          Login
                        </Link>
                      )}
                    </DropdownMenuItem>
                    {/* Add additional items here if needed */}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 h-10 rounded-full ">
                        <img
                          alt="User Avatar"
                          src={user?.displayName || userimg}
                          className="object-cover w-10 h-full rounded-full"
                        />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 mt-3">
                    <Link to={`/dashboard/profile`}>
                      <DropdownMenuItem className="text-black inline-flex items-center gap-2 w-full">
                        <MdDashboard className="text-2xl" /> Dashboard
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {user && user.email ? (
            <div></div>
          ) : (
            <Link
              style={{ color: "black" }}
              to={"/login"}
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
