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
import { RotateCcw, Activity, Info, Check } from "lucide-react";

export function getBMICategory(bmi) {
  if (bmi < 18.5) return { name: "Underweight", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", barPct: 15 };
  if (bmi < 25) return { name: "Normal (Healthy)", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", barPct: 45 };
  if (bmi < 30) return { name: "Overweight", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", barPct: 75 };
  return { name: "Obese", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", barPct: 95 };
}

export default function BMICalculator() {
  const [bmi, setBmi] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [healthyRange, setHealthyRange] = useState(null);
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const loadBMIHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const q = query(
        collection(db, "users", user.uid, "bmiHistory"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setHistory(records.slice(0, 5));
    } catch (err) {
      console.warn("Could not load BMI history:", err.message);
    }
  };

  useEffect(() => {
    loadBMIHistory();
  }, []);

  const onSubmit = async (data) => {
    const heightM = Number(data.height) / 100;
    const weightKg = Number(data.weight);
    const result = weightKg / (heightM * heightM);
    const finalBMI = parseFloat(result.toFixed(1));

    const cat = getBMICategory(finalBMI);
    setBmi(finalBMI);
    setCategoryInfo(cat);

    // Calculate healthy weight range for this height
    const minHealthyWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxHealthyWeight = (24.9 * heightM * heightM).toFixed(1);
    setHealthyRange(`${minHealthyWeight} kg – ${maxHealthyWeight} kg`);

    // Save to Firestore if user is authenticated
    const user = auth.currentUser;
    if (user) {
      try {
        setSaving(true);
        await addDoc(collection(db, "users", user.uid, "bmiHistory"), {
          bmi: finalBMI,
          weight: weightKg,
          height: Number(data.height),
          category: cat.name,
          createdAt: serverTimestamp(),
        });
        await loadBMIHistory();
      } catch (err) {
        console.warn("Could not save BMI to Firestore:", err.message);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleReset = () => {
    reset();
    setBmi(null);
    setCategoryInfo(null);
    setHealthyRange(null);
  };

  return (
    <div className="relative z-10 w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <p className="uppercase tracking-[4px] text-orange-500 font-semibold text-xs mb-2">
          Body Composition
        </p>
        <h2
          className="text-4xl uppercase text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          BMI Calculator
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Calculate your Body Mass Index and identify your healthy weight range.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
            Height (in cm)
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g. 175"
            {...register("height", {
              required: "Height is required",
              min: { value: 50, message: "Height must be at least 50 cm" },
              max: { value: 260, message: "Height must be under 260 cm" },
            })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
          />
          {errors.height && (
            <p className="text-red-400 text-xs mt-1.5">{errors.height.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
            Weight (in kg)
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g. 72"
            {...register("weight", {
              required: "Weight is required",
              min: { value: 20, message: "Weight must be at least 20 kg" },
              max: { value: 300, message: "Weight must be under 300 kg" },
            })}
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
          />
          {errors.weight && (
            <p className="text-red-400 text-xs mt-1.5">{errors.weight.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 cursor-pointer py-3.5 px-6 rounded-full bg-orange-500 text-black font-bold uppercase tracking-wider text-sm hover:bg-orange-400 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
          >
            Calculate BMI
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

      {/* Visual Result Card */}
      {bmi !== null && categoryInfo && (
        <div className="mt-8 rounded-2xl bg-black/60 border border-orange-500/30 p-6 animate-fadeIn">
          <div className="text-center mb-5">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Your BMI Score</span>
            <div className="text-6xl font-black text-white mt-1">{bmi}</div>
            <div
              className={`inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${categoryInfo.bg} ${categoryInfo.color} ${categoryInfo.border} border`}
            >
              {categoryInfo.name}
            </div>
          </div>

          {/* Visual Scale Bar */}
          <div className="space-y-1.5 mb-5">
            <div className="flex justify-between text-[10px] text-gray-500 font-medium">
              <span>Under (&lt;18.5)</span>
              <span>Normal (18.5-24.9)</span>
              <span>Over (25-29.9)</span>
              <span>Obese (30+)</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 grid grid-cols-4 opacity-70">
                <div className="bg-blue-500" />
                <div className="bg-green-500" />
                <div className="bg-yellow-500" />
                <div className="bg-red-500" />
              </div>
              <div
                className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_10px_white] -translate-x-1/2 transition-all duration-500"
                style={{ left: `${Math.min(Math.max(categoryInfo.barPct, 5), 95)}%` }}
              />
            </div>
          </div>

          {/* Healthy Range Box */}
          {healthyRange && (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Info size={14} className="text-orange-400" />
                <span>Ideal Weight for Your Height:</span>
              </span>
              <span className="text-orange-400 font-bold">{healthyRange}</span>
            </div>
          )}
        </div>
      )}

      {/* History if available */}
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
                <span>BMI {item.bmi} ({item.weight}kg, {item.height}cm)</span>
                <span className="text-orange-400 font-semibold">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}