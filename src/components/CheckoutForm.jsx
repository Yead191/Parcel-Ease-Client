import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth.jsx';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const CheckoutForm = ({ parcel }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [transaction, setTransaction] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { width, height } = useWindowSize();

    useEffect(() => {
        if (parcel.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: parcel.price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [parcel.price, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.name || 'Anonymous',
                    email: user?.email || 'Anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            setError('');
            if (paymentIntent.status === 'succeeded') {
                setTransaction(paymentIntent.id);
                setShowConfetti(true);

                const payment = {
                    email: user.email,
                    price: parcel.price,
                    parcelName: parcel.parcelType,
                    parcelId: parcel._id,
                    date: new Date(),
                    paymentStatus: 'Paid',
                    transactionId: paymentIntent.id,
                };

                const res = await axiosSecure.post('/payments', payment);
                if (res.data.insertedId) {
                    e.target.reset();
                    setTimeout(() => {
                        navigate('/dashboard/payment-history');
                    }, 3500);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `$${parcel.price} has been Paid Successfully!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        }
    };

    return (
        <div className="flex flex-col p-4 w-full md:w-11/12 lg:w-10/12">
            {showConfetti && <Confetti width={width} height={height} />}

            <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded-lg shadow-lg w-11/12 lg:w-8/12 mx-auto">
                <div style={{ fontVariant: 'small-caps' }} className="space-y-2 flex flex-col md:flex-row mb-6">
                    <h1 className="text-3xl">Due: {parcel.price}</h1>
                </div>

                <div className="mb-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full py-3 mt-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Pay Now
                </button>
                <p className="mt-2 text-sm text-red-500">{error}</p>
                {transaction && <p className="text-sm text-green-500">Your transaction id: {transaction}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
