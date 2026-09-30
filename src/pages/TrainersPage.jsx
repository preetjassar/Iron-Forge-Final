import Trainers from "../components/Trainers";
import { Link } from "react-router-dom";
import { Calendar, Award, Sparkles } from "lucide-react";

export default function TrainersPage() {
  return (
    <div className="bg-black min-h-screen pt-12">
      {/* Intro Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-[3px] mb-4">
          <Award size={15} />
          <span>Certified Elite Specialists</span>
        </div>
        <h1
          className="text-5xl md:text-7xl font-black uppercase text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          World-Class Training Mentors
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
          From strength athletes and body composition coaches to mobility therapists, our certified instructors guide every rep with precision and accountability.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/booksession"
            className="px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold uppercase tracking-wider text-sm transition shadow-[0_10px_25px_rgba(249,115,22,0.3)] flex items-center gap-2"
          >
            <Calendar size={16} />
            <span>Book 1-on-1 Session</span>
          </Link>
          <Link
            to="/programs"
            className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition"
          >
            Explore Programs
          </Link>
        </div>
      </div>

      <Trainers />
    </div>
  );
}
