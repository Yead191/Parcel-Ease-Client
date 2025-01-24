import SectionHeading from '@/components/SectionHeading';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaUsers, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Pagination from '@/components/Pagination';
import { Helmet } from 'react-helmet-async';




const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const axiosSecure = useAxiosSecure();
    const { data, isLoading: loading, refetch } = useQuery(['users', currentPage], async () => {
        const res = await axiosSecure.get(`/all-users?page=${currentPage}&limit=${itemsPerPage}`);
        return res.data;
    });

    const users = data?.users || [];
    const totalUsers = data?.totalUsers || 0;

    if (loading) {
        return <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid"></div>
        </div>
    }

    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const handleDeliveryMan = user => {
        const userRole = { role: "DeliveryMan" };
        Swal.fire({
            title: "Are you sure?",
            text: "You're going to make this user a Delivery Man!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8bde1a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make DeliveryMan!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/role/${user._id}`, userRole)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            toast.success(`${user.name} is now a Delivery Man!`);
                        }
                    });
            }
        });
    };

    const handleAdmin = user => {
        const userRole = { role: "Admin" };
        Swal.fire({
            title: "Are you sure?",
            text: "You're going to make this user an Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8bde1a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/role/${user._id}`, userRole)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            toast.success(`${user.name} is now an Admin!`);
                        }
                    });
            }
        });
    };

    const handleDeleteUser = user => {
        // console.log(user);
        Swal.fire({
            title: `Delete ${user.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/delete/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user.name} has been deleted.`,
                                icon: "success"
                            });
                        }

                    })

            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Users | Parcel Ease</title>
            </Helmet>
            <SectionHeading heading={"All Users"} />
            <div className="md:w-11/12 mx-auto bg-base-100 p-2 py-12">
                <div
                    style={{ fontVariant: "small-caps" }}
                    className="space-y-2 flex flex-col md:flex-row justify-between items-center mb-10"
                >
                    <h1 className="text-3xl">Total Users: {totalUsers}</h1>
                </div>
                <div className="my-8 md:w-11/12 mx-auto overflow-x-hidden w-full">
                    <div className="overflow-x-scroll w-full">
                        <Table>
                            <TableCaption className="text-lg text-gray-500">
                                List of all registered users and their details.
                            </TableCaption>
                            <TableHeader>
                                <TableRow style={{
                                    background:
                                        "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                                }} className="text-white lg:text-md">
                                    <TableHead className="w-1">#</TableHead>
                                    <TableHead>User Image</TableHead>
                                    <TableHead>User Name</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={user._id} className="hover">
                                        <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <div className="h-16 w-16 rounded-full overflow-hidden">
                                                <img
                                                    src={user.photo}
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="lg:text-lg">
                                                {user.name}
                                                <br />
                                                <span className="text-sm text-gray-500">{user.createdAt}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            {user.role === "Admin" ? (
                                                <Button
                                                    variant="outline"
                                                    className="bg-green-600 text-white"
                                                    size="sm"
                                                >
                                                    Admin
                                                </Button>
                                            ) : user.role === "DeliveryMan" ? (
                                                <div className="flex flex-col md:flex-row gap-2">
                                                    <Button onClick={() => handleAdmin(user)} className={buttonVariants({ size: "sm" })}>Make Admin</Button>
                                                    <Button
                                                        variant="outline"
                                                        className="bg-blue-500 text-white"
                                                        size="sm"
                                                    >
                                                        Delivery Man
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col md:flex-row gap-2">
                                                    <Button onClick={() => handleAdmin(user)} className={buttonVariants({ size: "sm" })}>Make Admin</Button>
                                                    <Button onClick={() => handleDeliveryMan(user)} className={buttonVariants({ size: "sm" })}>Make Delivery Man</Button>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDeleteUser(user)} variant="destructive" size="sm">
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        total={totalPages}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            refetch();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
