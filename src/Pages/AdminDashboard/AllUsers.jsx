import SectionHeading from '@/components/SectionHeading';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React from 'react';
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

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users')
            return res.data
        }
    })
    if (loading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    // console.log(users);


    const handleDeliveryMan = user => {
        console.log(user._id);
        const userRole = {
            role: "DeliveryMan"
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You're going to make this user a Delivery Man!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8bde1a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make DeliveryMan!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/role/${user._id}`, userRole)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            toast.success(`${user.name} is now a Delivery Man!`)

                        }
                    })
            }
        });
    }
    const handleAdmin = user => {
        console.log(user._id);
        const userRole = {
            role: "Admin"
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You're going to make this user an Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8bde1a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/role/${user._id}`, userRole)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            toast.success(`${user.name} is now an Admin!`)

                        }
                    })
            }
        });

    }



    return (
        <div>
            <SectionHeading heading={"All Users"}></SectionHeading>
            <div className='md:w-11/12 mx-auto bg-base-100 p-2 py-12 '>
                <div
                    style={{ fontVariant: "small-caps" }}
                    className='space-y-2 flex flex-col md:flex-row justify-between items-center mb-10'
                >
                    <h1 className='text-3xl'>Total Users: {users.length}</h1>
                </div>
                <div className='my-8 md:w-11/12  mx-auto overflow-x-hidden w-full'>
                    <div className="overflow-x-scroll w-full">
                        <Table>
                            <TableCaption className="text-lg text-gray-500">
                                List of all registered users and their details.
                            </TableCaption>
                            <TableHeader className="overflow-x-auto">
                                <TableRow style={{
                                    background:
                                        "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                                }} className=" text-white lg:text-md">
                                    <TableHead className="w-1">#</TableHead>
                                    <TableHead>User Image</TableHead>
                                    <TableHead>User Name</TableHead>
                                    <TableHead>Phone </TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="overflow-x-scroll w-full">
                                {users?.map((user, index) => (
                                    <TableRow key={user._id} className="hover">
                                        <TableCell>{index + 1}</TableCell>
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
                                                <span className="text-sm text-gray-500">
                                                    {user.createdAt}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="lg:text-lg">
                                                {user?.phone}
                                            </div>
                                        </TableCell>
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
                                            <Button
                                                variant="destructive"
                                                size="sm"

                                            >
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;