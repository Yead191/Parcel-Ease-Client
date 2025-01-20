
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "react-query"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import useManageParcel from "@/hooks/useManageParcel"
import SectionHeading from "@/components/SectionHeading"
import { ParcelModal } from "@/components/ui/parcelModal"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { useEffect } from "react"

export default function AllParcel() {


    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [parcels, loading, refetch] = useManageParcel()

    const [filteredParcels, setFilteredParcels] = useState();

    // Update `filteredParcels` whenever `parcels` changes (initial load)
    useEffect(() => {
        setFilteredParcels(parcels || []);
    }, [parcels]);

    // console.log(parcels);
    const getStatusBadgeColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'bg-blue-500 hover:bg-blue-600'
            case 'pending':
                return 'bg-green-500 hover:bg-green-600'
            case 'intransit':
                return 'bg-yellow-500 hover:bg-green-600'
            case 'cancelled':
                return 'bg-gray-500 hover:bg-gray-600'
            default:
                return 'bg-gray-500 hover:bg-gray-600'
        }
    }
    const axiosSecure = useAxiosSecure();

    const handleSearch = async () => {
        if (fromDate && toDate) {
            try {
                const from = new Date(fromDate).toISOString();
                const to = new Date(toDate).toISOString();

                const response = await axiosSecure.get("/parcels/search", {
                    params: { from, to },
                });

                setFilteredParcels(response.data);
                refetch()

            } catch (error) {
                console.error("Error fetching filtered parcels:", error);
            }
        } else {
            toast.error("Please select both From and To dates.");
        }
    };
    if (loading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }

    return (
        <div className="container mx-auto  px-4 ">
            <SectionHeading heading={'All Parcel'}></SectionHeading>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Total Parcel: {parcels?.length}</h1>

                {/* Date Filter Section */}
                <div className="flex flex-col md:flex-row md:items-end gap-2">
                    <div className="space-y-2">
                        <div className="flex gap-4">
                            {/* From Date */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">From Date</label>
                                <Input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full sm:w-auto"
                                />
                            </div>
                            {/* To Date */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">To Date</label>
                                <Input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full sm:w-auto"
                                />
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleSearch} className="w-2/4 md:w-auto">
                        Search
                    </Button>
                </div>

                <div className="rounded-md border overflow-x-auto mb-20">
                    <Table>
                        <TableHeader>
                            <TableRow style={{
                                background:
                                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                            }}>
                                <TableHead>User's Name</TableHead>
                                <TableHead className="hidden md:table-cell">User's Phone</TableHead>
                                <TableHead>Booking Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Req. Delivery Date</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Manage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredParcels?.map((parcel, index) => (
                                <TableRow key={parcel._id}>
                                    <TableCell className="font-medium">{parcel?.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{parcel?.number}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{parcel?.bookingDate}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{parcel?.deliveryDate}</TableCell>
                                    <TableCell>{parcel?.price}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusBadgeColor(parcel.status)}>
                                            {parcel?.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {
                                            parcel.status === 'Cancelled' ?
                                                <Button disabled variant="" size="sm">
                                                    Not Available
                                                </Button>
                                                :

                                                <ParcelModal refetch={refetch} status={parcel.status} value={parcel._id} />

                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

