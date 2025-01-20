import SectionHeading from '@/components/SectionHeading';
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import useDelivery from '@/hooks/useDelivery';
import { Star } from 'lucide-react';


const AllDeliveryMan = () => {
    const [deliveryMen, isLoading, refetch] = useDelivery()
    console.log(deliveryMen);
    if (isLoading) {
        return <div className="flex flex-col  justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid">
            </div>
        </div>
    }
    return (
        <div>
            <SectionHeading heading={'All Delivery Man'}></SectionHeading>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Delivery Man ({deliveryMen?.length})</h1>

                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow style={{
                                background:
                                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                            }}>
                                <TableHead>Delivery Man's Name</TableHead>
                                <TableHead className=" md:table-cell">Phone Number</TableHead>
                                <TableHead>Number of Parcels Delivered</TableHead>
                                <TableHead className=" sm:table-cell">Avg. Review</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deliveryMen.map((delivery, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{delivery?.name}</TableCell>
                                    <TableCell className=" md:table-cell">{delivery?.phone}</TableCell>
                                    <TableCell className=" sm:table-cell">{delivery?.totalDelivered}</TableCell>
                                    <TableCell className="sm:table-cell">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.round(delivery?.totalRating / delivery?.reviewCount)
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
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

export default AllDeliveryMan;