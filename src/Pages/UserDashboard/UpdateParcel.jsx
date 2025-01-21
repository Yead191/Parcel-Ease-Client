import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const UpdateParcel = () => {
    const { _id, name, email, number, parcelType, parcelWeight: parcelWeightOld, receiverName, receiverPhoneNumber, deliveryAddress, deliveryDate, latitude, longitude, price: oldPrice } = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const parcelWeight = useRef(null)
    const [price, setPrice] = useState(oldPrice);

    const calculatePrice = () => {
        const weight = parseFloat(parcelWeight.current.value || 0);
        if (weight <= 0) {
            setPrice(0);
        }
        else if (weight <= 1) {
            setPrice(50);
        } else if (weight <= 2) {
            setPrice(100);
        } else if (weight > 2) {
            setPrice(150);
        } else {
            setPrice(0);
        }
    };
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    //     reset,
    // } = useForm()

    // const onSubmit = async (value) => {
    //     console.log(value);
    // };
    if (loading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    const handleForm = e => {
        e.preventDefault();
        // setLoading(true)
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);
        if (formValues.price <= 0) {
            toast.error('Enter a valid Weight');
            return;

        }
        axiosSecure.patch(`/parcel/${_id}`, formValues)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    navigate('/dashboard/my-parcel')
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Your Item has been Updated!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })


    }

    return (
        <div>
            <Helmet>
                <title>Update Parcel | Parcel Ease</title>
            </Helmet>
            <SectionHeading heading={"Book a Parcel"}></SectionHeading>
            <form
                onSubmit={handleForm}
                className="space-y-6 bg-gray-100 p-8 rounded-md shadow-md md:w-11/12 lg:w-10/12 mx-auto my-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Name
                        </label>
                        <input
                            name='name'
                            defaultValue={name}
                            type="text"
                            readOnly
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Email
                        </label>
                        <input
                            defaultValue={email}
                            name='email'
                            type="email"
                            readOnly
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Phone Number
                        </label>
                        <input
                            // {...register("phoneNumber", { required: true })}
                            name='number'
                            type="number"
                            defaultValue={number}
                            placeholder="Phone Number"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Parcel Type
                        </label>
                        <input
                            // {...register("parcelType", { required: true })}
                            name='parcelType'
                            type="text"
                            defaultValue={parcelType}
                            placeholder="Parcel Type"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Parcel Weight
                        </label>
                        <input
                            // {...register("parcelWeight", { required: true })}
                            name='parcelWeight'
                            ref={parcelWeight}
                            defaultValue={parcelWeightOld}
                            type="number"
                            onChange={calculatePrice}
                            placeholder="Parcel Weight"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Receiver's Name
                        </label>
                        <input
                            // {...register("receiverName", { required: true })}
                            name='receiverName'
                            type="text"
                            defaultValue={receiverName}
                            placeholder="Receiver's Name"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Receiver's Phone Number
                        </label>
                        <input
                            // {...register("receiverPhoneNumber", { required: true })}
                            name='receiverPhoneNumber'
                            type="number"
                            defaultValue={receiverPhoneNumber}
                            placeholder="Receiver's Phone Number"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Parcel Delivery Address
                        </label>
                        <input
                            // {...register("deliveryAddress", { required: true })}
                            name='deliveryAddress'
                            defaultValue={deliveryAddress}
                            type="text"
                            placeholder="Parcel Delivery Address"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Requested Delivery Date
                        </label>
                        <input
                            // {...register("deliveryDate", { required: true })}
                            name='deliveryDate'
                            defaultValue={deliveryDate}
                            type="date"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Delivery Address Latitude
                        </label>
                        <input
                            // {...register("latitude", { required: true })}
                            name='latitude'
                            type="text"
                            defaultValue={latitude}
                            placeholder="Delivery Address Latitude"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Delivery Address Longitude
                        </label>
                        <input
                            // {...register("longitude", { required: true })}
                            name='longitude'
                            defaultValue={longitude}
                            type="text"
                            placeholder="Delivery Address Longitude"
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Price (Tk)
                        </label>
                        <input
                            // {...register("price", { required: true })}
                            name='price'
                            type="number"
                            placeholder="Price (Tk)"
                            value={price}
                            readOnly
                            className="border border-input bg-background text-foreground rounded-md px-3 py-2 w-full"
                            required />

                    </div>
                </div>
                <Button type="submit">
                    Update Parcel
                </Button>
                {/* <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                    Book Parcel
                </button> */}
            </form>
        </div>
    );
};

export default UpdateParcel;