import whyChoose from "../data/Whychooseus";

const WhyChoose = () => {
    return (
        <section className="bg-[#090909] text-white py-28 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-16">

                    <p className="text-orange-500 uppercase tracking-[5px] font-semibold mb-4">
                        Why Choose Us
                    </p>

                    <h2
                        className="text-5xl uppercase"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Built For Champions
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
                        More than just a gym—Iron Forge is where discipline,
                        community, and world-class training come together to help
                        you become your strongest self.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {whyChoose.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden bg-[#111111] border border-gray-800 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500"
                            >

                                {/* Decorative Circle */}
                                <div className="absolute -top-14 -right-14 w-32 h-32 rounded-full border border-orange-500/10 transition-transform duration-700 group-hover:rotate-12"></div>

                                {/* Icon */}
                                <div className="relative z-10 w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">

                                    <Icon
                                        className="text-orange-500 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"
                                    />

                                </div>

                                {/* Title */}
                                <h3 className="relative z-10 text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-orange-400">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="relative z-10 text-gray-400 leading-7">
                                    {item.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
};

export default WhyChoose;