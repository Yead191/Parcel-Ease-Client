import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import SectionHeading from '@/components/SectionHeading';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '@/components/CheckoutForm';
import { Helmet } from 'react-helmet-async';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);
    const parcel = useLoaderData()

    return (
        <div>
            <Helmet>
                <title>Payment | Parcel Ease</title>
            </Helmet>
            <SectionHeading heading={"Payment"}></SectionHeading>

            <div className="flex-1 bg-white flex flex-col justify-center items-center min-h-[70vh]">
                <Elements stripe={stripePromise} >
                    <CheckoutForm parcel={parcel} />
                </Elements>


            </div>

        </div>
    );
};

export default Payment;