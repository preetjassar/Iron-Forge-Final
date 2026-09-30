import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Crossfit from "../../assets/programers/crossfit.png";
import Mohit from "../../assets/Trainers/Mohit.png";
const programData = {
    title: "CrossFit",
    description: "Intense functional training combining Olympic lifting, gymnastics, and high-density work capacity.",
    duration: "8 Weeks",
    trainer: "Mohit Gupta",
    price: 10999,
    schedule: "Mon - Sat, 6:00 AM - 9:00 AM & 5:00 PM - 8:30 PM",
    level: "Intermediate / Advanced",
};
export default function CrossFitpage() {
    const navigate = useNavigate();

    return (
        <section className="bg-black text-white min-h-screen">


            <div
                className="h-[70vh] bg-cover bg-center relative flex items-center"
                style={{
                    backgroundImage: `url(${Crossfit})`,
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    <button
                        onClick={() => navigate("/programs")}
                        className="mb-8 text-orange-500 cursor-pointer hover:text-orange-400 transition"
                    >
                        ← ALL PROGRAMS
                    </button>

                    <h1 className="text-5xl md:text-8xl font-bold">
                        CROSSFIT
                    </h1>

                    <p className="text-gray-300 mt-6 max-w-3xl text-lg">
                        Challenge your limits with our CrossFit program,
                        combining strength, endurance, agility, and functional
                        fitness to help you perform at your absolute best.
                    </p>
                </div>
            </div>



            <div className="max-w-7xl mx-auto px-6 py-20">



                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-zinc-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition duration-300">

                        <h2 className="text-orange-500 text-2xl font-bold mb-5">
                            WEEKLY PLAN
                        </h2>

                        <ul className="space-y-4 text-lg">
                            <li>• Monday - Functional Strength</li>
                            <li>• Tuesday - Olympic Lifting</li>
                            <li>• Wednesday - WOD Challenge</li>
                            <li>• Thursday - Mobility & Recovery</li>
                            <li>• Friday - Team Workout</li>
                            <li>• Saturday - Endurance Training</li>
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



                <div className="bg-zinc-900 rounded-2xl p-8 mt-10 border border-gray-800 hover:border-orange-500 transition duration-300">

                    <h2 className="text-3xl font-bold text-orange-500 mb-6">
                        WHO IS THIS PROGRAM FOR?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 text-lg">

                        <p>
                            • Fitness enthusiasts looking for a challenge.
                        </p>

                        <p>
                            • Athletes wanting peak performance.
                        </p>

                        <p>
                            • Members seeking functional fitness.
                        </p>

                        <p>
                            • Individuals wanting full-body workouts.
                        </p>

                        <p>
                            • People interested in competitive fitness.
                        </p>

                        <p>
                            • Anyone ready to push their limits.
                        </p>
                    </div>
                </div>


                <div className="bg-zinc-900 rounded-2xl border border-gray-800 p-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex items-center gap-6">

                        <img
                            src={Mohit}
                            alt="Mohit Gupta"
                            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                        />

                        <div>
                            <p className="text-orange-500 font-semibold">
                                RECOMMENDED TRAINER
                            </p>

                            <h2 className="text-4xl font-bold">
                                Mohit Gupta
                            </h2>

                            <p className="text-gray-400 text-lg">
                                CrossFit Coach
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
                                10
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Weeks Duration
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                6
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Sessions / Week
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">
                                75
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