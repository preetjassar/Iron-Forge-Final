import HeroImage from "../assets/Hero.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaAward,
    FaUsers,
    FaDumbbell,
    FaHeart
} from "react-icons/fa";


const Hero = () => {

    const navigate = useNavigate();

    const [startCounter, setStartCounter] = useState(false);


    useEffect(() => {

        const handleScroll = () => {

            const section = document.getElementById("numbers-section");

            if (
                section &&
                section.getBoundingClientRect().top < window.innerHeight - 100
            ) {
                setStartCounter(true);
            }

        };


        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };


    }, []);



    const Counter = ({ number }) => {

        const [count, setCount] = useState(0);


        useEffect(() => {

            if (!startCounter) return;


            const timer = setInterval(() => {

                setCount((prev) => {

                    if (prev >= number) {

                        clearInterval(timer);
                        return number;

                    }


                    return prev + Math.ceil(number / 60);

                });


            }, 30);



            return () => clearInterval(timer);



        }, [startCounter, number]);



        return <>{count}+</>;

    };



    return (

        <>

            {/* ================= HERO SECTION ================= */}


            <section className="bg-[#090909] text-white py-24 px-6 lg:px-16">


                <div className="
                    max-w-7xl
                    mx-auto
                    grid
                    lg:grid-cols-2
                    gap-20
                    items-center
                ">


                    {/* LEFT CONTENT */}


                    <div>


                        <p className="
                            uppercase
                            tracking-[5px]
                            text-orange-500
                            font-semibold
                            mb-5
                        ">
                            Iron Forge Gym
                        </p>



                        <h1
                            className="
                            text-6xl
                            lg:text-8xl
                            uppercase
                            leading-[0.9]
                            "
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif"
                            }}
                        >

                            Forge
                            <br />

                            Strength.
                            <br />

                            Build
                            <br />

                            Greatness.

                        </h1>



                        <p className="
                            text-gray-400
                            text-lg
                            leading-8
                            mt-8
                            max-w-xl
                        ">
                            Push beyond your limits with elite coaching,
                            premium equipment, and a community committed
                            to helping you become your strongest self.
                        </p>



                        <div className="
                            flex
                            flex-wrap
                            gap-5
                            mt-10
                        ">


                            <button

                                onClick={() => navigate("/joinprogram")}

                                className="
                                bg-orange-500
                                text-black
                                px-9
                                py-4
                                rounded-full
                                font-semibold
                                hover:bg-orange-600
                                transition
                                duration-300
                                cursor-pointer
                                "

                            >

                                Join Now

                            </button>




                            <button

                                onClick={() => navigate("/programs")}

                                className="
                                border
                                border-orange-500
                                text-orange-500
                                px-9
                                py-4
                                rounded-full
                                font-semibold
                                hover:bg-orange-500
                                hover:text-black
                                transition
                                duration-300
                                cursor-pointer
                                "

                            >

                                Explore Programs

                            </button>



                        </div>


                    </div>
                    {/* RIGHT IMAGE SECTION */}

                    <div className="relative flex justify-center items-center">


                        {/* Ambient Glow */}

                        <div
                            className="
                            absolute
                            w-[500px]
                            h-[500px]
                            rounded-full
                            bg-orange-500/20
                            blur-[140px]
                            "
                        />


                        {/* Outer Circle */}

                        <div
                            className="
                            absolute
                            w-[480px]
                            h-[480px]
                            rounded-full
                            border
                            border-orange-500/10
                            "
                        />



                        <div className="group relative">



                            {/* Rotating Border */}

                            <div
                                className="
                                absolute
                                inset-0
                                rounded-[38px]
                                border
                                border-orange-500/20
                                rotate-3
                                transition-all
                                duration-700
                                group-hover:rotate-6
                                "
                            />



                            {/* Second Border */}

                            <div
                                className="
                                absolute
                                inset-0
                                rounded-[38px]
                                border
                                border-white/10
                                -rotate-2
                                transition-all
                                duration-700
                                group-hover:-rotate-4
                                "
                            />



                            {/* Image Wrapper */}

                            <div
                                className="
                                relative
                                overflow-hidden
                                rounded-[34px]
                                border
                                border-white/10
                                shadow-[0_40px_80px_rgba(0,0,0,.65)]
                                transition-all
                                duration-700
                                group-hover:shadow-[0_40px_90px_rgba(249,115,22,.25)]
                                "
                            >

                                <img
                                    src={HeroImage}
                                    alt="Iron Forge Gym"
                                    className="
                                    w-[430px]
                                    h-[580px]
                                    object-cover
                                    brightness-95
                                    contrast-110
                                    saturate-110
                                    transition-all
                                    duration-700
                                    group-hover:scale-105
                                    "
                                />


                                <div
                                    className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/80
                                    via-black/20
                                    to-transparent
                                    "
                                />

                            </div>




                            {/* Premium Badge */}


                            <div
                                className="
    float-animation
    [animation-delay:0.2s]
    absolute
    top-6
    left-6
    backdrop-blur-xl
    bg-white/10
    border
    border-white/20
    rounded-2xl
    px-5
    py-3
    shadow-xl
    "
                            >

                                <p className="
                                    uppercase
                                    tracking-[3px]
                                    text-orange-400
                                    text-xs
                                ">
                                    Premium Gym
                                </p>


                                <h3 className="
                                    font-bold
                                    text-xl
                                    text-white
                                ">
                                    Elite Coaching
                                </h3>


                            </div>




                            {/* Experience Card */}


                            <div
                                className="
    float-animation
    absolute
    left-6
    bottom-6
                                backdrop-blur-xl
                                bg-black/60
                                border
                                border-white/10
                                rounded-2xl
                                px-6
                                py-4
                                shadow-2xl
                                "
                            >

                                <h2 className="
                                    text-4xl
                                    font-black
                                    text-orange-500
                                ">
                                    10+
                                </h2>


                                <p className="
                                    text-gray-300
                                    text-sm
                                ">
                                    Years Experience
                                </p>


                            </div>





                            {/* Members Card */}


                            <div
                                className="
    float-animation
    absolute
    -right-8
    bottom-28
                                bg-orange-500
                                text-black
                                rounded-2xl
                                px-6
                                py-4
                                shadow-[0_20px_50px_rgba(249,115,22,.45)]
                                transition-all
                                duration-500
                                group-hover:-translate-y-2
                                "
                            >

                                <h2 className="
                                    text-4xl
                                    font-black
                                ">
                                    3500+
                                </h2>


                                <p className="
                                    uppercase
                                    tracking-wider
                                    text-sm
                                    font-bold
                                ">
                                    Members
                                </p>


                            </div>





                            {/* Trainer Card */}


                            <div
                                className="
    float-animation
    absolute
    -left-8
    top-1/2
                                -translate-y-1/2
                                backdrop-blur-xl
                                bg-white/10
                                border
                                border-white/20
                                rounded-2xl
                                px-5
                                py-4
                                shadow-xl
                                "
                            >

                                <h3 className="
                                    text-3xl
                                    font-bold
                                    text-orange-500
                                ">
                                    25+
                                </h3>


                                <p className="
                                    text-gray-300
                                    text-sm
                                ">
                                    Certified Trainers
                                </p>


                            </div>




                            {/* Dots Decoration */}


                            <div
                                className="
                                absolute
                                -right-14
                                top-10
                                grid
                                grid-cols-5
                                gap-2
                                opacity-30
                                "
                            >

                                {[...Array(25)].map((_, i) => (

                                    <div
                                        key={i}
                                        className="
                                        w-2
                                        h-2
                                        rounded-full
                                        bg-orange-500
                                        "
                                    />

                                ))}

                            </div>


                        </div>


                    </div>



                </div>


            </section>
            {/* ================= IRON ASCENT IN NUMBERS ================= */}

            <section
                id="numbers-section"
                className="bg-black py-28 px-6 lg:px-16"
            >

                <div className="max-w-7xl mx-auto">


                    {/* Heading */}

                    <div className="text-center mb-20">


                        <p className="
                            uppercase
                            tracking-[5px]
                            text-orange-500
                            font-semibold
                            mb-4
                        ">
                            Our Journey
                        </p>



                        <h2
                            className="
                            text-5xl
                            uppercase
                            text-white
                            "
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif"
                            }}
                        >
                            Iron Forge In Numbers
                        </h2>



                        <p className="
                            text-gray-400
                            mt-6
                            max-w-2xl
                            mx-auto
                            leading-8
                        ">
                            Every number represents years of dedication,
                            thousands of transformations, and a community
                            built on strength, discipline, and consistency.
                        </p>


                    </div>





                    {/* Cards */}


                    <div className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-8
                    ">


                        {[
                            {
                                icon: <FaAward />,
                                number: 10,
                                title: "Years Experience",
                            },

                            {
                                icon: <FaUsers />,
                                number: 3500,
                                title: "Happy Members",
                            },

                            {
                                icon: <FaDumbbell />,
                                number: 25,
                                title: "Certified Trainers",
                            },

                            {
                                icon: <FaHeart />,
                                number: 50,
                                title: "Premium Machines",
                            },

                        ].map((item, index) => (


                            <div
                                key={index}
                                className="
                                group
                                relative
                                overflow-hidden
                                bg-[#111111]
                                border
                                border-gray-800
                                rounded-3xl
                                p-10
                                text-center
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-orange-500
                                "
                            >



                                {/* Decorative Circle */}

                                <div
                                    className="
                                    absolute
                                    -top-14
                                    -right-14
                                    w-32
                                    h-32
                                    rounded-full
                                    border
                                    border-orange-500/10
                                    transition-transform
                                    duration-700
                                    group-hover:rotate-12
                                    "
                                />




                                {/* Icon */}


                                <div
                                    className="
                                    relative
                                    z-10
                                    w-16
                                    h-16
                                    mx-auto
                                    mb-6
                                    rounded-2xl
                                    bg-orange-500/10
                                    flex
                                    items-center
                                    justify-center
                                    "
                                >

                                    <div
                                        className="
                                        text-orange-500
                                        text-3xl
                                        transition-all
                                        duration-500
                                        group-hover:scale-110
                                        group-hover:-rotate-12
                                        "
                                    >

                                        {item.icon}

                                    </div>


                                </div>





                                {/* Number */}


                                <h3
                                    className="
                                    text-6xl
                                    font-bold
                                    text-orange-500
                                    leading-none
                                    transition
                                    duration-300
                                    group-hover:scale-105
                                    "
                                >

                                    <Counter number={item.number} />

                                </h3>





                                <div
                                    className="
                                    w-10
                                    h-[2px]
                                    bg-orange-500/40
                                    mx-auto
                                    my-4
                                    "
                                />





                                {/* Title */}


                                <p
                                    className="
                                    text-gray-400
                                    uppercase
                                    tracking-wider
                                    text-sm
                                    transition-colors
                                    duration-300
                                    group-hover:text-white
                                    "
                                >

                                    {item.title}

                                </p>


                            </div>


                        ))}



                    </div>


                </div>


            </section>

        </>

    );

};

export default Hero;