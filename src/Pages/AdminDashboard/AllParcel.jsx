
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

export default function AllParcel() {


    // const parcels = [
    //     {
    //         userName: "Jewel Mia",
    //         userPhone: "+8801684321082",
    //         bookingDate: "2024-06-08T10:39:38.665Z",
    //         deliveryDate: "2024-06-11",
    //         cost: 100,
    //         status: "Delivered"
    //     },
    //     {
    //         userName: "Jewel Mia",
    //         userPhone: "+8801684321085",
    //         bookingDate: "2024-06-08T10:40:12.337Z",
    //         deliveryDate: "2024-06-14",
    //         cost: 50,
    //         status: "Delivered"
    //     },
    //     {
    //         userName: "Jewel official",
    //         userPhone: "+8801684321082",
    //         bookingDate: "2024-06-09T11:44:50.601Z",
    //         deliveryDate: "2024-06-22",
    //         cost: 50,
    //         status: "Cancelled"
    //     },
    //     // Add more parcel data as needed
    // ]
    const [parcels, loading, refetch] = useManageParcel()

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

    return (
        <div className="container mx-auto  px-4 ">
            <SectionHeading heading={'All Parcel'}></SectionHeading>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Total Parcel: {parcels?.length}</h1>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="space-y-2 w-full sm:w-auto">
                        {/* <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full sm:w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Select date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={1}
                                />
                            </PopoverContent>
                        </Popover> */}
                    </div>
                    <Button className="w-full sm:w-auto">Search</Button>
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
                            {parcels.map((parcel, index) => (
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

