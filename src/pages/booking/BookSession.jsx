import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { Calendar, Clock, Dumbbell, UserCheck, AlertCircle } from "lucide-react";

import { recordUserBooking } from "../../lib/userServices";

export default function BookSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const preferredTrainer = location.state?.preferredTrainer || "";
  const preferredProgram = location.state?.program?.title || "";

  const trainers = [
    "Arjun Mehta - Strength & Powerlifting",
    "Simran Kaur - Dance Cardio & HIIT",
    "Ananya Sharma - Yoga & Joint Mobility",
    "Rohit Verma - 1-on-1 Personal Trainer",
    "Mohit Gupta - CrossFit & Conditioning",
    "Rohan Malhotra - Weight Loss & Nutrition",
  ];

  const programs = [
    "Strength Training",
    "Weight Loss",
    "Cardio Fitness",
    "Yoga & Flexibility",
    "CrossFit",
    "Personal Training",
  ];

  const timings = [
    "06:00 AM",
    "07:00 AM",
    "08:30 AM",
    "10:00 AM",
    "05:00 PM",
    "06:30 PM",
    "07:30 PM",
    "08:30 PM",
  ];

  // Try to match preferred trainer name
  const defaultTrainer =
    trainers.find((t) => t.toLowerCase().includes(preferredTrainer.toLowerCase())) || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trainer: defaultTrainer,
      program: preferredProgram,
    },
  });

  const onSubmit = async (data) => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/booksession" } } });
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);

      await recordUserBooking(user, {
        bookingId,
        program: data.program,
        trainer: data.trainer,
        date: data.date,
        time: data.time,
        status: "confirmed",
      });

      navigate("/booking-success", {
        state: {
          trainer: data.trainer,
          sessionDate: data.date,
          sessionTime: data.time,
          bookingId,
        },
      });
    } catch (error) {
      console.error("Booking error:", error);
      setErrorMsg("Could not book session: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#050505] text-white min-h-screen py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer text-orange-500 hover:text-orange-400 mb-8 font-semibold text-sm transition"
        >
          ← Back
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[3px] text-orange-400 mb-2">
            <UserCheck size={16} />
            <span>Private Coaching</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black uppercase text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Book A Training Session
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Reserve your 1-on-1 coaching slot with your preferred Iron Forge instructor.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Program */}
          <div>
            <label htmlFor="program" className="block mb-2 font-semibold text-xs uppercase tracking-wider text-gray-300">
              Select Program
            </label>
            <select
              id="program"
              {...register("program", { required: "Please select a program" })}
              className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-orange-500 text-white text-sm"
            >
              <option value="" className="bg-zinc-900">Choose Program</option>
              {programs.map((program) => (
                <option key={program} value={program} className="bg-zinc-900 text-white">
                  {program}
                </option>
              ))}
            </select>
            {errors.program && (
              <p className="text-red-400 text-xs mt-1.5">{errors.program.message}</p>
            )}
          </div>

          {/* Trainer */}
          <div>
            <label htmlFor="trainer" className="block mb-2 font-semibold text-xs uppercase tracking-wider text-gray-300">
              Select Certified Coach
            </label>
            <select
              id="trainer"
              {...register("trainer", { required: "Please select a trainer" })}
              className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-orange-500 text-white text-sm"
            >
              <option value="" className="bg-zinc-900">Choose Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer} value={trainer} className="bg-zinc-900 text-white">
                  {trainer}
                </option>
              ))}
            </select>
            {errors.trainer && (
              <p className="text-red-400 text-xs mt-1.5">{errors.trainer.message}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block mb-2 font-semibold text-xs uppercase tracking-wider text-gray-300">
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("date", { required: "Please select a date" })}
                style={{ colorScheme: "dark" }}
                className="w-full bg-black/60 text-white border border-white/10 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-orange-500 text-sm"
              />
              {errors.date && (
                <p className="text-red-400 text-xs mt-1.5">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="time" className="block mb-2 font-semibold text-xs uppercase tracking-wider text-gray-300">
                Preferred Time Slot
              </label>
              <select
                id="time"
                {...register("time", { required: "Please select a time slot" })}
                className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-orange-500 text-white text-sm"
              >
                <option value="" className="bg-zinc-900">Choose Time</option>
                {timings.map((time) => (
                  <option key={time} value={time} className="bg-zinc-900 text-white">
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p className="text-red-400 text-xs mt-1.5">{errors.time.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer w-full py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.35)] disabled:opacity-60 mt-4"
          >
            {submitting ? "Booking Session..." : "Confirm & Book Session"}
          </button>
        </form>
      </div>
    </section>
  );
}
