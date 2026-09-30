import trainersId from "../data/Trainers";
import { Link, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaArrowRight,
  FaCalendarCheck,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaInstagram />, link: "https://www.instagram.com" },
  { icon: <FaTwitter />, link: "https://x.com" },
  { icon: <FaFacebookF />, link: "https://www.facebook.com" },
  { icon: <FaYoutube />, link: "https://youtube.com" },
];

export default function Trainers({ isHomePreview = false }) {
  const navigate = useNavigate();

  const displayedTrainers = isHomePreview ? trainersId.slice(0, 3) : trainersId;

  const handleBookTrainer = (trainerName) => {
    navigate("/booksession", {
      state: {
        preferredTrainer: trainerName,
      },
    });
  };

  return (
    <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[6px] text-orange-500 text-xs sm:text-sm font-semibold">
            {isHomePreview ? "Elite Faculty" : "Expert Fitness Mentors"}
          </span>

          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white mt-3 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Meet Our Trainers
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
            Every Iron Forge coach holds gold-standard international certifications and a track record of transformational member results.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#111111] transition duration-500 hover:-translate-y-3 hover:border-orange-500/50 hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-[380px] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4 bg-orange-500 text-black px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                    {trainer.experience}
                  </div>
                </div>

                {/* Content details */}
                <div className="p-7 pt-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {trainer.name}
                  </h3>

                  <p className="text-orange-400 mt-1 font-semibold tracking-wide uppercase text-xs">
                    {trainer.skills}
                  </p>

                  <div className="w-12 h-1 bg-orange-500 rounded-full my-4 group-hover:w-20 transition-all duration-300" />

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {trainer.description}
                  </p>

                  {/* Social Handles */}
                  <div className="flex gap-2.5 mb-6">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 text-xs"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card CTA Button */}
              <div className="px-7 pb-7 pt-0">
                <button
                  type="button"
                  onClick={() => handleBookTrainer(trainer.name)}
                  className="cursor-pointer w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(249,115,22,0.25)]"
                >
                  <FaCalendarCheck size={13} />
                  <span>Book Session with {trainer.name.split(" ")[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All on Home Preview */}
        {isHomePreview && (
          <div className="text-center mt-12">
            <Link
              to="/trainers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.2)]"
            >
              <span>Meet All 6 Certified Coaches</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}