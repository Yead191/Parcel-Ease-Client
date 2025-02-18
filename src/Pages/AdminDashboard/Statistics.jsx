import React from "react";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import SectionHeading from "@/components/SectionHeading";
import useManageParcel from "@/hooks/useManageParcel";
import { useQuery } from "react-query";
import useStats from "@/hooks/useStats";
import CardStats from "@/components/CardStats";

const Statistics = () => {
    const [parcels, loading] = useManageParcel();

    const [stats, statsLoading] = useStats()
    if (loading || statsLoading) {
        return <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid"></div>
            <p className="mt-2">Loading Stats...</p>
        </div>
    }

    const bookingDates = parcels.map((parcel) => parcel.bookingDate);
    const deliveryStatuses = parcels.reduce(
        (acc, parcel) => {
            if (parcel.status === "Delivered") acc.delivered += 1;
            if (parcel.status === "Booked") acc.booked += 1;
            return acc;
        },
        { booked: 0, delivered: 0 }
    );

    const uniqueDates = [...new Set(bookingDates)].sort();
    const bookingsByDate = uniqueDates?.map(
        (date) => parcels.filter((parcel) => parcel.bookingDate === date).length
    );

    const validData = uniqueDates
        .map((date, index) => (date ? { date, count: bookingsByDate[index] } : null))
        .filter((item) => item !== null);

    const filteredDates = validData.map((item) => item.date);
    const filteredBookings = validData.map((item) => item.count);

    const barChartOptions = {
        chart: {
            type: "bar",
            height: 350,
        },
        xaxis: {
            categories: filteredDates,
            title: {
                text: "Booking Dates",
            },
        },
        yaxis: {
            title: {
                text: "Number of Bookings",
            },
        },
        title: {
            text: "Bookings by Date",
            align: "center",
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: "100%",
                    },
                    title: {
                        style: {
                            fontSize: "14px",
                        },
                    },
                },
            },
        ],
    };

    const barChartSeries = [
        {
            name: "Bookings",
            data: filteredBookings,
        },
    ];

    const lineChartOptions = {
        chart: {
            type: "line",
        },
        xaxis: {
            categories: uniqueDates,
        },
        title: {
            text: "Booked vs Delivered Parcels",
            align: "center",
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: "100%",
                    },
                    title: {
                        style: {
                            fontSize: "14px",
                        },
                    },
                },
            },
        ],
    };

    const lineChartSeries = [
        {
            name: "Booked Parcels",
            data: uniqueDates.map(
                (date) => parcels.filter((parcel) => parcel.bookingDate === date).length
            ),
        },
        {
            name: "Delivered Parcels",
            data: uniqueDates.map(
                (date) =>
                    parcels.filter(
                        (parcel) => parcel.bookingDate === date && parcel.status === "Delivered"
                    ).length
            ),
        },
    ];

    return (
        <div className="p-4 md:p-6 ">
            <Helmet>
                <title>Statistics | Parcel Ease</title>
            </Helmet>
            {/* <SectionHeading heading={"Statistics"}></SectionHeading> */}
            <CardStats stats={stats} ></CardStats>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {/* Bar Chart */}
                <div className="rounded-lg shadow-lg p-4 bg-white">
                    <ReactApexChart
                        options={barChartOptions}
                        series={barChartSeries}
                        type="bar"
                        height={350}
                    />
                </div>

                {/* Line Chart */}
                <div className="rounded-lg shadow-lg p-4 bg-white">
                    <ReactApexChart
                        options={lineChartOptions}
                        series={lineChartSeries}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
