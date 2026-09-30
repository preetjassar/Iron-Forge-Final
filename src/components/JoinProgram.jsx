import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { recordProgramEnrollment } from "../lib/userServices";
import programs from "../data/Program";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaShieldAlt,
  FaDumbbell,
  FaCalendarAlt,
  FaClock,
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaUserTie,
  FaTag,
  FaGoogle,
} from "react-icons/fa";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function JoinProgram() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loginWithGoogle } = useAuth();

  // Find initial program from route state or default to first program
  const initialProgram = useMemo(() => {
    const passed = location.state?.program;
    if (passed) {
      const match = programs.find(
        (p) =>
          p.title.toLowerCase() === (passed.title || passed.name || "").toLowerCase()
      );
      if (match) return match;
      return {
        ...programs[0],
        ...passed,
        title: passed.title || passed.name || programs[0].title,
      };
    }
    return programs[0];
  }, [location.state]);

  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [currentStep, setCurrentStep] = useState(1); // 1: Program & Details, 2: Review & Payment, 3: Success

  // User form details
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    age: "",
    gender: "Male",
    fitnessGoal: "Muscle Gain",
  });

  // Payment form details
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: user?.displayName || "",
    expiry: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrolledResult, setEnrolledResult] = useState(null);
  const [submissionError, setSubmissionError] = useState("");

  // Sync user details if auth state updates
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || user.email?.split("@")[0] || "",
        email: user.email || prev.email,
      }));
      setPaymentData((prev) => ({
        ...prev,
        cardHolder: prev.cardHolder || user.displayName || "",
      }));
    }
  }, [user]);

  // Card brand detection
  const cardBrand = useMemo(() => {
    const clean = paymentData.cardNumber.replace(/\D/g, "");
    if (/^3[47]/.test(clean)) return "American Express";
    if (/^4/.test(clean)) return "Visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "Mastercard";
    if (/^(60|65|81|82|508)/.test(clean)) return "RuPay";
    return clean.length > 0 ? "Credit Card" : "";
  }, [paymentData.cardNumber]);

  const isAmex = cardBrand === "American Express";
  const expectedCvvLength = isAmex ? 4 : 3;

  // Handlers for user form
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handlers for payment form
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    const amexCheck = /^3[47]/.test(val);

    if (amexCheck) {
      val = val.slice(0, 15);
      const p1 = val.slice(0, 4);
      const p2 = val.slice(4, 10);
      const p3 = val.slice(10, 15);
      const formatted = [p1, p2, p3].filter(Boolean).join(" ");
      setPaymentData((prev) => ({ ...prev, cardNumber: formatted }));
    } else {
      val = val.slice(0, 16);
      const parts = val.match(/.{1,4}/g) || [];
      setPaymentData((prev) => ({ ...prev, cardNumber: parts.join(" ") }));
    }

    if (formErrors.cardNumber) {
      setFormErrors((prev) => ({ ...prev, cardNumber: "" }));
    }
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
    }
    setPaymentData((prev) => ({ ...prev, expiry: val }));
    if (formErrors.expiry) {
      setFormErrors((prev) => ({ ...prev, expiry: "" }));
    }
  };

  const handleCvvChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "");
    const maxLen = isAmex ? 4 : 3;
    const truncated = clean.slice(0, maxLen);
    setPaymentData((prev) => ({ ...prev, cvv: truncated }));
    if (formErrors.cvv) {
      setFormErrors((prev) => ({ ...prev, cvv: "" }));
    }
  };

  const handleCardHolderChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s\-'.]/g, "");
    setPaymentData((prev) => ({ ...prev, cardHolder: val }));
    if (formErrors.cardHolder) {
      setFormErrors((prev) => ({ ...prev, cardHolder: "" }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (minimum 2 characters)";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, "").slice(-10))) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation (Payment)
  const validateStep2 = () => {
    const errors = {};
    const cleanCard = paymentData.cardNumber.replace(/\D/g, "");

    if (!cleanCard) {
      errors.cardNumber = "Card number is required";
    } else if (isAmex && cleanCard.length !== 15) {
      errors.cardNumber = "American Express cards must have 15 digits";
    } else if (!isAmex && cleanCard.length !== 16) {
      errors.cardNumber = "Card number must have 16 digits";
    }

    if (!paymentData.cardHolder.trim() || paymentData.cardHolder.trim().length < 3) {
      errors.cardHolder = "Please enter the full cardholder name";
    }

    if (!paymentData.expiry) {
      errors.expiry = "Expiry date is required";
    } else {
      const parts = paymentData.expiry.split("/");
      if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
        errors.expiry = "Use MM/YY format";
      } else {
        const month = parseInt(parts[0], 10);
        const year = parseInt(`20${parts[1]}`, 10);
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (month < 1 || month > 12) {
          errors.expiry = "Invalid month (01-12)";
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
          errors.expiry = "Card has expired";
        }
      }
    }

    // CVV Validation
    if (!paymentData.cvv) {
      errors.cvv = "CVV is required";
    } else if (isAmex && paymentData.cvv.length !== 4) {
      errors.cvv = "Amex cards require a 4-digit CVV";
    } else if (!isAmex && paymentData.cvv.length !== 3) {
      errors.cvv = "CVV must be exactly 3 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!user) {
      // If user is guest, prompt to sign in or redirect
      navigate("/login", {
        state: { from: { pathname: "/joinprogram" }, program: selectedProgram },
      });
      return;
    }
    if (validateStep1()) {
      setFormErrors({});
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEnrollAndPay = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", {
        state: { from: { pathname: "/joinprogram" }, program: selectedProgram },
      });
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const paymentId = "IFG" + Math.floor(100000 + Math.random() * 900000);

      // Record program enrollment in Firestore and local storage
      const result = await recordProgramEnrollment(
        user,
        selectedProgram,
        formData,
        {
          paymentId,
          paymentMethod: `${cardBrand || "Credit Card"} (Demo)`,
        }
      );

      setEnrolledResult(result);
      setCurrentStep(3); // Success Screen!
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Enrollment error:", err);
      setSubmissionError("Could not complete enrollment: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#070707] text-white py-28 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-orange-500/10 blur-[200px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Progress Step Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= 1
                    ? "bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                1
              </div>
              <span className="ml-3 text-xs sm:text-sm font-bold uppercase tracking-wider hidden sm:inline text-white">
                Program & Details
              </span>
            </div>

            <div
              className={`w-12 sm:w-24 h-0.5 mx-3 sm:mx-6 transition-colors duration-300 ${
                currentStep >= 2 ? "bg-orange-500" : "bg-white/10"
              }`}
            />

            {/* Step 2 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= 2
                    ? "bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`ml-3 text-xs sm:text-sm font-bold uppercase tracking-wider hidden sm:inline ${
                  currentStep >= 2 ? "text-white" : "text-gray-500"
                }`}
              >
                Payment & Summary
              </span>
            </div>

            <div
              className={`w-12 sm:w-24 h-0.5 mx-3 sm:mx-6 transition-colors duration-300 ${
                currentStep === 3 ? "bg-orange-500" : "bg-white/10"
              }`}
            />

            {/* Step 3 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep === 3
                    ? "bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                <FaCheck />
              </div>
              <span
                className={`ml-3 text-xs sm:text-sm font-bold uppercase tracking-wider hidden sm:inline ${
                  currentStep === 3 ? "text-green-400" : "text-gray-500"
                }`}
              >
                Enrolled
              </span>
            </div>
          </div>
        </div>

        {/* ================= STEP 1: PROGRAM INFO & USER DETAILS ================= */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Program Showcase Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-black uppercase tracking-[2px] text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                    Selected Discipline
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    {selectedProgram.level}
                  </span>
                </div>

                {/* Program Selector Dropdown */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Switch Program
                  </label>
                  <select
                    value={selectedProgram.title}
                    onChange={(e) => {
                      const match = programs.find((p) => p.title === e.target.value);
                      if (match) setSelectedProgram(match);
                    }}
                    className="w-full bg-black/60 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.title} className="bg-zinc-900 text-white">
                        {p.title} ({p.duration} • {formatCurrency(p.price)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Program Image Preview */}
                <div className="h-48 rounded-2xl overflow-hidden relative mb-6 border border-white/10">
                  <img
                    src={selectedProgram.image}
                    alt={selectedProgram.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2
                      className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {selectedProgram.title}
                    </h2>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {selectedProgram.description}
                </p>

                {/* Spec List */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-gray-300">
                    <span className="flex items-center gap-2 text-gray-400">
                      <FaUserTie className="text-orange-500" />
                      <span>Dedicated Coach:</span>
                    </span>
                    <span className="font-semibold text-white">{selectedProgram.trainer}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-300">
                    <span className="flex items-center gap-2 text-gray-400">
                      <FaClock className="text-orange-500" />
                      <span>Program Duration:</span>
                    </span>
                    <span className="font-semibold text-white">{selectedProgram.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-300">
                    <span className="flex items-center gap-2 text-gray-400">
                      <FaCalendarAlt className="text-orange-500" />
                      <span>Schedule:</span>
                    </span>
                    <span className="font-semibold text-white text-right max-w-[200px]">
                      {selectedProgram.schedule}
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-6 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-gray-300 tracking-wider">
                    Full Program Tuition
                  </span>
                  <span className="text-2xl font-black text-orange-400">
                    {formatCurrency(selectedProgram.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: User Details Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[3px] text-orange-400 mb-2">
                    <FaUser size={14} />
                    <span>Member Registration</span>
                  </div>
                  <h1
                    className="text-3xl sm:text-4xl font-black uppercase text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Your Profile & Details
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Please provide your information for program roster registration and trainer onboarding.
                  </p>
                </div>

                {/* Not logged in prompt banner */}
                {!user && (
                  <div className="mb-6 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-orange-200">
                      <span className="font-bold">Already a member?</span> Sign in to auto-populate your verified details.
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/login", {
                          state: { from: { pathname: "/joinprogram" }, program: selectedProgram },
                        })
                      }
                      className="cursor-pointer px-4 py-2 rounded-full bg-orange-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-orange-400 transition shrink-0"
                    >
                      Sign In Now
                    </button>
                  </div>
                )}

                <form onSubmit={handleNextToPayment} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Full Name
                      </label>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                        <FaUser className="text-orange-500 mr-3 shrink-0" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="e.g. John Doe"
                          value={formData.fullName}
                          onChange={handleUserInputChange}
                          className="bg-transparent text-white outline-none w-full text-sm placeholder:text-gray-500"
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="text-red-400 text-xs mt-1.5">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Email Address {user && <span className="text-orange-400 font-normal">(Verified)</span>}
                      </label>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                        <FaEnvelope className="text-orange-500 mr-3 shrink-0" />
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleUserInputChange}
                          disabled={!!user}
                          className={`bg-transparent text-white outline-none w-full text-sm placeholder:text-gray-500 ${
                            user ? "cursor-not-allowed opacity-75" : ""
                          }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-400 text-xs mt-1.5">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Phone Number
                      </label>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                        <FaPhoneAlt className="text-orange-500 mr-3 shrink-0" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={handleUserInputChange}
                          className="bg-transparent text-white outline-none w-full text-sm placeholder:text-gray-500"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-red-400 text-xs mt-1.5">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Age (Years)
                      </label>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                        <input
                          type="number"
                          name="age"
                          min="14"
                          max="90"
                          placeholder="e.g. 24"
                          value={formData.age}
                          onChange={handleUserInputChange}
                          className="bg-transparent text-white outline-none w-full text-sm placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Fitness Goal */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Primary Fitness Goal
                    </label>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleUserInputChange}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Muscle Gain" className="bg-zinc-900">Muscle Gain & Powerbuilding</option>
                      <option value="Fat Loss" className="bg-zinc-900">Fat Loss & Athletic Conditioning</option>
                      <option value="Strength" className="bg-zinc-900">Raw Strength & Powerlifting</option>
                      <option value="Mobility" className="bg-zinc-900">Functional Mobility & Longevity</option>
                      <option value="Endurance" className="bg-zinc-900">Cardio & VO2 Max Endurance</option>
                    </select>
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Male", "Female", "Other"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, gender: g }))}
                          className={`cursor-pointer py-3 rounded-2xl border text-xs font-bold uppercase tracking-wider transition ${
                            formData.gender === g
                              ? "bg-orange-500/15 border-orange-500 text-orange-400"
                              : "bg-black/40 border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3 text-xs text-gray-400">
                    <FaShieldAlt className="text-orange-500 text-base shrink-0" />
                    <span>Your personal information is confidential and used solely for training calibration.</span>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="cursor-pointer w-full mt-4 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.35)] flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Summary & Payment</span>
                    <FaArrowRight size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SUMMARY & DEMO PAYMENT ================= */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Payment Form Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-orange-500 hover:text-orange-400 mb-6 flex items-center gap-2 transition"
                >
                  <FaArrowLeft size={12} />
                  <span>Back to Profile Details</span>
                </button>

                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[3px] text-orange-400 mb-2">
                    <FaCreditCard size={14} />
                    <span>Demo Checkout</span>
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-black uppercase text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Payment Details
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Enter test card credentials to activate your Iron Forge program enrollment.
                  </p>
                </div>

                {submissionError && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs">
                    {submissionError}
                  </div>
                )}

                <form onSubmit={handleEnrollAndPay} className="space-y-5">
                  {/* Card Number */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Card Number
                      </label>
                      {cardBrand && (
                        <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                          {cardBrand}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                      <FaCreditCard className="text-gray-500 mr-3 shrink-0" />
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder={isAmex ? "3782 822463 10005" : "4532 1234 5678 9012"}
                        value={paymentData.cardNumber}
                        onChange={handleCardNumberChange}
                        className="bg-transparent text-white outline-none w-full text-sm font-mono tracking-wider placeholder:text-gray-600"
                      />
                    </div>
                    {formErrors.cardNumber && (
                      <p className="text-red-400 text-xs mt-1.5">{formErrors.cardNumber}</p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Cardholder Name
                    </label>
                    <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                      <FaUser className="text-gray-500 mr-3 shrink-0" />
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={paymentData.cardHolder}
                        onChange={handleCardHolderChange}
                        className="bg-transparent text-white outline-none w-full text-sm placeholder:text-gray-600"
                      />
                    </div>
                    {formErrors.cardHolder && (
                      <p className="text-red-400 text-xs mt-1.5">{formErrors.cardHolder}</p>
                    )}
                  </div>

                  {/* Expiry Date & CVV */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Expiry */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Expiry Date
                      </label>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          value={paymentData.expiry}
                          onChange={handleExpiryChange}
                          className="bg-transparent text-white outline-none w-full text-sm font-mono placeholder:text-gray-600"
                        />
                      </div>
                      {formErrors.expiry && (
                        <p className="text-red-400 text-xs mt-1.5">{formErrors.expiry}</p>
                      )}
                    </div>

                    {/* CVV Input */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                          CVV / CVC
                        </label>
                        <span className="text-[10px] text-gray-500">
                          {isAmex ? "4 digits (Amex)" : "3 digits on back"}
                        </span>
                      </div>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                        <FaLock className="text-gray-500 mr-3 shrink-0" />
                        <input
                          type="password"
                          inputMode="numeric"
                          placeholder={isAmex ? "1234" : "123"}
                          maxLength={expectedCvvLength}
                          value={paymentData.cvv}
                          onChange={handleCvvChange}
                          className="bg-transparent text-white outline-none w-full text-sm font-mono tracking-widest placeholder:text-gray-600"
                        />
                      </div>
                      {formErrors.cvv && (
                        <p className="text-red-400 text-xs mt-1.5">{formErrors.cvv}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Payment Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full mt-4 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.35)] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Enrollment...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay {formatCurrency(selectedProgram.price)} & Enroll</span>
                        <FaArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <FaShieldAlt className="text-green-500" />
                    <span>Demo Mode • Card data is never stored or processed for real funds</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Booking Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-6 pb-4 border-b border-white/10">
                  Enrollment Summary
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Program:</span>
                    <span className="font-bold text-white text-right">{selectedProgram.title}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-400">
                    <span>Assigned Trainer:</span>
                    <span className="font-semibold text-white">{selectedProgram.trainer}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-400">
                    <span>Program Duration:</span>
                    <span className="font-semibold text-white">{selectedProgram.duration}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-400">
                    <span>Difficulty:</span>
                    <span className="font-semibold text-orange-400">{selectedProgram.level}</span>
                  </div>

                  <div className="flex justify-between items-start text-gray-400 pt-2 border-t border-white/5">
                    <span>Training Schedule:</span>
                    <span className="font-semibold text-white text-right max-w-[180px]">
                      {selectedProgram.schedule}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-400 pt-2 border-t border-white/5">
                    <span>Enrolling Member:</span>
                    <span className="font-semibold text-white">{formData.fullName}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-400">
                    <span>Contact Email:</span>
                    <span className="font-semibold text-white truncate max-w-[180px]">{formData.email}</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                {/* Final Total */}
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-gray-300 block">Total Amount</span>
                    <span className="text-[10px] text-gray-500">Taxes & gym amenities included</span>
                  </div>
                  <span className="text-2xl font-black text-orange-400">
                    {formatCurrency(selectedProgram.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: ENROLLED CONFIRMATION SCREEN ================= */}
        {currentStep === 3 && enrolledResult && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              {/* Background celebration glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

              {/* Big animated checkmark */}
              <div className="w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-500/40 text-green-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-bounce">
                <FaCheckCircle className="text-5xl" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
                <FaTag />
                <span>Enrollment Confirmed</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                You're Successfully Enrolled!
              </h1>

              <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
                Welcome to <span className="text-orange-400 font-bold">{selectedProgram.title}</span>. Your coach is preparing your workout itinerary.
              </p>

              {/* Enrolled Details Card */}
              <div className="my-8 bg-black/60 border border-white/10 rounded-2xl p-6 text-left space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Program:</span>
                  <span className="font-bold text-white">{selectedProgram.title}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Assigned Coach:</span>
                  <span className="font-semibold text-white">{selectedProgram.trainer}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-semibold text-white">{selectedProgram.duration}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-gray-400">Schedule:</span>
                  <span className="font-semibold text-white text-right max-w-[240px]">
                    {selectedProgram.schedule}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-gray-400">Reference ID:</span>
                  <span className="font-mono text-orange-400 font-bold">
                    {enrolledResult.referenceId}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Enrollment Status:</span>
                  <span className="font-semibold text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20 text-xs">
                    {enrolledResult.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-bold text-white">
                    {formatCurrency(enrolledResult.price)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.35)] flex items-center justify-center gap-2"
                >
                  <FaUser size={14} />
                  <span>View My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/programs")}
                  className="cursor-pointer px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-sm transition"
                >
                  Explore Programs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}