import { FaDollarSign, FaUsers, FaBook, FaTruck } from "react-icons/fa";

const CardStats = ({ stats }) => {
    return (
        <div className="flex flex-col gap-4 w-full md:flex-row my-8">
            {/* Revenue Card */}
            <div className="flex flex-col justify-between p-4 rounded-lg shadow-md w-full bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-white">
                        <FaDollarSign className="text-4xl" />
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="text-lg font-medium text-white">Revenue</h4>
                    <p className="text-3xl font-bold text-white">{stats?.revenue}</p>
                    <p className="text-sm text-white">2025</p>
                </div>
            </div>

            {/* Total Users Card */}
            <div className="flex flex-col justify-between p-4 rounded-lg shadow-md w-full bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-white">
                        <FaUsers className="text-4xl" />
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="text-lg font-medium text-white">Total Users</h4>
                    <p className="text-3xl font-bold text-white">{stats?.users}</p>
                    <p className="text-sm text-white">↗︎ 400 (22%)</p>
                </div>
            </div>

            {/* Menu Items Card */}
            <div className="flex flex-col justify-between p-4 rounded-lg shadow-md w-full bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-white">
                        <FaBook className="text-4xl" />
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="text-lg font-medium text-white">Total Parcel Bookings</h4>
                    <p className="text-3xl font-bold text-white">{stats?.totalBooking}</p>
                    <p className="text-sm text-white">↘︎ 90 (14%)</p>
                </div>
            </div>

            {/* Orders Card */}
            <div className="flex flex-col justify-between p-4 rounded-lg shadow-md w-full bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-white">
                        <FaTruck className="text-4xl" />
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="text-lg font-medium text-white">Total Deliveries</h4>
                    <p className="text-3xl font-bold text-white">{stats?.deliveries}</p>
                    <p className="text-sm text-white">↘︎ 90 (14%)</p>
                </div>
            </div>
        </div>
    );
};

export default CardStats;
