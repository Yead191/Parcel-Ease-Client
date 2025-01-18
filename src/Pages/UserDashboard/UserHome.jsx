import SectionHeading from '@/components/SectionHeading';
import useUser from '@/hooks/useUser';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const imageUploadKey = import.meta.env.VITE_Image_Upload_Token
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageUploadKey}`


const UserHome = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [users, refetch, isLoading] = useUser()
    const user = users[0]
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const [newPhoto, setNewPhoto] = useState(user?.photo);




    if (isLoading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    const handleSaveChanges = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedData = {
            name: formData.get("name"),
            age: formData.get("age"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            photo: newPhoto || user?.photo,
        };
        setLoading(true)
        console.log("Updated Profile Data:", updatedData);
        axiosSecure.patch(`/user/${user._id}`, updatedData)
            .then(res => {
                refetch()
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    setLoading(false)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Profile Updated Successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsDialogOpen(false);
                }
            })
        // Here you can send `updatedData` to the backend to save changes
    };
    const handleImageChange = async (event) => {
        setLoading(true)
        console.log(event.target);
        const file = {
            image: event.target.files[0]
        }
        console.log(file);
        if (file) {
            // const imageUrl = URL.createObjectURL(file);
            const res = await axiosPublic.post(imageUploadApi, file, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            if (res.data.success) {
                setLoading(false)
                toast.success('Image Uploaded')
                setNewPhoto(res.data.data.display_url);
            }
        }
    };

    return (
        <div className=''>
            <SectionHeading heading={'My Profile'}></SectionHeading>
            <div className=" min-h-[50vh] lg:min-h-[80vh] flex items-center justify-center ">
                <div className=" w-10/12 mx-auto  bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg p-2 lg:p-8 shadow-lg">
                    <div className="bg-black min-h-[60vh] rounded-lg p-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 items-center lg:space-x-6">
                        {/* Left Section: Profile Image and Name */}
                        <div className="flex flex-col items-center text-center lg:w-1/2">
                            <div className="w-64 h-64 rounded-xl overflow-hidden shadow-md mb-4">
                                <img
                                    src={user?.photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>


                            <h2 className="text-lg font-semibold text-pink-400">{user?.name}</h2>
                            <p className="text-gray-400 text-sm">Role: {user?.role}</p>
                        </div>
                        {/* Right Section: Profile Details */}
                        <div className="flex-1 text-left text-white space-y-4">
                            <h3 className="text-2xl font-semibold underline">Profile Details</h3>
                            <p className="text-sm">
                                <span className="font-semibold">Name: </span>{user?.name}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Age: </span>{user?.age}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Mobile: </span>{user?.phone}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Email: </span>{user?.email}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Address: </span>
                                {user?.address}
                            </p>
                            <p className="text-sm mt-4 text-center">

                            </p>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={() => setIsDialogOpen(true)} className="text-black" variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSaveChanges}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input name="name" defaultValue={user?.name} id="name" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="age" className="text-right">
                                                    Age
                                                </Label>
                                                <Input name="age" id="age" defaultValue={user?.age} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="phone" className="text-right">
                                                    Phone
                                                </Label>
                                                <Input name="phone" id="phone" defaultValue={user?.phone} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="address" className="text-right">
                                                    Address
                                                </Label>
                                                <Input name="address" id="address" defaultValue={user?.address} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="upload-photo" className="text-right">
                                                    Profile Picture
                                                </Label>
                                                <div className="col-span-3 flex items-center">
                                                    <label
                                                        htmlFor="upload-photo"
                                                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    >
                                                        Select Image
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="upload-photo"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    {loading && <p className='text-sm text-slate-800'>Please Wait...</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </form>

                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;