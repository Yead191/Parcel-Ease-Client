import SectionHeading from '@/components/SectionHeading';
import React from 'react';
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useQuery } from 'react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyDelivery = () => {
    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const { data: myDelivery = [], refetch } = useQuery({
        queryKey: ['myDelivery'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-delivery?email=${user.email}`)
            return res.data
        }
    })
    // console.log(myDelivery);
    const handleCancel = id => {
        console.log(id);
        Swal.fire({
            title: "Do You Want to Cancel This Delivery?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Don't Cancel",
            confirmButtonText: "Yes, Cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/parcel/cancel/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your Parcel Delivery has been Cancelled.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    const handleDelivery = parcel => {

        const deliveryDetails = {
            parcelId: parcel._id,
            deliveredBy: parcel.deliveryName,
            deliveredManId: parcel.deliveryManId,
            deliveredManEmail: parcel.deliveryEmail,

        }
        console.log(deliveryDetails);
        Swal.fire({
            title: "Did You Completed this Delivery?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancel!",
            confirmButtonText: "Yes, Delivered"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post(`/deliveries/${parcel._id}`, deliveryDetails)
                    .then(res => {
                        if (res.data.insertedId) {
                            refetch()
                            Swal.fire({
                                title: "Delivery Success!",
                                text: "You Have Delivered this Parcel!",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }


    return (
        <div>
            <SectionHeading heading={'My Delivery List'}></SectionHeading>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold"> Total Delivery: ({myDelivery?.length})</h1>

                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow style={{
                                background:
                                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                            }}>
                                <TableHead>Booked User's Name</TableHead>
                                <TableHead className=" md:table-cell">Receiver's Name</TableHead>
                                <TableHead className=" md:table-cell">Booked User's Phone</TableHead>
                                <TableHead>Booking Date</TableHead>
                                <TableHead className=" sm:table-cell">Req. Delivery Date</TableHead>
                                <TableHead className=" sm:table-cell">Approx. Delivery Date</TableHead>
                                <TableHead className=" md:table-cell">Receiver's Phone</TableHead>
                                <TableHead>Receiver's Address</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {myDelivery.map((delivery, index) => (
                                <TableRow key={delivery._id}>
                                    <TableCell className="font-medium">{delivery?.name}</TableCell>
                                    <TableCell className=" md:table-cell">{delivery?.receiverName}</TableCell>
                                    <TableCell className=" md:table-cell">{delivery?.number}</TableCell>
                                    <TableCell className=" sm:table-cell">{delivery?.bookingDate}</TableCell>
                                    <TableCell className=" sm:table-cell">{delivery?.deliveryDate}</TableCell>
                                    <TableCell className=" sm:table-cell">
                                        {delivery?.approxDeliveryDate
                                            ? new Date(delivery.approxDeliveryDate).toLocaleDateString("en-GB")
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell>{delivery?.receiverPhoneNumber}</TableCell>
                                    <TableCell>{delivery?.deliveryAddress}</TableCell>

                                    <TableCell className="text-right flex flex-col md:flex-row gap-2">
                                        <Button disabled={delivery?.status === "Cancelled"} className="bg-blue-400" size="sm" >
                                            Location
                                        </Button>

                                        <Button disabled={delivery?.status === "Cancelled" || delivery?.status === "Delivered"} onClick={() => handleCancel(delivery?._id)}
                                            className={`${buttonVariants({ size: "sm", variant: "secondary" })} bg-red-500 hover:bg-red-600 text-white `}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleDelivery(delivery)} disabled={delivery?.status === "Cancelled" || delivery?.status === "Delivered"} className={`${delivery?.status === "Delivered" ? 'bg-gray-600' : 'bg-green-400'} `} size="sm">
                                            {
                                                delivery?.status === "Delivered" ?
                                                    "Delivered" : "Deliver"
                                            }
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default MyDelivery;