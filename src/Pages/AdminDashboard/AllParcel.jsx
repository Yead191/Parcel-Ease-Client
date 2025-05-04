import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useManageParcel from "@/hooks/useManageParcel";
import SectionHeading from "@/components/SectionHeading";
import { ParcelModal } from "@/components/ui/parcelModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "@/hooks/useAuth";

export default function AllParcel() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchParam, setSearchParam] = useState("");
  // const [parcels, loading, refetch] = useManageParcel();
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  
  const {
    data: parcels,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", searchParam],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all-parcel?search=${searchParam}&from=${from}&to=${to}`
      );
      return data;
    },
  });

  //   console.log(searchParam);
  // Update `filteredParcels` whenever `parcels` changes (initial load)

  // console.log(parcels);
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-blue-500 hover:bg-blue-600";
      case "pending":
        return "bg-green-500 hover:bg-green-600";
      case "intransit":
        return "bg-yellow-500 hover:bg-green-600";
      case "cancelled":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  const axiosSecure = useAxiosSecure();

  // if (loading || searchLoading) {
  //   return (
  //     <div className="flex flex-col  justify-center items-center min-h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid"></div>
  //     </div>
  //   );
  // }
  const handleClearFilter = () => {
    setFrom("");
    setTo("");
    setSearchParam("");
    refetch();
  };

  return (
    <div className="container mx-auto  px-4 ">
      <Helmet>
        <title>Parcels | Parcel Ease</title>
      </Helmet>
      <SectionHeading heading={"All Parcel"}></SectionHeading>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Total Parcel: {parcels?.length}</h1>

        {/* Date Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* <div className="flex flex-col md:flex-row md:items-end gap-2">
            <div className="space-y-2">
              <div className="flex gap-4">

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">From Date</label>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full sm:w-auto"
                  />
                </div>

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
            {from || to || searchParam ? (
              <Button onClick={handleClearFilter} variant="destructive">
                Clear Filter
              </Button>
            ) : (
              <></>
            )}
          </div> */}
          <div className="mt-4">
            <div className="relative  w-full ">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                type="text"
                placeholder="Search parcels..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="rounded-md border overflow-x-scroll mb-20">
          <Table>
            <TableHeader>
              <TableRow
                style={{
                  background:
                    "linear-gradient(90deg, #540654, #cc0d85 50%, #540654 100%, #00d4ff 0)",
                }}
              >
                <TableHead>User's Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  User's Phone
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Booking Date
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Req. Delivery Date
                </TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcels?.map((parcel, index) => (
                <TableRow key={parcel._id}>
                  <TableCell className="font-medium">{parcel?.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {parcel?.number}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {parcel?.bookingDate}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {parcel?.deliveryDate}
                  </TableCell>
                  <TableCell>{parcel?.price}</TableCell>
                  <TableCell>{parcel?.deliveryName}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(parcel.status)}>
                      {parcel?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {parcel.status === "Cancelled" ? (
                      <Button disabled variant="" size="sm" className="text-xs">
                        Not Available
                      </Button>
                    ) : (
                      <ParcelModal
                        refetch={refetch}
                        status={parcel.status}
                        value={parcel._id}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
