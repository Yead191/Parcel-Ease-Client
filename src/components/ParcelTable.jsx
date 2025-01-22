import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from './ui/button';
import { FaEdit } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useParcel from '@/hooks/useParcel';
import ReviewModal from './ReviewModal';


const ParcelTable = ({ parcels }) => {
    const axiosSecure = useAxiosSecure()
    const [statusFilter, setStatusFilter] = useState('');
    // console.log(parcels);
    const [, refetch, isLoading] = useParcel()


    const filteredParcels = statusFilter
        ? parcels.filter(parcel => parcel.status === statusFilter)
        : parcels;

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

    return (
        <div className="container mx-auto p-4">
            {/* Filter Section */}
            <div className="mb-4">
                <label htmlFor="status-filter" className="mr-2">Filter by Status:</label>
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All</option>
                    <option value="InTransit">In Transit</option>
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Responsive Table */}
            <div className="w-full hidden md:block overflow-x-scroll">
                <table className="w-full  overflow-x-scroll bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Parcel Type</th>
                            <th className="p-2 border">Req. Delivery Date</th>
                            <th className="p-2 border">Approx. Delivery Date</th>
                            <th className="p-2 border">Booking Date</th>
                            <th className="p-2 border">Booking Date</th>
                            <th className="p-2 border">Delivery Man</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Payment Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td className="p-2 border ">{parcel?.parcelType}</td>
                                <td className="p-2 border">{parcel?.deliveryDate}</td>
                                <td className="p-2 border">
                                    {parcel?.approxDeliveryDate
                                        ? new Date(parcel.approxDeliveryDate).toLocaleDateString("en-GB")
                                        : ""}
                                </td>
                                <td className="p-2 border text-center">{parcel?.bookingDate}</td>
                                <td className="p-2 border text-center">{parcel?.price}</td>
                                <td className="p-2 border">{parcel?.deliveryName}</td>
                                <td className={`p-2 border text-center ${parcel.status === "Cancelled" ? 'text-red-500' : 'text-slate-800'}`}>{parcel?.status}</td>
                                <td className={`p-2 border text-center ${parcel.paymentStatus === "Paid" ? 'text-green-500' : 'text-slate-800'}`}>{parcel?.paymentStatus}</td>

                                <td className="p-2 border flex gap-2 justify-center items-center">
                                    <Button disabled={parcel.status !== "Pending"} className={buttonVariants({ size: "sm" })}>
                                        <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                            <FaEdit />
                                        </Link>
                                    </Button>
                                    <Button disabled={parcel.status === "Cancelled" || parcel.paymentStatus === "Paid"} className={buttonVariants({ size: "sm" })}>
                                        <Link to={`/dashboard/payment/${parcel._id}`}>
                                            <MdOutlinePayment />
                                        </Link>
                                    </Button>

                                    {
                                        parcel.status === "Delivered" ?
                                            <ReviewModal refetch={refetch}
                                                parcel={parcel}></ReviewModal>

                                            :

                                            <Button disabled={parcel.status === "Cancelled" || parcel.status === "Delivered"} onClick={() => handleCancel(parcel._id)}
                                                className={`${buttonVariants({ size: "sm", variant: "secondary" })} bg-red-500 hover:bg-red-600 text-white `}
                                            >
                                                Cancel
                                            </Button>
                                    }

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile-Friendly Alternative (Optional) */}
            <div className="grid gap-4 md:hidden mt-4">
                {filteredParcels.map(parcel => (
                    <div key={parcel._id} className="p-4 border rounded-lg bg-white shadow-sm">
                        <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
                        <p><strong>Req. Delivery Date:</strong> {parcel.reqDeliveryDate}</p>
                        <p><strong>Approx. Delivery Date:</strong> {parcel.approxDeliveryDate}</p>
                        <p><strong>Booking Date:</strong> {parcel.bookingDate}</p>
                        <p><strong>Delivery Man:</strong> {parcel.deliveryName}</p>
                        <p><strong>Status:</strong> {parcel.status}

                        </p>
                        <div className=" my-2 flex gap-2  items-center">
                            <Button disabled={parcel.status !== "Pending"} className={buttonVariants({ size: "sm" })}>
                                <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                    <FaEdit />
                                </Link>
                            </Button>
                            <Button disabled={parcel.status === "Cancelled" || parcel.paymentStatus === "Paid"} className={buttonVariants({ size: "sm" })}>
                                <Link to={`/dashboard/payment/${parcel._id}`}>
                                    <MdOutlinePayment />
                                </Link>
                            </Button>

                            {
                                parcel.status === "Delivered" ?
                                    <ReviewModal refetch={refetch}
                                        parcel={parcel}></ReviewModal>

                                    :

                                    <Button disabled={parcel.status === "Cancelled" || parcel.status === "Delivered"} onClick={() => handleCancel(parcel._id)}
                                        className={`${buttonVariants({ size: "sm", variant: "secondary" })} bg-red-500 hover:bg-red-600 text-white `}
                                    >
                                        Cancel
                                    </Button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParcelTable;
