import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from './ui/button';
import { FaEdit } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useParcel from '@/hooks/useParcel';

// Sample data (replace with your actual data source)
// const parcels = [
//     {
//         id: 1,
//         parcelType: 'Standard',
//         reqDeliveryDate: '2023-06-15',
//         approxDeliveryDate: '2023-06-17',
//         bookingDate: '2023-06-10',
//         deliveryManId: 'DM001',
//         status: 'In Transit'
//     },
//     {
//         id: 2,
//         parcelType: 'Express',
//         reqDeliveryDate: '2023-06-14',
//         approxDeliveryDate: '2023-06-14',
//         bookingDate: '2023-06-13',
//         deliveryManId: 'DM002',
//         status: 'Delivered'
//     },
//     // Add more sample data as needed
// ];

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
                    <option value="In Transit">In Transit</option>
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
                            <th className="p-2 border">Delivery Man ID</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td className="p-2 border ">{parcel?.parcelType}</td>
                                <td className="p-2 border">{parcel?.deliveryDate}</td>
                                <td className="p-2 border">{parcel?.approxDeliveryDate}</td>
                                <td className="p-2 border text-center">{parcel?.bookingDate}</td>
                                <td className="p-2 border">{parcel?.deliveryManId}</td>
                                <td className={`p-2 border text-center ${parcel.status === "Cancelled" ? 'text-red-500' : 'text-slate-800'}`}>{parcel?.status}</td>
                                <td className="p-2 border flex gap-2 justify-center items-center">
                                    <Button disabled={parcel.status === "Cancelled"} className={buttonVariants({ size: "sm" })}>
                                        <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                            <FaEdit />
                                        </Link>
                                    </Button>
                                    <Button disabled={parcel.status === "Cancelled"} className={buttonVariants({ size: "sm" })}>
                                        <MdOutlinePayment />
                                    </Button>
                                    <Button disabled={parcel.status === "Cancelled"} onClick={() => handleCancel(parcel._id)}
                                        className={`${buttonVariants({ size: "sm", variant: "secondary" })} bg-red-500 hover:bg-red-600 text-white `}
                                    >
                                        Cancel
                                    </Button>
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
                        <p><strong>Delivery Man ID:</strong> {parcel.deliveryManId}</p>
                        <p><strong>Status:</strong> {parcel.status}

                        </p>
                        <div className=" my-2 flex gap-2  items-center">
                            <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                                <Button className={buttonVariants({ size: "sm" })}>
                                    <FaEdit />
                                </Button>
                            </Link>
                            <Button className={buttonVariants({ size: "sm" })}>
                                <MdOutlinePayment />
                            </Button>
                            <Button onClick={() => handleCancel(parcel._id)}
                                className={`${buttonVariants({ size: "sm", variant: "secondary" })} bg-red-500 hover:bg-red-600 text-white`}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParcelTable;
