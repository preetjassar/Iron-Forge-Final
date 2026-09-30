import BMICalculator from "../components/BMICalculator";
import BMRCalculator from "../components/BMRCalculator";

export default function Calculations() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#090909] py-28 px-6 lg:px-16">


            {/* Background Glow */}

            <div className="
                absolute
                -top-40
                -left-40
                w-[450px]
                h-[450px]
                rounded-full
                bg-orange-500/10
                blur-[160px]
            " />


            <div className="
                absolute
                bottom-0
                right-0
                w-[450px]
                h-[450px]
                rounded-full
                bg-orange-500/10
                blur-[160px]
            " />



            <div className="relative max-w-7xl mx-auto">


                {/* Heading */}

                <div className="text-center mb-20">


                    <p className="
                        uppercase
                        tracking-[5px]
                        text-orange-500
                        font-semibold
                        text-sm
                        mb-4
                    ">
                        FITNESS CALCULATORS
                    </p>



                    <h1
                        className="
                        text-6xl
                        md:text-7xl
                        uppercase
                        text-white
                        "
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif"
                        }}
                    >
                        Know Your Body
                    </h1>



                    <p className="
                        max-w-3xl
                        mx-auto
                        mt-6
                        text-gray-400
                        text-lg
                        leading-8
                    ">
                        Understand your body composition and metabolism
                        with our smart fitness calculators designed to
                        support your transformation journey.
                    </p>


                </div>





                {/* Calculator Grid */}

                <div className="
                    grid
                    lg:grid-cols-2
                    gap-10
                    items-stretch
                ">



                    {/* BMI */}

                    <div
                        className="
                        group
                        relative
                        overflow-hidden
                        rounded-[35px]
                        border
                        border-white/10
                        bg-[#111111]
                        p-6
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:border-orange-500/40
                        hover:shadow-[0_30px_70px_rgba(249,115,22,.15)]
                        "
                    >

                        <div className="
                            absolute
                            top-0
                            left-0
                            h-1
                            w-0
                            bg-orange-500
                            transition-all
                            duration-500
                            group-hover:w-full
                        "/>


                        <BMICalculator />


                    </div>





                    {/* BMR */}

                    <div
                        className="
                        group
                        relative
                        overflow-hidden
                        rounded-[35px]
                        border
                        border-white/10
                        bg-[#111111]
                        p-6
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:border-orange-500/40
                        hover:shadow-[0_30px_70px_rgba(249,115,22,.15)]
                        "
                    >


                        <div className="
                            absolute
                            top-0
                            left-0
                            h-1
                            w-0
                            bg-orange-500
                            transition-all
                            duration-500
                            group-hover:w-full
                        "/>


                        <BMRCalculator />


                    </div>



                </div>





                {/* Bottom Section */}

                <div
                    className="
                    mt-20
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-10
                    text-center
                    "
                >

                    <h2
                        className="
                        text-4xl
                        uppercase
                        text-white
                        "
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif"
                        }}
                    >
                        Train Smarter.
                        <span className="text-orange-500">
                            {" "}Progress Faster.
                        </span>
                    </h2>


                    <p className="
                        mt-5
                        text-gray-400
                        max-w-2xl
                        mx-auto
                        leading-8
                    ">
                        Knowing your BMI and BMR helps you create
                        better nutrition plans, set realistic goals,
                        and track your fitness progress effectively.
                    </p>


                </div>



            </div>


        </section>
    );
}