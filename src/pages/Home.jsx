import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhychooseUs";
import Programs from "../components/Programs";
import Trainers from "../components/Trainers";
import BMICalculator from "../components/BMICalculator";
import Testimonials from "../components/Testimonials";
import { FaArrowRight, FaDumbbell, FaCalculator, FaCheckCircle, FaFire } from "react-icons/fa";
import { PRICING_PLANS } from "../data/Pricing";

export default function Home() {

  return (
    <div className="bg-[#050505] text-white overflow-hidden">
      {/* 1 & 2. HERO SECTION + GYM STATISTICS */}
      <Hero />

      {/* 3. WHY CHOOSE IRON FORGE */}
      <WhyChoose />

      {/* 4. PROGRAMS PREVIEW */}
      <Programs isHomePreview={true} />

      {/* 5. TRAINERS PREVIEW */}
      <Trainers isHomePreview={true} />

      {/* 6. BMI CALCULATOR PREVIEW SECTION */}
      <section className="bg-[#080808] py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/10 blur-[160px] pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Explainer */}
          <div className="lg:col-span-6 space-y-6">
            <span className="uppercase tracking-[5px] text-orange-500 font-semibold text-xs sm:text-sm">
              Instant Assessment
            </span>

            <h2
              className="text-5xl sm:text-6xl uppercase text-white leading-[0.95]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Know Your Body. <br />
              <span className="text-orange-500">Track Your Baseline.</span>
            </h2>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              Every transformation begins with honest data. Calculate your Body Mass Index (BMI) in seconds to establish your baseline health category and discover your ideal weight target.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaCheckCircle className="text-orange-500 shrink-0" />
                <span>Instant categorization (Underweight, Normal, Overweight, Obese)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaCheckCircle className="text-orange-500 shrink-0" />
                <span>Calculates your personalized healthy weight range in kilograms</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaCheckCircle className="text-orange-500 shrink-0" />
                <span>Securely saves to your profile history when logged in</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/calculations"
                className="px-7 py-3.5 rounded-full border border-orange-500/60 hover:bg-orange-500 hover:text-black text-orange-400 font-bold uppercase tracking-wider text-xs transition flex items-center gap-2"
              >
                <FaCalculator />
                <span>Explore BMR & TDEE Calculator</span>
              </Link>
            </div>
          </div>

          {/* Right Embedded Interactive BMI Calculator */}
          <div className="lg:col-span-6 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <BMICalculator />
          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP / PRICING PREVIEW */}
      <section className="bg-[#050505] py-24 px-4 sm:px-6 lg:px-12 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[5px] text-orange-500 font-semibold text-xs sm:text-sm">
              Transparent Membership
            </span>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl uppercase text-white mt-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Plans For Every Fitness Goal
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
              Choose the package that fits your lifestyle. Zero contract locks, complimentary initial assessment, and unlimited facility access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 transition duration-300 flex flex-col justify-between ${
                  plan.popular
                    ? "bg-[#141414] border-2 border-orange-500 shadow-[0_15px_50px_rgba(249,115,22,0.2)] md:-translate-y-2"
                    : "bg-[#0f0f0f] border border-white/10 hover:border-orange-500/40"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold uppercase text-white">{plan.name}</h3>
                      <p className="text-xs text-gray-400">{plan.subtitle}</p>
                    </div>
                    {plan.popular && (
                      <span className="bg-orange-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="my-6">
                    <span className="text-5xl font-black text-orange-500">₹{plan.priceMonthly}</span>
                    <span className="text-xs text-gray-400 ml-1">/ month</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-gray-300">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FaCheckCircle className="text-orange-500 text-xs shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/pricing"
                  className={`w-full py-3.5 rounded-full text-center text-xs font-extrabold uppercase tracking-wider transition ${
                    plan.popular
                      ? "bg-orange-500 text-black hover:bg-orange-400"
                      : "border border-white/20 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition"
            >
              <span>Use Live Membership Cost Calculator</span>
              <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <Testimonials />

      {/* 9. STRONG CTA SECTION */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-12 bg-gradient-to-t from-black via-[#0c0c0c] to-[#080808] border-t border-white/10 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/15 blur-[200px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl mx-auto z-10">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-6 text-orange-500 text-2xl shadow-xl">
            <FaDumbbell />
          </div>

          <span className="uppercase tracking-[5px] text-orange-500 font-semibold text-xs sm:text-sm">
            Begin Your Journey Today
          </span>

          <h2
            className="text-5xl sm:text-6xl md:text-8xl font-black uppercase text-white mt-4 leading-[0.95]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Forge Your Body. <br />
            <span className="text-orange-500">Build Your Strength.</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Stop waiting for the right moment. The weights are loaded, our certified coaches are ready, and your future self is waiting.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="px-10 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_10px_35px_rgba(249,115,22,0.4)] hover:scale-105 flex items-center gap-2"
            >
              <span>Join Iron Forge Now</span>
              <FaArrowRight size={14} />
            </Link>

            <Link
              to="/forgefit"
              className="px-8 py-4 rounded-full border border-orange-500/50 hover:border-orange-500 bg-white/5 hover:bg-white/10 text-orange-400 font-bold uppercase tracking-wider text-sm transition flex items-center gap-2"
            >
              <FaFire />
              <span>Generate Free Workout Plan</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}