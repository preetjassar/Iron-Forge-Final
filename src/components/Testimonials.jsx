import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../data/Testimonials";

export default function Testimonials() {
  return (
    <section className="bg-[#080808] text-white py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-orange-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-orange-500 font-semibold text-xs sm:text-sm mb-3">
            Real Transformations
          </p>

          <h2
            className="text-5xl sm:text-6xl uppercase text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            What Our Members Say
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Real stories from members who dedicated themselves to the Iron Forge lifestyle and transformed their physique, confidence, and discipline.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#111111] border border-white/10 hover:border-orange-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <FaQuoteLeft className="text-orange-500/40 group-hover:text-orange-500 text-xl transition-colors" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xs ${
                          i < item.rating ? "text-orange-500" : "text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>
              </div>

              {/* Member Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/40 group-hover:border-orange-500 transition-colors"
                />
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider block">
                    Iron Forge Member
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
