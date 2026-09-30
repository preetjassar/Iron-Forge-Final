import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Strength from "../../assets/programers/Strength.png";
import Arjun from "../../assets/Trainers/Arjun.png";
const programData = {
    title: "Strength Training",
    description: "Build lean muscle and increase raw strength with progressive overload and power lifting foundations.",
    duration: "12 Weeks",
    trainer: "Arjun Mehta",
    price: 12999,
    schedule: "Mon - Fri, 6:00 AM - 10:00 AM & 5:00 PM - 9:00 PM",
    level: "Intermediate / Advanced",
};
export default function StrengthTraining() {
    const navigate = useNavigate();

    return (
        <section className="bg-black text-white min-h-screen">

            {/* HERO SECTION */}

            <div
                className="h-[70vh] bg-cover bg-center relative flex items-center"
                style={{
                    backgroundImage: `url(${Strength})`,
                }}
            >
                {/* Overlay */}

                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <button
                        onClick={() => navigate("/programs")}
                        className="mb-8 text-orange-500 cursor-pointer hover:text-orange-400 transition"
                    >
                        ← ALL PROGRAMS
                    </button>

                    <h1 className="text-5xl md:text-8xl font-bold">
                        STRENGTH TRAINING
                    </h1>

                    <p className="text-gray-300 mt-6 max-w-3xl text-lg">
                        Build muscle, improve power, and develop overall body
                        strength with our progressive overload program.
                    </p>
                </div>
            </div>

            {/* CONTENT */}

            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Weekly Plan + Benefits */}

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-zinc-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition duration-300">
                        <h2 className="text-orange-500 text-2xl font-bold mb-5">
                            WEEKLY PLAN
                        </h2>

                        <ul className="space-y-4 text-lg">
                            <li>• Monday - Lower Body Strength</li>
                            <li>• Tuesday - Chest & Triceps</li>
                            <li>• Wednesday - Recovery & Mobility</li>
                            <li>• Thursday - Back & Biceps</li>
                            <li>• Friday - Full Body Power</li>
                            <li>• Saturday - Optional Accessory Work</li>
                        </ul>
                    </div>

                    <div className="bg-zinc-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition duration-300">
                        <h2 className="text-orange-500 text-2xl font-bold mb-5">
                            BENEFITS
                        </h2>

                        <ul className="space-y-4 text-lg">
                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Full Body Conditioning</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Increased Strength</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Improved Agility</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Better Coordination</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Enhanced Athletic Performance</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Higher Endurance Levels</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* WHO IS THIS FOR */}

                <div className="bg-zinc-900 rounded-2xl p-8 mt-10 border border-gray-800 hover:border-orange-500 transition duration-300">

                    <h2 className="text-3xl font-bold text-orange-500 mb-6">
                        WHO IS THIS PROGRAM FOR?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 text-lg">

                        <p>
                            • Beginners looking to build confidence in the gym.
                        </p>

                        <p>
                            • Intermediate lifters aiming to gain more strength.
                        </p>

                        <p>
                            • Athletes seeking explosive power and performance.
                        </p>

                        <p>
                            • Members focused on muscle gain and physique.
                        </p>

                        <p>
                            • Individuals wanting a healthier lifestyle.
                        </p>

                        <p>
                            • Anyone committed to long-term fitness goals.
                        </p>
                    </div>
                </div>

                {/* TRAINER */}

                <div className="bg-zinc-900 rounded-2xl border border-gray-800 p-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex items-center gap-6">

                        <img
                            src={Arjun}
                            alt="Arjun Mehta"
                            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                        />

                        <div>
                            <p className="text-orange-500 font-semibold">
                                RECOMMENDED TRAINER
                            </p>

                            <h2 className="text-4xl font-bold">
                                Arjun Mehta
                            </h2>

                            <p className="text-gray-400 text-lg">
                                Strength Coach
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/booksession")
                        }
                        className="border border-gray-700 px-8 py-3 rounded-full hover:bg-orange-500 hover:text-black hover:border-orange-500 transition cursor-pointer font-bold"
                    >
                        BOOK A TRIAL SESSION
                    </button>
                </div>

                {/* PROGRAM HIGHLIGHTS */}

                <div className="mt-10 bg-zinc-900 border border-gray-800 rounded-2xl p-8 hover:border-orange-500 transition">

                    <h2 className="text-3xl font-bold text-orange-500 mb-6">
                        PROGRAM HIGHLIGHTS
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 text-center">

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                12
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Weeks Duration
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                5
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Sessions / Week
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                90
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Minutes / Session
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                100%
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Coach Support
                            </p>
                        </div>
                    </div>
                </div>

                {/* JOIN BUTTON */}

                <div className="text-center mt-16">

                    <button
                        onClick={() =>
                            navigate("/joinprogram", {
                                state: {
                                    program: programData,
                                },
                            })
                        }
                        className="bg-orange-500 px-12 py-5 rounded-full text-black font-bold text-lg hover:scale-105 transition duration-300 cursor-pointer"
                    >
                        JOIN THIS PROGRAM
                    </button>
                </div>
            </div>
        </section>
    );
}