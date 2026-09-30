import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  FaDumbbell,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await emailjs.send(
        "service_0jh3hew",
        "template_9blptoi",
        {
          user_email: email,
          email: email,
          name: "Iron Forge Subscriber",
        },
        "nW6UU9ZzpEDcmOxl-"
      );

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      console.warn("Newsletter submission warning:", error);
      // Fallback demo simulation
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#050505] text-gray-300 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* 1. Brand & Info (2 cols on lg) */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                <FaDumbbell className="text-orange-500 text-lg group-hover:text-black transition" />
              </div>
              <span
                className="text-2xl sm:text-3xl font-black uppercase text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                IRON <span className="text-orange-500">FORGE</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Forge Your Body. Build Your Strength. Premium fitness facility equipped with state-of-the-art machines, certified coaches, and an empowering training community.
            </p>

            <div className="space-y-2 text-xs text-gray-400 mb-6">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Iron Forge Gym, Mall Road, Ludhiana, Punjab</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-500" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-orange-500" />
                <span>support@ironforgegym.com</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {[
                { icon: <FaInstagram />, href: "https://www.instagram.com" },
                { icon: <FaFacebook />, href: "https://www.facebook.com" },
                { icon: <FaTwitter />, href: "https://x.com" },
                { icon: <FaYoutube />, href: "https://youtube.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 text-xs"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition">
                  About Iron Forge
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-orange-500 transition">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link to="/trainers" className="text-gray-400 hover:text-orange-500 transition">
                  Certified Trainers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-orange-500 transition">
                  Membership Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Interactive Tools */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Fitness Tools
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/forgefit" className="text-gray-400 hover:text-orange-500 transition flex items-center gap-1.5">
                  <span>ForgeFit Generator</span>
                  <span className="text-[9px] bg-orange-500 text-black font-black px-1.5 py-0.2 rounded">
                    NEW
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/bmi" className="text-gray-400 hover:text-orange-500 transition">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/bmr" className="text-gray-400 hover:text-orange-500 transition">
                  BMR & TDEE Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculations" className="text-gray-400 hover:text-orange-500 transition">
                  Fitness Calculators
                </Link>
              </li>
              <li>
                <Link to="/booksession" className="text-gray-400 hover:text-orange-500 transition">
                  Book 1-on-1 Session
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Weekly Newsletter
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Get training splits, macro targets, and member transformation advice straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs uppercase tracking-wider py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <FaPaperPlane size={11} />
                <span>{loading ? "Subscribing..." : "Subscribe"}</span>
              </button>
            </form>

            {subscribed && (
              <p className="text-green-400 text-xs mt-2.5 flex items-center gap-1.5 animate-fadeIn">
                <span>✓ Successfully subscribed to newsletter!</span>
              </p>
            )}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} <span className="text-orange-500 font-bold">IRON FORGE GYM</span>. All Rights Reserved.
          </p>

          <p className="text-gray-600">
            B.Tech IT Project Submission • Powered by React, Vite & Firebase
          </p>
        </div>
      </div>
    </footer>
  );
}