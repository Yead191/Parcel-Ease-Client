import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import useStats from '@/hooks/useStats';
import useAuth from '@/hooks/useAuth';

const Stats = () => {
    const [refBookings, bookingsInView] = useInView({ triggerOnce: true });
    const [refDeliveries, deliveriesInView] = useInView({ triggerOnce: true });
    const [refUsers, usersInView] = useInView({ triggerOnce: true });
    const { loading } = useAuth();

    const [stats, statsLoading] = useStats();

    if (loading || statsLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-900 border-solid"></div>
            </div>
        );
    }

    return (
        <section className="py-12 bg-muted mb-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Stat 1: Total Bookings */}
                <div className="text-center">
                    <div ref={refBookings}>
                        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                            {bookingsInView ? <CountUp start={0} end={stats.totalBooking || 0} duration={3} separator="," /> : 0}+
                        </h2>
                    </div>
                    <p className="text-primary text-lg mt-2">Total Bookings</p>
                </div>

                {/* Stat 2: Total Deliveries */}
                <div className="text-center">
                    <div ref={refDeliveries}>
                        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                            {deliveriesInView ? <CountUp start={0} end={stats.deliveries || 0} duration={3} /> : 0}+
                        </h2>
                    </div>
                    <p className="text-primary text-lg mt-2">Total Deliveries</p>
                </div>

                {/* Stat 3: Total Users */}
                <div className="text-center">
                    <div ref={refUsers}>
                        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                            {usersInView ? <CountUp start={0} end={stats.users || 0} duration={3} /> : 0}+
                        </h2>
                    </div>
                    <p className="text-primary text-lg mt-2">Total Users</p>
                </div>
            </div>
        </section>
    );
};

export default Stats;
