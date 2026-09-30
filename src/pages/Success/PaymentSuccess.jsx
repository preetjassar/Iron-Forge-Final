import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDumbbell, FaUser, FaTag } from "react-icons/fa";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const payment = state || {
        programName: "Strength Training",
        amount: 12999,
        paymentId: "IFG" + Math.floor(100000 + Math.random() * 900000),
        trainer: "Certified Coach",
        duration: "12 Weeks",
        schedule: "Mon - Sat (Flexible)",
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#070707] px-4 py-20 relative overflow-hidden">
            {/* Glow backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 blur-[140px] pointer-events-none rounded-full" />

            <div className="w-full max-w-lg bg-[#111111] border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 text-center relative z-10">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/40 text-green-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <FaCheckCircle className="text-4xl" />
                    </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <FaTag size={11} />
                    <span>Payment & Enrollment Verified</span>
                </div>

                <h1
                    className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    You're Successfully Enrolled!
                </h1>

                <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                    Your Iron Forge membership has been activated and linked directly to your member profile.
                </p>

                {/* Payment & Program Details */}
                <div className="mt-8 bg-black/50 border border-white/10 rounded-2xl p-5 space-y-3.5 text-left text-xs sm:text-sm">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                        <span className="text-gray-400">Enrolled Program:</span>
                        <span className="text-white font-bold text-right">{payment.programName}</span>
                    </div>

                    {payment.trainer && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                            <span className="text-gray-400">Assigned Coach:</span>
                            <span className="text-white font-semibold">{payment.trainer}</span>
                        </div>
                    )}

                    {payment.duration && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                            <span className="text-gray-400">Program Duration:</span>
                            <span className="text-white">{payment.duration}</span>
                        </div>
                    )}

                    {payment.schedule && (
                        <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                            <span className="text-gray-400">Schedule:</span>
                            <span className="text-white text-right max-w-[200px]">{payment.schedule}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                        <span className="text-gray-400">Tuition Paid:</span>
                        <span className="text-orange-400 font-bold">₹{payment.amount}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 text-xs">
                            Active
                        </span>
                    </div>

                    <div className="flex justify-between items-center pt-0.5">
                        <span className="text-gray-400">Payment Reference:</span>
                        <span className="text-orange-400 font-mono font-bold">{payment.paymentId}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate("/profile")}
                        className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-black py-3.5 rounded-full font-extrabold uppercase tracking-wider text-xs transition duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                    >
                        <FaUser size={12} />
                        <span>View My Profile</span>
                    </button>
                    <button
                        onClick={() => navigate("/programs")}
                        className="cursor-pointer flex-1 flex items-center justify-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs transition duration-300"
                    >
                        <FaDumbbell size={12} />
                        <span>Explore Programs</span>
                    </button>
                </div>
            </div>
        </section>
    );
}