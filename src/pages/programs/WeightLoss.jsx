import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Weightloss from "../../assets/programers/weightloss.png";
import Rohan from "../../assets/Trainers/Rohan Malhotra.png";
const programData = {
    title: "Weight Loss",
    description: "Torch body fat and sculpt athletic muscle with structured metabolic conditioning and nutrition guidance.",
    duration: "8 Weeks",
    trainer: "Rohan Malhotra",
    price: 9999,
    schedule: "Mon, Wed, Fri, 7:00 AM - 9:00 AM & 6:00 PM - 8:00 PM",
    level: "All Fitness Levels",
};
export default function WeightLoss() {
    const navigate = useNavigate();

    return (
        <section className="bg-black text-white min-h-screen">

            <div
                className="h-[75vh] bg-cover bg-center relative flex items-center"
                style={{
                    backgroundImage: `url(${Weightloss})`,
                }}
            >
                <div className="absolute inset-0 bg-black/75"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    <button
                        onClick={() => navigate("/programs")}
                        className="mb-8 text-orange-500 cursor-pointer hover:text-orange-400 transition"
                    >
                        ← ALL PROGRAMS
                    </button>

                    <h1 className="text-5xl md:text-8xl font-bold">
                        WEIGHT LOSS
                    </h1>

                    <p className="text-gray-300 mt-6 max-w-3xl text-lg">
                        Lose fat, build confidence, and transform your lifestyle
                        with our structured weight loss program that combines
                        training, nutrition, and accountability.
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
                            <li>• Monday - Fat Burn Circuit</li>
                            <li>• Tuesday - HIIT Training</li>
                            <li>• Wednesday - Core Workout</li>
                            <li>• Thursday - Strength Session</li>
                            <li>• Friday - Cardio Blast</li>
                            <li>• Saturday - Full Body Workout</li>
                        </ul>
                    </div>

                    <div className="bg-zinc-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition duration-300">

                        <h2 className="text-orange-500 text-2xl font-bold mb-5">
                            BENEFITS
                        </h2>

                        <ul className="space-y-4 text-lg">

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Sustainable Fat Loss</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Increased Energy Levels</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Improved Metabolism</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Better Confidence</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Enhanced Mobility</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                <span>Healthier Lifestyle</span>
                            </li>

                        </ul>

                    </div>
                </div>

                {/* WHO IS THIS PROGRAM FOR? */}

                <div className="bg-zinc-900 rounded-2xl p-8 mt-10 border border-gray-800 hover:border-orange-500 transition duration-300">

                    <h2 className="text-3xl font-bold text-orange-500 mb-6">
                        WHO IS THIS PROGRAM FOR?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 text-lg">

                        <p>
                            • Beginners starting their fitness journey.
                        </p>

                        <p>
                            • Individuals looking to reduce body fat.
                        </p>

                        <p>
                            • Members wanting healthier habits.
                        </p>

                        <p>
                            • People preparing for a body transformation.
                        </p>

                        <p>
                            • Busy professionals wanting efficient workouts.
                        </p>

                        <p>
                            • Anyone committed to long-term weight management.
                        </p>

                    </div>
                </div>

                {/* TRAINER */}

                <div className="bg-zinc-900 rounded-2xl border border-gray-800 p-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex items-center gap-6">

                        <img
                            src={Rohan}
                            alt="Rohan Malhotra"
                            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                        />

                        <div>

                            <p className="text-orange-500 font-semibold">
                                RECOMMENDED TRAINER
                            </p>

                            <h2 className="text-4xl font-bold">
                                Rohan Malhotra
                            </h2>

                            <p className="text-gray-400 text-lg">
                                Weight Loss Expert
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
                                60
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