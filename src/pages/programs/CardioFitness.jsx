import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cardio from "../../assets/programers/cardio.png";
import Simran from "../../assets/Trainers/Simran.jpeg";
const programData = {
    id: 3,
    title: "Cardio Fitness",
    name: "Cardio Fitness",
    description: "Boost endurance, stamina, and heart health through focused high-tempo cardio circuits.",
    duration: "6 Weeks",
    trainer: "Simran Kaur",
    price: 8999,
    schedule: "Tue, Thu, Sat (6:30 AM - 8:30 AM & 5:30 PM - 7:30 PM)",
    level: "Beginner / Intermediate",
};

export default function CardioFitness() {
    const navigate = useNavigate();

    return (
        <section className="bg-black text-white min-h-screen">

            {/* HERO */}

            <div
                className="h-[75vh] bg-cover bg-center relative flex items-center"
                style={{
                    backgroundImage: `url(${Cardio})`,
                }}
            >
                <div className="absolute inset-0 bg-black/75"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 text-orange-500 hover:text-orange-400 transition cursor-pointer"
                    >
                        ← ALL PROGRAMS
                    </button>

                    <h1 className="text-5xl md:text-8xl font-bold">
                        CARDIO FITNESS
                    </h1>

                    <p className="text-gray-300 mt-6 max-w-3xl text-lg">
                        Boost your endurance, strengthen your heart, and
                        improve your overall fitness with our high-energy
                        cardio training program designed for all levels.
                    </p>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* WEEKLY PLAN + BENEFITS */}

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-zinc-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition">

                        <h2 className="text-orange-500 text-2xl font-bold mb-5">
                            WEEKLY PLAN
                        </h2>

                        <ul className="space-y-4 text-lg">
                            <li>• Monday - HIIT Training</li>
                            <li>• Tuesday - Running Drills</li>
                            <li>• Wednesday - Cycling Session</li>
                            <li>• Thursday - Jump Rope Workout</li>
                            <li>• Friday - Rowing Exercises</li>
                            <li>• Saturday - Full Cardio Circuit</li>
                        </ul>

                    </div>

                    <div className="bg-zinc-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition">

                        <h2 className="text-orange-500 text-2xl font-bold mb-5">
                            BENEFITS
                        </h2>

                        <ul className="space-y-4 text-lg">

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                Improved Heart Health
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                Increased Stamina
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                Better Lung Capacity
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                Higher Energy Levels
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                Faster Recovery
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheck className="text-orange-500" />
                                Enhanced Endurance
                            </li>

                        </ul>

                    </div>

                </div>

                {/* WHO IS THIS PROGRAM FOR */}

                <div className="bg-zinc-900 rounded-2xl border border-gray-800 p-8 mt-10 hover:border-orange-500 transition">

                    <h2 className="text-3xl font-bold text-orange-500 mb-6">
                        WHO IS THIS PROGRAM FOR?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 text-lg">

                        <p>• Beginners wanting to improve overall fitness.</p>
                        <p>• Individuals preparing for sports events.</p>
                        <p>• Members aiming to lose body fat.</p>
                        <p>• Athletes seeking better endurance.</p>
                        <p>• Busy professionals wanting more energy.</p>
                        <p>• Anyone looking for an active lifestyle.</p>

                    </div>

                </div>

                {/* TRAINER */}

                <div className="bg-zinc-900 rounded-2xl border border-gray-800 p-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex items-center gap-6">

                        <img
                            src={Simran}
                            alt="Simran Kaur"
                            className="w-24 h-24 rounded-full border-2 border-orange-500 object-cover"
                        />

                        <div>

                            <p className="text-orange-500 font-semibold">
                                RECOMMENDED TRAINER
                            </p>

                            <h2 className="text-4xl font-bold">
                                Simran Kaur
                            </h2>

                            <p className="text-gray-400 text-lg">
                                Dance Cardio
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
                                8
                            </h3>
                            <p className="text-gray-400 mt-2">Weeks Duration</p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                6
                            </h3>
                            <p className="text-gray-400 mt-2">Sessions / Week</p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                60
                            </h3>
                            <p className="text-gray-400 mt-2">Minutes / Session</p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                100%
                            </h3>
                            <p className="text-gray-400 mt-2">Coach Support</p>
                        </div>

                    </div>

                </div>

                {/* JOIN PROGRAM */}

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