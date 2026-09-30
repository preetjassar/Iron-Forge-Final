import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { fetchUserFullProfile } from "../../lib/userServices";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  Target,
  Edit2,
  Check,
  Dumbbell,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  CalendarCheck,
  Tag,
  AlertCircle,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    fitnessGoal: "Muscle Gain",
    plan: "Standard Member",
  });

  const [joinedPrograms, setJoinedPrograms] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Load user profile and all activity (programs + bookings)
  const loadUserData = useCallback(async () => {
    if (!user?.uid) return;
    try {
      setLoading(true);
      setErrorMessage("");

      const result = await fetchUserFullProfile(user);
      if (result) {
        setFormData(result.profile);
        setJoinedPrograms(result.joinedPrograms || []);
        setBookings(result.bookings || []);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      setErrorMessage("Could not load latest profile data: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;

    try {
      setSaving(true);
      setErrorMessage("");

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          name: formData.name,
          phone: formData.phone,
          age: formData.age ? Number(formData.age) : "",
          fitnessGoal: formData.fitnessGoal,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage("Failed to save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-sm font-medium tracking-wide">
            Loading your Iron Forge profile & memberships...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-28 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/10 blur-[190px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-orange-400 mb-2">
              <ShieldCheck size={16} />
              <span>Verified Iron Forge Account</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Member Profile
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              View your enrolled training programs, private coach bookings, and member details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadUserData}
              title="Refresh profile data"
              className="cursor-pointer p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            >
              <RefreshCw size={15} />
            </button>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
              >
                <Edit2 size={14} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer px-5 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs uppercase tracking-wider transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Feedback alerts */}
        {saveSuccess && (
          <div className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2 animate-fadeIn">
            <Check size={18} />
            <span>Profile information successfully updated in Firestore!</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2 animate-fadeIn">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT COLUMN: Overview & Shortcuts (4 cols) ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Identity Card */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden shadow-xl">
              {/* Avatar */}
              <div className="relative mx-auto w-24 h-24 mb-4">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={formData.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-orange-500/50 shadow-xl shadow-orange-500/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 text-black font-black text-3xl flex items-center justify-center shadow-xl shadow-orange-500/20 uppercase">
                    {formData.name?.charAt(0) || user?.email?.charAt(0) || "M"}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-[#111111] flex items-center justify-center" title="Active Member">
                  <Check size={12} className="text-black stroke-[3]" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
              <p className="text-gray-400 text-xs mt-0.5 truncate">{formData.email}</p>

              <div className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>{formData.plan || "Standard Access"}</span>
              </div>

              <div className="h-px bg-white/10 my-6" />

              <div className="space-y-3.5 text-left text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-orange-500 shrink-0" />
                  <span className="truncate">{formData.phone || "No phone added yet"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={15} className="text-orange-500 shrink-0" />
                  <span>Age: {formData.age ? `${formData.age} years` : "Not specified"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target size={15} className="text-orange-500 shrink-0" />
                  <span>Target: {formData.fitnessGoal}</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl">
              <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                Quick Shortcuts
              </p>

              <Link
                to="/joinprogram"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-orange-500/30 transition text-sm text-gray-300 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Dumbbell size={16} className="text-orange-500" />
                  <span>Join New Program</span>
                </div>
                <ArrowRight size={14} className="text-gray-500" />
              </Link>

              <Link
                to="/booksession"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-orange-500/30 transition text-sm text-gray-300 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-orange-500" />
                  <span>Book Private Session</span>
                </div>
                <ArrowRight size={14} className="text-gray-500" />
              </Link>

              <Link
                to="/forgefit"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-orange-500/30 transition text-sm text-gray-300 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-orange-500" />
                  <span>ForgeFit Workout Engine</span>
                </div>
                <ArrowRight size={14} className="text-gray-500" />
              </Link>

              <Link
                to="/calculations"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-orange-500/30 transition text-sm text-gray-300 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Target size={16} className="text-orange-500" />
                  <span>BMI & BMR Health Calculators</span>
                </div>
                <ArrowRight size={14} className="text-gray-500" />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Details, My Programs & Bookings (8 cols) ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. PERSONAL INFORMATION CARD */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  {isEditing ? "Edit Personal Details" : "Personal Information"}
                </h3>
                <span className="text-xs text-gray-500">
                  {isEditing ? "Changes persist to Firestore" : "Synchronized"}
                </span>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-orange-500 text-sm transition"
                      required
                    />
                  </div>

                  {/* Email (Readonly Auth) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Email Address (Auth ID)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-black/30 border border-white/5 rounded-2xl px-5 py-3.5 text-gray-500 cursor-not-allowed text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-orange-500 text-sm transition"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="e.g. 24"
                      value={formData.age}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-orange-500 text-sm transition"
                    />
                  </div>
                </div>

                {/* Fitness Goal */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Primary Fitness Goal
                  </label>
                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-orange-500 text-sm transition cursor-pointer"
                  >
                    <option value="Muscle Gain" className="bg-zinc-900 text-white">Muscle Gain & Hypertrophy</option>
                    <option value="Fat Loss" className="bg-zinc-900 text-white">Fat Loss & Conditioning</option>
                    <option value="Strength" className="bg-zinc-900 text-white">Powerlifting & Raw Strength</option>
                    <option value="General Fitness" className="bg-zinc-900 text-white">General Wellness & Longevity</option>
                    <option value="Mobility" className="bg-zinc-900 text-white">Mobility & Athletic Joint Recovery</option>
                  </select>
                </div>

                {isEditing && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-[0_4px_25px_rgba(249,115,22,0.3)] disabled:opacity-60 flex items-center gap-2"
                    >
                      {saving ? "Saving to Firestore..." : "Save Profile Details"}
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* 2. MY PROGRAMS SECTION */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Dumbbell size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                      My Joined Programs
                    </h3>
                    <p className="text-gray-400 text-xs">
                      Active courses and discipline memberships
                    </p>
                  </div>
                </div>

                <Link
                  to="/programs"
                  className="text-xs uppercase font-bold text-orange-400 hover:text-orange-300 transition flex items-center gap-1"
                >
                  <span>Explore More</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {joinedPrograms.length === 0 ? (
                /* EMPTY STATE FOR MY PROGRAMS */
                <div className="rounded-3xl border border-white/5 bg-black/40 p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-4">
                    <Dumbbell size={28} />
                  </div>
                  <h4
                    className="text-2xl font-bold uppercase text-white tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Your journey starts here.
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-md mx-auto leading-relaxed">
                    You haven't joined any training programs yet. Explore our world-class disciplines to begin building raw strength and endurance.
                  </p>
                  <Link
                    to="/programs"
                    className="cursor-pointer inline-flex items-center gap-2 mt-6 px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                /* PROGRAM CARDS LIST */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {joinedPrograms.map((prog, index) => (
                    <div
                      key={prog.id || index}
                      className="group relative rounded-2xl border border-white/10 hover:border-orange-500/40 bg-black/50 p-5 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="text-lg font-bold uppercase text-white group-hover:text-orange-400 transition-colors">
                            {prog.programName}
                          </h4>
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 shrink-0">
                            {prog.status || "Active"}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs text-gray-300 mb-4">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Trainer:</span>
                            <span className="text-white font-medium">{prog.trainer}</span>
                          </div>

                          <div className="flex items-center justify-between text-gray-400">
                            <span>Duration:</span>
                            <span className="text-white font-medium">{prog.duration}</span>
                          </div>

                          {prog.schedule && (
                            <div className="flex items-start justify-between text-gray-400 pt-1 border-t border-white/5">
                              <span>Schedule:</span>
                              <span className="text-white text-right font-medium max-w-[170px] truncate">
                                {prog.schedule}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-gray-400 pt-1 border-t border-white/5">
                            <span>Enrolled On:</span>
                            <span className="text-gray-300">{prog.formattedDate || "Active"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-orange-400 font-semibold">
                          ID: {prog.referenceId || prog.id}
                        </span>

                        <span className="text-xs font-bold text-white">
                          {prog.price ? `₹${prog.price}` : "Paid"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. MY BOOKINGS SECTION */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                    <CalendarCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                      My 1-on-1 Bookings
                    </h3>
                    <p className="text-gray-400 text-xs">
                      Private coach sessions & appointments
                    </p>
                  </div>
                </div>

                <Link
                  to="/booksession"
                  className="text-xs uppercase font-bold text-orange-400 hover:text-orange-300 transition flex items-center gap-1"
                >
                  <span>Book Session</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {bookings.length === 0 ? (
                /* EMPTY STATE FOR BOOKINGS */
                <div className="rounded-3xl border border-white/5 bg-black/40 p-8 sm:p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-3">
                    <Calendar size={24} />
                  </div>
                  <h4 className="text-lg font-bold uppercase text-white">
                    No Private Sessions Scheduled
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                    Reserve 1-on-1 private coaching slots with certified instructors for personalized form analysis.
                  </p>
                  <Link
                    to="/booksession"
                    className="cursor-pointer inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full bg-white/5 hover:bg-orange-500 hover:text-black text-white border border-white/15 hover:border-orange-500 font-bold uppercase tracking-wider text-xs transition-all duration-300"
                  >
                    <span>Schedule A Session</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                /* BOOKINGS LIST */
                <div className="space-y-3">
                  {bookings.map((booking, idx) => (
                    <div
                      key={booking.id || idx}
                      className="rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-500/30 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm sm:text-base">
                            {booking.trainer}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400">
                            {booking.status || "Confirmed"}
                          </span>
                        </div>
                        <p className="text-xs text-orange-400 font-medium">
                          {booking.program || "Personal Coaching"}
                        </p>
                      </div>

                      <div className="flex sm:flex-col sm:items-end justify-between text-xs text-gray-300 gap-1">
                        <div className="flex items-center gap-1.5 text-white font-semibold">
                          <Calendar size={13} className="text-orange-500" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Clock size={13} className="text-orange-500" />
                          <span>{booking.time}</span>
                        </div>
                        <span className="text-[11px] font-mono text-gray-500 mt-0.5">
                          Ref: {booking.bookingId || booking.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
