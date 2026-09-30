import BMICalculator from "../../components/BMICalculator";
import { Link } from "react-router-dom";

export default function BMIPage() {
  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/calculations"
            className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition"
          >
            ← All Calculators
          </Link>
          <Link
            to="/bmr"
            className="text-xs uppercase tracking-wider text-gray-400 hover:text-white px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
            Switch to BMR Calculator →
          </Link>
        </div>

        <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <BMICalculator />
        </div>
      </div>
    </section>
  );
}
