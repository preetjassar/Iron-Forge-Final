import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaDumbbell } from "react-icons/fa";
import HeroImage from "../assets/hero.webp";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <section
            className="min-h-screen relative flex items-center justify-center"
            style={{
                backgroundImage: `url(${HeroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/75"></div>

            {/* Orange Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 blur-[120px]"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px]"></div>

            {/* Card */}
            <div className="relative z-10 w-[92%] max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">


                <div className="flex justify-center">
                    <FaDumbbell
                        className="w-24 h-24 text-orange-500"
                    />
                </div>

                {/* Badge */}
                <div className="flex justify-center mt-4">
                    <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                        PREMIUM FITNESS CLUB
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-center text-white text-5xl font-black mt-8">
                    IRON
                    <span className="text-orange-500">
                        {" "}FORGE
                    </span>
                </h1>

                <p className="text-center text-gray-400 mt-5 text-lg">
                    Transform your body, track your progress,
                    and achieve your fitness goals with
                    expert coaching.
                </p>

                {/* Buttons */}
                <div className="mt-10 space-y-4">

                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-3 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                    >
                        Login
                        <FaArrowRight />
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="w-full border border-orange-500 text-white py-4 rounded-2xl font-semibold hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
                    >
                        Create Account
                    </button>

                    <div className="text-center text-gray-500">
                        OR
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full border border-zinc-700 bg-black/30 text-white py-4 rounded-2xl hover:border-orange-500 transition-all duration-300 cursor-pointer"
                    >
                        Continue as Guest
                    </button>

                </div>

                {/* Bottom Text */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    Join hundreds of members building a stronger lifestyle.
                </p>

            </div>
        </section>
    );
}