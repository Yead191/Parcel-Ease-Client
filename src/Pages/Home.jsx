import React from "react";
import { Parallax } from "react-parallax";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bannerLottie from "../assets/delivery.json";
import bannerParcel from "../assets/parcelBanner.png";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Banner2 from "@/components/Banner2";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import TopDeliveryMan from "@/components/TopDeliveryMan";
import Stats from "@/components/Stats";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import HowItWorks from "@/components/HomeComponents/HowItWorks";
import Pricing from "@/components/HomeComponents/Pricing";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!user) {
      return toast(
        <div className="flex flex-col gap-2 ">
          <h3 className="text-lg font-semibold text-red-600">Login Required</h3>
          <p className="text-sm text-gray-600">
            You need to be logged in to track your parcels. Please sign in to
            continue.
          </p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>,
        {
          duration: 5000,
          position: "top-right",
        }
      );
    }
    navigate("/dashboard/my-parcel");
  };
  return (
    <div className="">
      <Helmet>
        <title>Home | Parcel Ease</title>
      </Helmet>
      <div className="banner-bg">
        <Parallax
          blur={{ min: -10, max: 10 }}
          bgClassName="object-cover"
          bgImage={bannerParcel}
          bgImageAlt="cover image"
          strength={isMobile ? 0 : -200}
        >
          {/* Overlay */}
          <div className="relative  lg:h-[70vh] flex items-center justify-center px-6 lg:px-16 ">
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center w-full max-w-6xl">
              {/* Left Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 text-center lg:text-left pt-16 md:pt-0"
              >
                <h1 className="text-4xl xl:text-5xl font-bold text-white">
                  Manage Your Parcel Deliveries Effortlessly
                </h1>
                <p className=" text-gray-200 sm:text-sm">
                  With ParcelEase, track, book, and manage your deliveries all
                  in one place. Simplify logistics and stay updated on your
                  parcel's journey, all from one dashboard.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="text"
                    placeholder="Search your parcel ID..."
                    className="lg:max-w-screen-sm bg-white text-slate-800"
                  />
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-[#540654] via-[#cc0d85] to-[#540654] "
                  >
                    Search
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Section (Placeholder) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className=" lg:block"
              >
                <Lottie
                  className="h-[400px] lg:h-[550px]"
                  animationData={bannerLottie}
                />
              </motion.div>
            </div>
          </div>
        </Parallax>
      </div>
      {/* banner 2 */}
      <Banner2></Banner2>
      <FeaturesSection></FeaturesSection>
      <ServicesSection></ServicesSection>
      <Stats></Stats>
      <Pricing></Pricing>
      <HowItWorks></HowItWorks>
      <TopDeliveryMan></TopDeliveryMan>
    </div>
  );
};

export default Home;
