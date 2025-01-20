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
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from '@/hooks/useAuth';

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payments=[], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data
        }
    })
    // console.log(payments);
    return (
        <div>
            <SectionHeading heading={"Payment History"}></SectionHeading>
            <div className="rounded-md border overflow-x-auto mb-20 lg:w-10/12 mx-auto">
                <Table>
                    <TableHeader>
                        <TableRow style={{
                            background:
                                "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                        }}>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead className=" md:table-cell">Paid On</TableHead>
                            <TableHead>Parcel Price</TableHead>
                            <TableHead className="text-right">Transaction Id</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments?.map((payment, index) => (
                            <TableRow key={payment._id}>
                                <TableCell className="font-medium">{payment?.parcelName}</TableCell>
                                <TableCell className="">{payment?.date}</TableCell>
                                <TableCell>{payment?.price}</TableCell>
                                <TableCell className="text-right text-wrap">
                                    {payment?.transactionId}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PaymentHistory;