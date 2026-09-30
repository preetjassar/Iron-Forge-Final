import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { RotateCcw, Flame, Activity, Zap } from "lucide-react";

export const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Sedentary (desk job, little to no exercise)", multiplier: 1.2 },
  { id: "light", label: "Lightly Active (training 1–3 days/week)", multiplier: 1.375 },
  { id: "moderate", label: "Moderately Active (training 3–5 days/week)", multiplier: 1.55 },
  { id: "active", label: "Very Active (intense training 6–7 days/week)", multiplier: 1.725 },
  { id: "extra_active", label: "Athlete / Physical Job (heavy physical labor)", multiplier: 1.9 },
];

export default function BMRCalculator() {
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [calorieTargets, setCalorieTargets] = useState(null);
  const [history, setHistory] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      gender: "male",
      activity: "moderate",
    },
  });

  const loadBMRHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const q = query(
        collection(db, "users", user.uid, "bmrHistory"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setHistory(records.slice(0, 5));
    } catch (err) {
      console.warn("Could not load BMR history:", err.message);
    }
  };

  useEffect(() => {
    loadBMRHistory();
  }, []);

  const onSubmit = async (data) => {
    const age = Number(data.age);
    const height = Number(data.height);
    const weight = Number(data.weight);
    const gender = data.gender;
    const activityConfig = ACTIVITY_LEVELS.find((a) => a.id === data.activity) || ACTIVITY_LEVELS[2];

    // Mifflin-St Jeor Equation
    let bmrResult;
    if (gender === "male") {
      bmrResult = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrResult = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const finalBMR = Math.round(bmrResult);
    const finalTDEE = Math.round(bmrResult * activityConfig.multiplier);

    setBmr(finalBMR);
    setTdee(finalTDEE);
    setCalorieTargets({
      maintenance: finalTDEE,
      fatLoss: finalTDEE - 400,
      muscleGain: finalTDEE + 350,
    });

    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, "users", user.uid, "bmrHistory"), {
          bmr: finalBMR,
          tdee: finalTDEE,
          age,
          height,
          weight,
          gender,
          activity: activityConfig.id,
          createdAt: serverTimestamp(),
        });
        await loadBMRHistory();
      } catch (err) {
        console.warn("Could not save BMR to Firestore:", err.message);
      }
    }
  };

  const handleReset = () => {
    reset({ gender: "male", activity: "moderate" });
    setBmr(null);
    setTdee(null);
    setCalorieTargets(null);
  };

  return (
    <div className="relative z-10 w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <p className="uppercase tracking-[4px] text-orange-500 font-semibold text-xs mb-2">
          Metabolic Rate
        </p>
        <h2
          className="text-4xl uppercase text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          BMR & Calorie Calculator
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Calculate your Basal Metabolic Rate & Total Daily Calorie Requirement.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer flex items-center justify-center p-3 rounded-2xl border border-white/10 bg-black/40 hover:border-orange-500/50 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-500/10 transition text-sm font-semibold">
              <input
                type="radio"
                value="male"
                {...register("gender")}
                className="hidden"
              />
              <span>Male</span>
            </label>
            <label className="cursor-pointer flex items-center justify-center p-3 rounded-2xl border border-white/10 bg-black/40 hover:border-orange-500/50 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-500/10 transition text-sm font-semibold">
              <input
                type="radio"
                value="female"
                {...register("gender")}
                className="hidden"
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Age (years)
          </label>
          <input
            type="number"
            placeholder="e.g. 24"
            {...register("age", {
              required: "Age is required",
              min: { value: 12, message: "Minimum age is 12" },
              max: { value: 100, message: "Maximum age is 100" },
            })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition text-sm"
          />
          {errors.age && (
            <p className="text-red-400 text-xs mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Height and Weight in 2 cols */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="e.g. 175"
              {...register("height", {
                required: "Height is required",
                min: { value: 50, message: "Min 50 cm" },
                max: { value: 260, message: "Max 260 cm" },
              })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition text-sm"
            />
            {errors.height && (
              <p className="text-red-400 text-xs mt-1">{errors.height.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Weight (kg)
            </label>
            <input
              type="number"
              placeholder="e.g. 70"
              {...register("weight", {
                required: "Weight is required",
                min: { value: 20, message: "Min 20 kg" },
                max: { value: 300, message: "Max 300 kg" },
              })}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition text-sm"
            />
            {errors.weight && (
              <p className="text-red-400 text-xs mt-1">{errors.weight.message}</p>
            )}
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Activity Level
          </label>
          <select
            {...register("activity", { required: true })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition text-sm"
          >
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.id} value={a.id} className="bg-zinc-900 text-white">
                {a.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 cursor-pointer py-3.5 px-6 rounded-full bg-orange-500 text-black font-bold uppercase tracking-wider text-sm hover:bg-orange-400 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
          >
            Calculate BMR & TDEE
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer py-3.5 px-5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
            title="Reset Inputs"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </form>

      {/* Results View */}
      {bmr !== null && tdee !== null && calorieTargets && (
        <div className="mt-8 rounded-2xl bg-black/60 border border-orange-500/30 p-6 animate-fadeIn">
          <div className="grid grid-cols-2 gap-4 pb-5 border-b border-white/10 text-center">
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Basal BMR</span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {bmr} <span className="text-xs font-normal text-gray-400">kcal</span>
              </div>
              <span className="text-[10px] text-gray-500">Burned at complete rest</span>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400">Daily TDEE</span>
              <div className="text-2xl sm:text-3xl font-black text-orange-400 mt-1">
                {tdee} <span className="text-xs font-normal text-orange-300">kcal</span>
              </div>
              <span className="text-[10px] text-gray-400">Estimated daily burn</span>
            </div>
          </div>

          {/* Goal breakdown */}
          <div className="mt-5 space-y-2.5">
            <p className="text-xs uppercase font-bold tracking-wider text-gray-300 flex items-center gap-1.5 mb-2">
              <Flame size={14} className="text-orange-500" />
              <span>Calorie Intake Recommendations</span>
            </p>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
              <span className="text-gray-300 font-medium">Maintain Current Weight</span>
              <span className="text-white font-bold">{calorieTargets.maintenance} kcal / day</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-xs">
              <span className="text-green-300 font-medium">Fat Loss (~0.5 kg/week)</span>
              <span className="text-green-400 font-bold">{calorieTargets.fatLoss} kcal / day</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs">
              <span className="text-orange-300 font-medium">Clean Muscle Surplus</span>
              <span className="text-orange-400 font-bold">{calorieTargets.muscleGain} kcal / day</span>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 flex items-center gap-1.5">
            <Activity size={14} className="text-orange-500" />
            <span>Recent Saves</span>
          </p>
          <div className="space-y-2">
            {history.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/5 text-xs text-gray-300"
              >
                <span>BMR: {item.bmr} kcal • TDEE: {item.tdee || Math.round(item.bmr * 1.55)} kcal</span>
                <span className="text-orange-400 font-semibold uppercase">{item.gender}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}