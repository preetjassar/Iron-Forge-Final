import programs from "../data/Program";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaLayerGroup } from "react-icons/fa";

export default function Programs({ isHomePreview = false }) {
  const navigate = useNavigate();

  const displayedPrograms = isHomePreview ? programs.slice(0, 3) : programs;

  return (
    <section className="bg-[#090909] text-white py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-orange-500 font-semibold text-xs sm:text-sm mb-3">
            {isHomePreview ? "Curated Programs" : "Training Disciplines"}
          </p>

          <h2
            className="text-5xl sm:text-6xl md:text-7xl uppercase text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Forge Your Strength
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
            Specialized training methodologies designed to help you build muscle, incinerate fat, and achieve world-class physical performance.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPrograms.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-[#111111] border border-white/10 hover:border-orange-500/50 rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Image container */}
                  <div className="overflow-hidden h-60 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-orange-400">
                      {item.level}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7">
                    {/* Icon + Duration row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                        <Icon className="text-orange-500 group-hover:text-black text-xl transition-colors duration-300" />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        <FaClock className="text-orange-500 text-xs" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold uppercase text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="px-7 pb-7 pt-0">
                  <button
                    type="button"
                    onClick={() => navigate(`/programs/${item.path}`)}
                    className="cursor-pointer w-full py-3.5 rounded-full bg-white/5 hover:bg-orange-500 text-white hover:text-black border border-white/10 hover:border-orange-500 font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>View Program Details</span>
                    <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Programs link on Home preview */}
        {isHomePreview && (
          <div className="text-center mt-12">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.2)]"
            >
              <span>Explore All 6 Programs</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}