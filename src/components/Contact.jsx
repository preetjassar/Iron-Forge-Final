import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, "contactMessages"), {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        createdAt: serverTimestamp(),
      });

      // 2. Attempt EmailJS if credentials are valid, ignore silent network error if demo
      try {
        await emailjs.send(
          "service_0jh3hew",
          "template_uj18sfj",
          {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            message: data.message,
          },
          "nW6UU9ZzpEDcmOxl-"
        );
      } catch (e) {
        console.warn("EmailJS notification skipped:", e.message);
      }

      setSuccessMessage(
        "Thank you for contacting Iron Forge Gym! We have received your message and an advisor will contact you within 24 hours."
      );
      reset();
    } catch (error) {
      console.error("Firestore contact error:", error);
      setErrorMessage("Could not send your message. Please verify your connection or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#050505] text-white py-28 px-4 sm:px-6 lg:px-12">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-orange-500/10 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-orange-500 font-semibold text-xs sm:text-sm mb-3">
            Get In Touch
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl uppercase text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Connect With Iron Forge
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Have questions about memberships, private coaching, or want to schedule a facility tour? Our advisory team is here to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-7 hover:border-orange-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-4">
                <FaPhoneAlt size={18} />
              </div>
              <p className="text-xs uppercase tracking-[3px] text-orange-400 font-bold">Call Us</p>
              <h3 className="text-xl font-bold text-white mt-1">+91 98765 43210</h3>
              <p className="text-gray-400 text-xs mt-1">Direct line for member inquiries & tours</p>
            </div>

            {/* Email */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-7 hover:border-orange-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-4">
                <FaEnvelope size={18} />
              </div>
              <p className="text-xs uppercase tracking-[3px] text-orange-400 font-bold">Email Us</p>
              <h3 className="text-xl font-bold text-white mt-1">support@ironforgegym.com</h3>
              <p className="text-gray-400 text-xs mt-1">Response guaranteed within 24 hours</p>
            </div>

            {/* Address */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-7 hover:border-orange-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-4">
                <FaMapMarkerAlt size={18} />
              </div>
              <p className="text-xs uppercase tracking-[3px] text-orange-400 font-bold">Facility Location</p>
              <h3 className="text-xl font-bold text-white mt-1">Iron Forge HQ, Ludhiana</h3>
              <p className="text-gray-400 text-xs mt-1">Mall Road, Punjab, India (Free Member Parking)</p>
            </div>

            {/* Operating Hours */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-7 hover:border-orange-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-4">
                <FaClock size={18} />
              </div>
              <p className="text-xs uppercase tracking-[3px] text-orange-400 font-bold">Operating Hours</p>
              <h3 className="text-lg font-bold text-white mt-1">Mon – Fri: 5:00 AM – 11:00 PM</h3>
              <p className="text-gray-400 text-xs mt-1">Sat – Sun: 6:00 AM – 9:00 PM</p>
            </div>
          </div>

          {/* RIGHT: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="mb-8 pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-[3px] text-orange-400 font-bold">Send Message</span>
              <h2 className="text-3xl font-black uppercase text-white mt-1">Start The Conversation</h2>
              <p className="text-gray-400 text-xs mt-1">Fill out the fields below and an instructor will reply promptly.</p>
            </div>

            {/* Success message */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs leading-relaxed flex items-center gap-3 animate-fadeIn">
                <FaCheckCircle size={18} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs leading-relaxed flex items-center gap-3 animate-fadeIn">
                <FaExclamationCircle size={18} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email & Phone in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\- ]{8,16}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Message / Transformation Goals
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your fitness targets or any questions you have..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Please enter at least 10 characters" },
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.35)] flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <FaPaperPlane size={14} />
                <span>{loading ? "Sending Message..." : "Submit Inquiry"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}