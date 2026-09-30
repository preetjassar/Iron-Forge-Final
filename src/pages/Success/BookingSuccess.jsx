import { useLocation, useNavigate } from "react-router-dom";
import {
    FaCalendarCheck,
    FaHome,
    FaUserTie,
    FaCalendarAlt,
    FaClock,
    FaHashtag,
} from "react-icons/fa";

export default function BookingSuccess() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const booking = state || {
        trainer: "Not Assigned",
        sessionDate: "N/A",
        sessionTime: "N/A",
        bookingId: "N/A",
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-5 py-12">
            <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-black/50 p-10">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30">
                        <FaCalendarCheck className="text-5xl text-green-400" />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mt-6">
                    <h1 className="text-3xl font-bold text-white">
                        Session Booked Successfully
                    </h1>

                    <p className="mt-3 text-gray-400 leading-relaxed">
                        Your workout session has been confirmed. We look forward
                        to seeing you at the gym.
                    </p>
                </div>

                {/* Booking Details */}
                <div className="mt-10 rounded-2xl bg-black/40 border border-zinc-800 divide-y divide-zinc-800">

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <FaUserTie />
                            <span>Trainer</span>
                        </div>

                        <span className="text-white font-medium text-right">
                            {booking.trainer}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <FaCalendarAlt />
                            <span>Date</span>
                        </div>

                        <span className="text-orange-400 font-semibold">
                            {booking.sessionDate}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <FaClock />
                            <span>Time</span>
                        </div>

                        <span className="text-white">
                            {booking.sessionTime}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <FaHashtag />
                            <span>Booking ID</span>
                        </div>

                        <span className="font-mono text-green-400">
                            {booking.bookingId}
                        </span>
                    </div>

                </div>

                {/* Success Note */}
                <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
                    <p className="text-center text-sm text-orange-200 leading-6">
                        Please arrive at least <span className="font-semibold">10 minutes early</span> for your scheduled session and carry your membership ID.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3.5 text-base font-semibold text-black transition-all duration-300 hover:bg-orange-400 hover:scale-[1.02]"
                    >
                        <FaCalendarCheck />
                        View My Profile
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800/80 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-zinc-700 hover:scale-[1.02]"
                    >
                        <FaHome />
                        Back to Home
                    </button>
                </div>
            </div>
        </section>
    );
}