import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import useDelivery from "@/hooks/useDelivery";
import { de } from "date-fns/locale";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


export function ParcelModal({ value, refetch, status }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [deliveryMen, isLoading,] = useDelivery()
    const axiosSecure = useAxiosSecure()

    const handleSubmit = e => {
        e.preventDefault()
        const formData = e.target
        const deliveryManId = formData.deliveryman.value;
        if (deliveryManId === "Select Delivery Man") {
            toast.error('Please Select a Delivery Man')
            return;
        }
        const deliveryInfo = {
            deliveryManId: formData.deliveryman.value,
            approxDelivery: selectedDate,
        }
        // const formValues = Object.fromEntries(formData.entries());
        console.log(deliveryInfo, value);
        axiosSecure.patch(`/manage-parcel/${value}`, deliveryInfo)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    setIsOpen(false);
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Successfully Assigned to Delivery Man!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })

    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <Button disabled={status === "Delivered"} size="sm" className="bg-orange-400 text-white">Manage Parcel</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content
                    className={cn(
                        "fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
                    )}
                >
                    <Dialog.Title className="text-lg font-bold mb-4">Manage Parcel</Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Deliveryman Dropdown */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="deliveryman">
                                Deliveryman
                            </label>
                            <select
                                id="deliveryman"
                                name="deliveryman"
                                defaultValue={"Select Delivery Man"}
                                className="block w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                                required>
                                <option disabled value="Select Delivery Man">Select Delivery Man</option>
                                {
                                    deliveryMen?.map(delivery =>
                                        <option key={delivery._id} value={delivery._id}>{delivery?.name}</option>

                                    )
                                }
                            </select>
                        </div>

                        {/* Delivery Date Picker */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="date">
                                Approximate Delivery Date
                            </label>
                            <Calendar
                                selected={selectedDate}
                                onSelect={(date) => setSelectedDate(date)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4">
                            <Dialog.Close asChild>
                                <Button type="button" className="bg-red-500 text-white">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Button type="submit" className="bg-orange-500 text-white">
                                Assign
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
