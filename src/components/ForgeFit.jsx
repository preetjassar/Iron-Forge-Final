import { useState, useEffect } from "react";
import {
  Flame,
  Zap,
  Shield,
  Heart,
  Dumbbell,
  Clock,
  Calendar,
  Sparkles,
  RotateCcw,
  Bookmark,
  Check,
  Copy,
  ChevronRight,
  Info,
  Trash2,
  Share2,
} from "lucide-react";
import {
  GOALS,
  EXPERIENCES,
  TRAINING_DAYS,
  EQUIPMENTS,
  DURATIONS,
  generateWorkoutPlan,
} from "../data/ForgeFitData";

const STORAGE_KEY = "iron_forge_saved_workouts";

export default function ForgeFit() {
  const [goal, setGoal] = useState("muscle_gain");
  const [experience, setExperience] = useState("intermediate");
  const [days, setDays] = useState("4");
  const [equipment, setEquipment] = useState("full_gym");
  const [duration, setDuration] = useState("45");

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Load saved plans from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedPlans(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load saved plans:", err);
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateWorkoutPlan({
        goal,
        experience,
        days,
        equipment,
        duration,
      });
      setGeneratedPlan(plan);
      setActiveDayIndex(0);
      setIsGenerating(false);

      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById("plan-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 400);
  };

  const handleReset = () => {
    setGoal("muscle_gain");
    setExperience("intermediate");
    setDays("4");
    setEquipment("full_gym");
    setDuration("45");
    setGeneratedPlan(null);
  };

  const handleSaveToStorage = () => {
    if (!generatedPlan) return;
    try {
      const updated = [generatedPlan, ...savedPlans.filter((p) => p.id !== generatedPlan.id)].slice(0, 10);
      setSavedPlans(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save plan:", err);
    }
  };

  const handleDeleteSaved = (planId) => {
    try {
      const updated = savedPlans.filter((p) => p.id !== planId);
      setSavedPlans(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to delete saved plan:", err);
    }
  };

  const handleCopyPlan = () => {
    if (!generatedPlan) return;
    let text = `🏋️ IRON FORGE GYM - FORGEFIT WORKOUT PLAN\n`;
    text += `Goal: ${generatedPlan.meta.goalTitle} | Level: ${generatedPlan.meta.experienceLevel}\n`;
    text += `Split: ${generatedPlan.meta.split} | Equipment: ${generatedPlan.params.equipment} | Duration: ${generatedPlan.params.duration}\n\n`;

    generatedPlan.days.forEach((d) => {
      text += `📅 ${d.day}: ${d.title}\n`;
      if (d.isRest) {
        text += `   - Rest & Recovery\n`;
      } else {
        d.exercises.forEach((ex, i) => {
          text += `   ${i + 1}. ${ex.name} - ${ex.sets} × ${ex.reps} (Rest: ${ex.rest})\n`;
        });
      }
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const getGoalIcon = (iconName) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-5 h-5 text-orange-500" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-red-500" />;
      default:
        return <Heart className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section className="relative min-h-screen bg-[#050505] text-white py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-[3px] mb-4">
            <Sparkles size={16} />
            <span>Interactive Workout Engine</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Forge<span className="text-orange-500">Fit</span> Generator
          </h1>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Generate an intelligent, personalized workout split tailored to your exact goal, equipment, schedule, and experience level in seconds.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-12">
          {/* STEP 1: GOAL */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-orange-400 uppercase mb-4">
              <span>Step 1</span>
              <span className="text-gray-600">•</span>
              <span className="text-white">Select Your Fitness Goal</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GOALS.map((g) => {
                const isSelected = goal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id)}
                    className={`cursor-pointer text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? "bg-orange-500/10 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.2)]"
                        : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        {getGoalIcon(g.icon)}
                      </div>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1">{g.label}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: EXPERIENCE & DURATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-orange-400 uppercase mb-4">
                <span>Step 2</span>
                <span className="text-gray-600">•</span>
                <span className="text-white">Experience Level</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {EXPERIENCES.map((exp) => {
                  const isSelected = experience === exp.id;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setExperience(exp.id)}
                      className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500 text-orange-400 font-bold shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                          : "bg-black/40 border-white/10 text-gray-300 hover:border-white/20"
                      }`}
                    >
                      <div className="text-sm font-bold">{exp.label}</div>
                      <div className="text-[11px] text-gray-400 mt-1">{exp.levelBadge}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-orange-400 uppercase mb-4">
                <span>Step 3</span>
                <span className="text-gray-600">•</span>
                <span className="text-white">Session Duration</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {DURATIONS.map((dur) => {
                  const isSelected = duration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setDuration(dur.id)}
                      className={`cursor-pointer p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500 text-orange-400 font-bold shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                          : "bg-black/40 border-white/10 text-gray-300 hover:border-white/20"
                      }`}
                    >
                      <Clock size={16} className="mb-1 text-gray-400" />
                      <div className="text-sm font-bold">{dur.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{dur.exerciseCount} exercises</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 4 & 5: DAYS & EQUIPMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Training Days */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-orange-400 uppercase mb-4">
                <span>Step 4</span>
                <span className="text-gray-600">•</span>
                <span className="text-white">Training Days Per Week</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TRAINING_DAYS.map((d) => {
                  const isSelected = days === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDays(d.id)}
                      className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? "bg-orange-500 text-black font-extrabold border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                          : "bg-black/40 border-white/10 text-gray-300 hover:border-white/20"
                      }`}
                    >
                      <div className="text-lg font-black">{d.id}</div>
                      <div className="text-[11px] uppercase tracking-wider opacity-80">Days</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-orange-400 uppercase mb-4">
                <span>Step 5</span>
                <span className="text-gray-600">•</span>
                <span className="text-white">Available Equipment</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {EQUIPMENTS.map((eq) => {
                  const isSelected = equipment === eq.id;
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => setEquipment(eq.id)}
                      className={`cursor-pointer p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                          : "bg-black/40 border-white/10 text-gray-300 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Dumbbell size={16} />
                        <span className="font-bold text-sm text-white">{eq.label}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{eq.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:flex-1 cursor-pointer py-4 px-8 rounded-full bg-orange-500 text-black font-extrabold text-base tracking-wider uppercase hover:bg-orange-400 transition-all duration-300 shadow-[0_10px_35px_rgba(249,115,22,0.35)] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Sparkles size={18} />
              <span>{isGenerating ? "Synthesizing Plan..." : "Generate Personalized Workout"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto cursor-pointer py-4 px-6 rounded-full border border-white/15 bg-white/5 text-gray-300 font-semibold hover:bg-white/10 hover:text-white transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* RESULTS SECTION */}
        {generatedPlan && (
          <div id="plan-results" className="mt-16 space-y-8 animate-fadeIn">
            {/* Plan Header Bar */}
            <div className="bg-gradient-to-r from-zinc-900 via-[#141414] to-zinc-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-2xl">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                    {generatedPlan.meta.split}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium">
                    {generatedPlan.params.equipment}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium">
                    {generatedPlan.params.duration}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
                  Your Custom {generatedPlan.meta.goalTitle} Plan
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Generated for {generatedPlan.meta.experienceLevel} level • {generatedPlan.params.days} routine
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveToStorage}
                  className="cursor-pointer px-5 py-3 rounded-full bg-white/10 hover:bg-orange-500 hover:text-black text-white text-sm font-semibold border border-white/15 transition-all flex items-center gap-2"
                >
                  {saveSuccess ? <Check size={16} className="text-green-400" /> : <Bookmark size={16} />}
                  <span>{saveSuccess ? "Saved to Storage" : "Save Workout"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyPlan}
                  className="cursor-pointer px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/15 transition-all flex items-center gap-2"
                >
                  {copySuccess ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  <span>{copySuccess ? "Copied!" : "Copy Text"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="cursor-pointer px-5 py-3 rounded-full bg-orange-500 text-black text-sm font-bold hover:bg-orange-400 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Day Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {generatedPlan.days.map((day, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                  <button
                    key={day.day}
                    type="button"
                    onClick={() => setActiveDayIndex(idx)}
                    className={`cursor-pointer px-6 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 border flex items-center gap-2 ${
                      isActive
                        ? "bg-orange-500 text-black border-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                        : "bg-zinc-900 text-gray-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    <span>{day.day}</span>
                    {day.isRest ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-gray-300">Rest</span>
                    ) : (
                      <span className={`text-[10px] px-2 py-0.5 rounded-md ${isActive ? "bg-black/20 text-black" : "bg-orange-500/20 text-orange-400"}`}>
                        {day.exercises?.length} Moves
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Day Detail Card */}
            {(() => {
              const currentDay = generatedPlan.days[activeDayIndex] || generatedPlan.days[0];
              if (!currentDay) return null;

              if (currentDay.isRest) {
                return (
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-4">
                      <Heart size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{currentDay.day}: {currentDay.title}</h3>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed mb-6">
                      {currentDay.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                      <Info size={14} />
                      <span>Muscle tissue grows and repairs during rest, not in the gym!</span>
                    </div>
                  </div>
                );
              }

              return (
                <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest">{currentDay.day} Focus</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">{currentDay.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                        <Clock size={13} className="text-orange-500" />
                        <span>Est. {generatedPlan.params.duration}</span>
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                        <Dumbbell size={13} className="text-orange-500" />
                        <span>{currentDay.exercises.length} Exercises</span>
                      </span>
                    </div>
                  </div>

                  {/* Exercise Cards List */}
                  <div className="space-y-4">
                    {currentDay.exercises.map((exercise, exIndex) => (
                      <div
                        key={exIndex}
                        className="group bg-black/40 hover:bg-black/70 border border-white/10 hover:border-orange-500/40 rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold flex items-center justify-center shrink-0 text-sm">
                            {exIndex + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-orange-400">
                                {exercise.category}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                              {exercise.name}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                              <Info size={12} className="text-orange-500/70" />
                              <span>{exercise.tip}</span>
                            </p>
                          </div>
                        </div>

                        {/* Sets / Reps / Rest Metrics */}
                        <div className="flex items-center gap-4 bg-[#181818] px-4 py-3 rounded-xl border border-white/5 shrink-0 self-start md:self-center">
                          <div className="text-center px-2">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Sets</p>
                            <p className="text-sm font-black text-white">{exercise.sets.split(" ")[0]}</p>
                          </div>
                          <div className="w-px h-6 bg-white/10" />
                          <div className="text-center px-2">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Reps</p>
                            <p className="text-sm font-black text-orange-400">{exercise.reps.split(" ")[0]}</p>
                          </div>
                          <div className="w-px h-6 bg-white/10" />
                          <div className="text-center px-2">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Rest</p>
                            <p className="text-sm font-semibold text-gray-300">{exercise.rest}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Saved Workouts Drawer / Panel */}
            {savedPlans.length > 0 && (
              <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 mt-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Bookmark className="text-orange-500" size={18} />
                      <span>Saved Workouts in Browser</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Stored in LocalStorage on this device</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    {savedPlans.length} Saved
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedPlans.map((item) => (
                    <div
                      key={item.id}
                      className="bg-black/50 border border-white/10 hover:border-orange-500/40 rounded-2xl p-4 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                          <span>{item.createdAt}</span>
                          <span className="text-orange-400 font-medium">{item.params.days}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">{item.meta.goalTitle}</h4>
                        <p className="text-xs text-gray-400">{item.meta.split} • {item.params.equipment}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            setGeneratedPlan(item);
                            setActiveDayIndex(0);
                            document.getElementById("plan-results")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="cursor-pointer text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                        >
                          <span>Load Plan</span>
                          <ChevronRight size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSaved(item.id)}
                          className="cursor-pointer text-gray-500 hover:text-red-400 transition p-1"
                          title="Delete saved plan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
