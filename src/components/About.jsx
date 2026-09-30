import {
    FaDumbbell,
    FaUsers,
    FaHeart,
    FaAward,
    FaQuoteLeft,
    FaBullseye,
    FaEye,
    FaMapMarkerAlt,
    FaChevronRight,
    FaCheckCircle,
    FaHome,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Gym from "../assets/about/Gym.avif";
import Dumbell from "../assets/about/Dumbell.avif";
export default function About() {


    const facilityFeatures = [
        "10,000 sq. ft. training floor",
        "Dedicated free-weight & powerlifting zone",
        "Functional training & turf area",
        "Full cardio deck with heart-rate integration",
        "Recovery & mobility stretch zone",
        "Private locker rooms & showers",
        "On-site nutrition consultation desk",
        "Free member parking",
    ];

    const timelineData = [
        {
            year: "2021",
            title: "Iron Forge Founded",
            text: "Started with a vision to build a fitness community focused on strength and discipline.",
        },
        {
            year: "2022",
            title: "Growing Community",
            text: "Hundreds of members joined our journey and achieved incredible transformations.",
        },
        {
            year: "2023",
            title: "Premium Equipment Added",
            text: "Expanded our facility with modern machines and better training experiences.",
        },
        {
            year: "2024",
            title: "Expert Training Team",
            text: "Built a team of certified trainers dedicated to member success.",
        },
        {
            year: "2025",
            title: "1000+ Transformations",
            text: "Helping people become stronger, healthier, and more confident every day.",
        },
    ];


    return (
        <>
            {/* ===== HERO BANNER ===== */}
            <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden">
                <img
                    src={Gym}
                    alt="Iron Forge training floor"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

                <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-16 pb-16 max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                        <FaHome className="text-orange-500" />
                        <Link to="/" className="hover:text-white transition cursor-pointer">
                            Home
                        </Link>
                        <FaChevronRight className="text-xs text-gray-600" />
                        <span className="text-white font-medium">About</span>
                    </div>

                    <p className="uppercase tracking-[5px] text-orange-500 font-semibold mb-5">
                        Est. 2014 · Ludhiana
                    </p>

                    <h1
                        className="text-6xl md:text-8xl uppercase text-white leading-[0.95]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        BUILT ON IRON.
                        <br />
                        PROVEN BY TIME.
                    </h1>

                    <p className="text-gray-300 text-lg mt-6 max-w-2xl leading-8">
                        A decade of coaching, community, and honest hard work — this is
                        the story of Iron Forge.
                    </p>
                </div>
            </section>

            {/* ===== OUR STORY ===== */}
            <section className="bg-[#0c0c0c] py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <p className="uppercase tracking-[4px] text-orange-500 font-semibold mb-4">
                            Our Story
                        </p>

                        <h2
                            className="text-5xl uppercase text-white leading-[1.05] mb-8"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            FORGED FROM A
                            <br />
                            SINGLE SQUAT RACK
                        </h2>

                        <p className="text-gray-400 leading-8 mb-6">
                            Iron Forge didn't start as a franchise blueprint. It started in a
                            rented 800 sq. ft. unit with one squat rack, a stack of secondhand
                            plates, and a handful of people who refused to quit on a cold
                            January morning. There was no smoothie bar. No air conditioning.
                            Just reps, sweat, and a shared belief that discipline builds more
                            than muscle.
                        </p>

                        <p className="text-gray-400 leading-8 mb-10">
                            A decade later, that same belief runs through every square foot of
                            our current facility. We've scaled the equipment, the trainers,
                            and the space — but the culture that got us here hasn't changed.
                            We still measure success one honest rep at a time.
                        </p>

                        <div className="flex gap-6 items-start bg-[#111111] border border-gray-800 rounded-3xl p-8 hover:border-orange-500/60 transition duration-300">
                            <FaQuoteLeft className="text-3xl text-orange-500 shrink-0 mt-1" />
                            <div>
                                <p className="text-gray-300 leading-8 italic">
                                    We built this gym for the person who feels intimidated
                                    walking through the door — because that person was me, once.
                                </p>
                                <p className="text-white font-semibold mt-4">
                                    — Founder, Iron Forge
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-gray-800">
                            <img
                                src={Dumbell}
                                alt="Iron Forge gym floor"
                                className="w-full h-full object-cover hover:scale-105 transition duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-[#111111] border border-orange-500 rounded-2xl p-6 shadow-xl shadow-black/50 hidden md:block">
                            <p className="text-4xl font-bold text-orange-500">2014</p>
                            <p className="text-gray-400 uppercase tracking-wider text-sm mt-1">
                                Founded in Ludhiana
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative mt-24 px-6 lg:px-16 pb-28 bg-[#090909]">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-20">

                        <p className="text-orange-500 uppercase tracking-[5px] font-semibold mb-3">
                            OUR JOURNEY
                        </p>

                        <h2
                            className="text-5xl uppercase text-white"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif"
                            }}
                        >
                            The Iron Forge Story
                        </h2>

                        <p className="text-gray-400 max-w-2xl mx-auto mt-6 leading-8">
                            Every milestone represents our dedication to building a stronger
                            fitness community.
                        </p>

                    </div>


                    <div className="relative max-w-5xl mx-auto">


                        {/* Timeline Line */}

                        <div
                            className="
                absolute
                left-1/2
                top-0
                h-full
                w-[2px]
                -translate-x-1/2
                bg-zinc-800
                hidden
                md:block
                "
                        />


                        <div className="space-y-20">


                            {timelineData.map((item, index) => (

                                <div
                                    key={index}
                                    className={`
                        relative flex items-center
                        ${index % 2 === 0
                                            ? "md:justify-start"
                                            : "md:justify-end"
                                        }
                        `}
                                >


                                    {/* Dot */}

                                    <div
                                        className="
                            hidden
                            md:block
                            absolute
                            left-1/2
                            -translate-x-1/2
                            w-5
                            h-5
                            rounded-full
                            bg-orange-500
                            border-4
                            border-[#090909]
                            shadow-[0_0_20px_rgba(249,115,22,.6)]
                            "
                                    />



                                    {/* Card */}

                                    <div
                                        className="
                            group
                            w-full
                            md:w-[45%]
                            rounded-3xl
                            border
                            border-gray-800
                            bg-[#111111]
                            p-8
                            transition-all
                            duration-500
                            hover:-translate-y-3
                            hover:border-orange-500
                            hover:shadow-[0_25px_60px_rgba(249,115,22,.12)]
                            "
                                    >


                                        <span
                                            className="
                                text-orange-500
                                text-sm
                                font-semibold
                                tracking-[4px]
                                "
                                        >
                                            {item.year}
                                        </span>


                                        <h3
                                            className="
                                mt-3
                                text-3xl
                                font-bold
                                text-white
                                group-hover:text-orange-500
                                transition
                                "
                                        >
                                            {item.title}
                                        </h3>


                                        <p
                                            className="
                                mt-4
                                text-gray-400
                                leading-8
                                "
                                        >
                                            {item.text}
                                        </p>


                                    </div>


                                </div>

                            ))}


                        </div>


                    </div>


                </div>


            </section>




            {/* ===== MISSION & VISION — Glassmorphism ===== */}
            <section className="relative py-24 px-6 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 bg-[#090909]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px]" />

                <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/[0.08] hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                            <FaBullseye className="text-3xl text-orange-500" />
                        </div>
                        <h3
                            className="text-3xl uppercase text-white mb-5"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            Our Mission
                        </h3>
                        <p className="text-gray-300 leading-8">
                            To make serious, results-driven training accessible to everyone —
                            regardless of experience level — through expert coaching,
                            honest programming, and a facility that never feels
                            intimidating.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/[0.08] hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                            <FaEye className="text-3xl text-orange-500" />
                        </div>
                        <h3
                            className="text-3xl uppercase text-white mb-5"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            Our Vision
                        </h3>
                        <p className="text-gray-300 leading-8">
                            To become the region's most trusted training community — a place
                            where members return not just for the equipment, but for the
                            people and the progress they find here.
                        </p>
                    </div>

                </div>
            </section>

            {/* ===== CORE VALUES — Animated Icon Cards ===== */}
            <section className="bg-[#0c0c0c] py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">

                        <p className="uppercase tracking-[4px] text-orange-500 font-semibold mb-4">
                            Our Values
                        </p>

                        <h2
                            className="text-5xl uppercase text-white"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            WHAT DRIVES US
                        </h2>

                        <p className="text-gray-400 mt-6 max-w-3xl mx-auto leading-8">
                            Every workout, every coaching session, and every achievement is
                            built on values that inspire our members to become stronger,
                            healthier, and more confident every day.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="group bg-[#111111] rounded-3xl border border-gray-800 p-8 hover:border-orange-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:rotate-6 transition duration-300">
                                <FaDumbbell className="text-3xl text-orange-500 group-hover:text-black transition duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Strength
                            </h3>
                            <p className="text-gray-400 leading-8">
                                Building physical and mental strength through consistency,
                                discipline, and expert coaching.
                            </p>
                        </div>

                        <div className="group bg-[#111111] rounded-3xl border border-gray-800 p-8 hover:border-orange-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:rotate-6 transition duration-300">
                                <FaUsers className="text-3xl text-orange-500 group-hover:text-black transition duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Community
                            </h3>
                            <p className="text-gray-400 leading-8">
                                A supportive environment where members motivate each other to
                                achieve greater success together.
                            </p>
                        </div>

                        <div className="group bg-[#111111] rounded-3xl border border-gray-800 p-8 hover:border-orange-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:rotate-6 transition duration-300">
                                <FaHeart className="text-3xl text-orange-500 group-hover:text-black transition duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Wellness
                            </h3>
                            <p className="text-gray-400 leading-8">
                                Promoting long-term health through balanced fitness, nutrition,
                                and healthy habits.
                            </p>
                        </div>

                        <div className="group bg-[#111111] rounded-3xl border border-gray-800 p-8 hover:border-orange-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:rotate-6 transition duration-300">
                                <FaAward className="text-3xl text-orange-500 group-hover:text-black transition duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Excellence
                            </h3>
                            <p className="text-gray-400 leading-8">
                                Delivering world-class facilities, experienced trainers, and
                                outstanding service every day.
                            </p>
                        </div>

                    </div>

                </div>
            </section>



            {/* ===== OUR FACILITY ===== */}
            <section className="bg-[#0c0c0c] py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-14">
                        <p className="uppercase tracking-[4px] text-orange-500 font-semibold mb-4">
                            Our Facility
                        </p>
                        <h2
                            className="text-5xl uppercase text-white"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            A SPACE BUILT TO PERFORM
                        </h2>
                    </div>

                    <div className="relative rounded-[32px] overflow-hidden border border-gray-800 mb-14">
                        <img
                            src={Gym}
                            alt="Iron Forge facility showcase"
                            className="w-full h-[420px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-orange-500 uppercase tracking-[3px] text-sm font-semibold mb-2">
                                10,000 sq. ft.
                            </p>
                            <h3
                                className="text-4xl md:text-5xl uppercase text-white"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                One Floor. Every Discipline.
                            </h3>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
                        {facilityFeatures.map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-[#111111] border border-gray-800 rounded-xl px-5 py-4 hover:border-orange-500/60 transition duration-300"
                            >
                                <FaCheckCircle className="text-orange-500 shrink-0" />
                                <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </section>



            {/* ===== YOUR TRANSFORMATION STARTS HERE ===== */}
            <section className="bg-gradient-to-b from-[#0c0c0c] to-black py-28 px-6 lg:px-16 border-t border-gray-800">
                <div className="max-w-5xl mx-auto text-center">

                    <p className="uppercase tracking-[5px] text-orange-500 font-semibold mb-5">
                        Your Next Chapter
                    </p>

                    <h2
                        className="text-5xl md:text-7xl uppercase text-white leading-none"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        YOUR TRANSFORMATION
                        <br />
                        STARTS TODAY
                    </h2>

                    <p className="text-gray-400 text-lg leading-9 max-w-3xl mx-auto mt-8">
                        Every champion was once a beginner. Every strong body started with
                        one workout. Every success story began with one decision.
                        <span className="text-white font-medium">
                            {" "}The only thing standing between where you are and where you
                            want to be is the first step.
                        </span>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center justify-center my-14">
                        <div className="h-px w-20 bg-gray-700"></div>
                        <div className="w-4 h-4 rounded-full bg-orange-500 mx-5"></div>
                        <div className="h-px w-20 bg-gray-700"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-14">

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">01</h3>
                            <p className="text-white text-xl mt-4 mb-2">Commit</p>
                            <p className="text-gray-400">
                                Make the decision to invest in yourself.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">02</h3>
                            <p className="text-white text-xl mt-4 mb-2">Train</p>
                            <p className="text-gray-400">
                                Stay consistent with expert guidance and support.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-orange-500">03</h3>
                            <p className="text-white text-xl mt-4 mb-2">Become</p>
                            <p className="text-gray-400">
                                Grow into the strongest version of yourself.
                            </p>
                        </div>

                    </div>

                    <blockquote className="text-2xl md:text-3xl italic text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        "The hardest lift isn't the weight on the bar—
                        <span className="text-orange-500"> it's walking through the door for the first time.</span>"
                    </blockquote>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/pricing"
                            className="cursor-pointer px-9 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_10px_30px_rgba(249,115,22,0.35)]"
                        >
                            View Membership Plans
                        </Link>
                        <Link
                            to="/programs"
                            className="cursor-pointer px-9 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-sm transition"
                        >
                            Explore Programs
                        </Link>
                    </div>

                </div>
            </section>

        </>
    );
}