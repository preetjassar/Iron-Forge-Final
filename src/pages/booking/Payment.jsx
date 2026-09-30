import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, Lock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { recordProgramEnrollment } from "../../lib/userServices";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);

const PROGRAM_CATALOG = [
    {
        title: "Strength Training",
        description: "Build lean muscle, improve posture, and increase strength with expert coaching.",
        duration: "12 Weeks",
        trainer: "Arjun Mehta",
        price: 12999,
        schedule: "Mon - Fri, 6:00 AM - 10:00 AM & 5:00 PM - 9:00 PM",
    },
    {
        title: "Weight Loss",
        description: "Burn fat and transform your body with structured nutrition and fitness guidance.",
        duration: "8 Weeks",
        trainer: "Rohan Malhotra",
        price: 9999,
        schedule: "Mon, Wed, Fri, 7:00 AM - 9:00 AM & 6:00 PM - 8:00 PM",
    },
    {
        title: "Cardio Fitness",
        description: "Boost endurance, stamina, and heart health through focused cardio sessions.",
        duration: "6 Weeks",
        trainer: "Simran Kaur",
        price: 8999,
        schedule: "Tue, Thu, Sat, 6:30 AM - 8:30 AM & 5:30 PM - 7:30 PM",
    },
    {
        title: "Yoga & Flexibility",
        description: "Improve mobility, flexibility, and balance through mindful movement and recovery.",
        duration: "10 Weeks",
        trainer: "Ananya Sharma",
        price: 7999,
        schedule: "Mon - Fri, 6:00 AM - 8:00 AM & 6:00 PM - 7:30 PM",
    },
    {
        title: "CrossFit",
        description: "Train hard with high-energy functional workouts designed for real strength gains.",
        duration: "8 Weeks",
        trainer: "Mohit Gupta",
        price: 10999,
        schedule: "Mon - Sat, 6:00 AM - 9:00 AM & 5:00 PM - 8:30 PM",
    },
    {
        title: "Personal Training",
        description: "Get personalized coaching, accountability, and a plan tailored to your goals.",
        duration: "Custom Plan",
        trainer: "Rohit Verma",
        price: 14999,
        schedule: "Flexible 1-on-1 Scheduling (Mon - Sun)",
    },
];

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState("");

    // Form inputs state
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState(user?.displayName || "");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const selectedProgram = useMemo(() => {
        const incoming = location.state?.program;

        if (incoming) {
            const normalizedTitle = (incoming.title || incoming.name || "").toLowerCase();
            const match = PROGRAM_CATALOG.find((program) => program.title.toLowerCase() === normalizedTitle);

            if (match) {
                return {
                    ...match,
                    title: incoming.title || incoming.name || match.title,
                    description: incoming.description || match.description,
                    duration: incoming.duration || match.duration,
                    trainer: incoming.trainer || match.trainer,
                    price: Number(incoming.price ?? match.price),
                    schedule: incoming.schedule || match.schedule,
                };
            }

            return {
                ...PROGRAM_CATALOG[0],
                title: incoming.title || incoming.name || PROGRAM_CATALOG[0].title,
                description: incoming.description || PROGRAM_CATALOG[0].description,
                duration: incoming.duration || PROGRAM_CATALOG[0].duration,
                trainer: incoming.trainer || PROGRAM_CATALOG[0].trainer,
                price: Number(incoming.price ?? PROGRAM_CATALOG[0].price),
                schedule: incoming.schedule || PROGRAM_CATALOG[0].schedule,
            };
        }

        const fallback = location.state?.name;
        if (fallback) {
            const match = PROGRAM_CATALOG.find((program) => program.title.toLowerCase() === fallback.toLowerCase());
            if (match) return match;
        }

        return PROGRAM_CATALOG[0];
    }, [location.state]);

    // Detect card brand
    const cardBrand = useMemo(() => {
        const clean = cardNumber.replace(/\D/g, "");
        if (/^3[47]/.test(clean)) return "American Express";
        if (/^4/.test(clean)) return "Visa";
        if (/^(5[1-5]|2[2-7])/.test(clean)) return "Mastercard";
        if (/^(60|65|81|82|508)/.test(clean)) return "RuPay";
        return clean.length > 0 ? "Credit Card" : "";
    }, [cardNumber]);

    const isAmex = cardBrand === "American Express";
    const expectedCvvLength = isAmex ? 4 : 3;

    // Handle Card Number formatting
    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        const amexCheck = /^3[47]/.test(val);

        if (amexCheck) {
            val = val.slice(0, 15);
            // 4-6-5 format
            const p1 = val.slice(0, 4);
            const p2 = val.slice(4, 10);
            const p3 = val.slice(10, 15);
            const formatted = [p1, p2, p3].filter(Boolean).join(" ");
            setCardNumber(formatted);
        } else {
            val = val.slice(0, 16);
            // 4-4-4-4 format
            const parts = val.match(/.{1,4}/g) || [];
            setCardNumber(parts.join(" "));
        }

        if (fieldErrors.cardNumber) {
            setFieldErrors((prev) => ({ ...prev, cardNumber: "" }));
        }
    };

    // Handle Cardholder Name
    const handleCardHolderChange = (e) => {
        const val = e.target.value.replace(/[^a-zA-Z\s\-'.]/g, "");
        setCardHolder(val);
        if (fieldErrors.cardHolder) {
            setFieldErrors((prev) => ({ ...prev, cardHolder: "" }));
        }
    };

    // Handle Expiry Date formatting (MM/YY)
    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (val.length >= 2) {
            val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
        }
        setExpiry(val);
        if (fieldErrors.expiry) {
            setFieldErrors((prev) => ({ ...prev, expiry: "" }));
        }
    };

    // Handle CVV input (Numeric only, strictly 3 or 4 digits)
    const handleCvvChange = (e) => {
        const cleanDigits = e.target.value.replace(/\D/g, "");
        const maxLen = isAmex ? 4 : 3;
        const truncated = cleanDigits.slice(0, maxLen);
        setCvv(truncated);

        if (fieldErrors.cvv) {
            setFieldErrors((prev) => ({ ...prev, cvv: "" }));
        }
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        const cleanCard = cardNumber.replace(/\D/g, "");

        if (!cleanCard) {
            errors.cardNumber = "Card number is required";
        } else if (isAmex && cleanCard.length !== 15) {
            errors.cardNumber = "American Express cards must have 15 digits";
        } else if (!isAmex && cleanCard.length !== 16) {
            errors.cardNumber = "Card number must have 16 digits";
        }

        if (!cardHolder.trim()) {
            errors.cardHolder = "Card holder name is required";
        } else if (cardHolder.trim().length < 3) {
            errors.cardHolder = "Please enter full cardholder name";
        }

        if (!expiry) {
            errors.expiry = "Expiry date is required";
        } else {
            const parts = expiry.split("/");
            if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
                errors.expiry = "Enter expiry as MM/YY";
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
        if (!cvv) {
            errors.cvv = "CVV is required";
        } else if (isAmex && cvv.length !== 4) {
            errors.cvv = "Amex cards require a 4-digit CVV";
        } else if (!isAmex && cvv.length !== 3) {
            errors.cvv = "CVV must be exactly 3 digits";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate("/login", { state: { from: { pathname: "/payment" } } });
            return;
        }

        if (!validateForm()) {
            return;
        }

        setProcessing(true);
        setPaymentError("");

        try {
            const paymentId = "IFG" + Math.floor(100000 + Math.random() * 900000);

            // Record program enrollment in Firestore and localStorage
            await recordProgramEnrollment(
                user,
                selectedProgram,
                {
                    fullName: cardHolder.trim(),
                    phone: user.phoneNumber || "",
                },
                {
                    paymentId,
                    paymentMethod: `${cardBrand || "Credit Card"} (Demo)`,
                }
            );

            // Navigate to success screen
            navigate("/payment-success", {
                state: {
                    programName: selectedProgram.title,
                    amount: selectedProgram.price,
                    paymentId,
                    paymentMethod: `${cardBrand || "Credit Card"} (Demo)`,
                    trainer: selectedProgram.trainer,
                    duration: selectedProgram.duration,
                    schedule: selectedProgram.schedule,
                },
            });
        } catch (error) {
            console.error("Payment submission error:", error);
            setPaymentError("Payment could not be recorded: " + error.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_36%),linear-gradient(135deg,_#050505_0%,_#111111_100%)] px-4 sm:px-6 py-28 text-white relative overflow-hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row relative z-10">
                {/* Form Card (Left) */}
                <div className="flex-1 rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="rounded-full bg-orange-500/15 p-3 text-orange-500">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-orange-400 font-bold">Secure checkout</p>
                            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                Complete Program Enrollment
                            </h1>
                        </div>
                    </div>

                    <div className="mb-8 flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">
                        <Sparkles size={18} className="shrink-0 text-orange-400" />
                        <span>Instant access to your selected Iron Forge program and trainer upon confirmation.</span>
                    </div>

                    {paymentError && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs animate-fadeIn">
                            {paymentError}
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        {/* Card Number */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                                    Card Number
                                </label>
                                {cardBrand && (
                                    <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                                        {cardBrand}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center rounded-2xl border border-gray-700 bg-[#171717] px-4 py-3.5 focus-within:border-orange-500 transition">
                                <CreditCard className="mr-3 text-gray-400 shrink-0" size={18} />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="cc-number"
                                    placeholder={isAmex ? "3782 822463 10005" : "4532 1234 5678 9012"}
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="w-full bg-transparent text-white outline-none placeholder:text-gray-500 text-sm font-mono tracking-wide"
                                />
                            </div>
                            {fieldErrors.cardNumber && (
                                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.cardNumber}</p>
                            )}
                        </div>

                        {/* Cardholder Name */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300">
                                Cardholder Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. John Doe"
                                value={cardHolder}
                                onChange={handleCardHolderChange}
                                className="w-full rounded-2xl border border-gray-700 bg-[#171717] px-4 py-3.5 text-white outline-none placeholder:text-gray-500 focus:border-orange-500 text-sm transition"
                            />
                            {fieldErrors.cardHolder && (
                                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.cardHolder}</p>
                            )}
                        </div>

                        {/* Expiry Date & CVV */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Expiry Date */}
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={handleExpiryChange}
                                    className="w-full rounded-2xl border border-gray-700 bg-[#171717] px-4 py-3.5 text-white outline-none placeholder:text-gray-500 focus:border-orange-500 text-sm font-mono transition"
                                />
                                {fieldErrors.expiry && (
                                    <p className="mt-1.5 text-xs text-red-400">{fieldErrors.expiry}</p>
                                )}
                            </div>

                            {/* CVV Field */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                                        CVV / CVC
                                    </label>
                                    <span className="text-[10px] text-gray-400">
                                        {isAmex ? "4 digits (Amex)" : "3 digits on back"}
                                    </span>
                                </div>
                                <div className="flex items-center rounded-2xl border border-gray-700 bg-[#171717] px-4 py-3.5 focus-within:border-orange-500 transition">
                                    <Lock className="mr-3 text-gray-400 shrink-0" size={18} />
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        placeholder={isAmex ? "1234" : "123"}
                                        maxLength={expectedCvvLength}
                                        value={cvv}
                                        onChange={handleCvvChange}
                                        className="w-full bg-transparent text-white outline-none placeholder:text-gray-500 text-sm font-mono tracking-widest"
                                    />
                                </div>
                                {fieldErrors.cvv && (
                                    <p className="mt-1.5 text-xs text-red-400">{fieldErrors.cvv}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-extrabold uppercase tracking-wider text-black transition duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 shadow-[0_4px_25px_rgba(249,115,22,0.35)] text-sm mt-4"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    <span>Processing Payment...</span>
                                </>
                            ) : (
                                <>
                                    <span>Confirm & Pay {formatCurrency(selectedProgram.price)}</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span>256-bit Encrypted Demo Checkout • No Actual Charges</span>
                    </div>
                </div>

                {/* Program Summary (Right) */}
                <div className="h-fit w-full rounded-[28px] border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl shadow-black/30 lg:w-80">
                    <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-white">Program Summary</h2>

                    <div className="space-y-4 rounded-2xl border border-gray-800 bg-black/40 p-5">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Program</span>
                            <span className="font-bold text-white text-right">{selectedProgram.title}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Duration</span>
                            <span className="font-medium text-white">{selectedProgram.duration}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Trainer</span>
                            <span className="font-medium text-white">{selectedProgram.trainer}</span>
                        </div>

                        {selectedProgram.schedule && (
                            <div className="pt-2 border-t border-white/5">
                                <span className="text-[11px] text-gray-500 block mb-1">Schedule</span>
                                <span className="text-xs text-gray-300 font-medium">{selectedProgram.schedule}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
                        <div className="flex items-center justify-between text-sm text-gray-300">
                            <span>Total Due</span>
                            <span className="text-2xl font-black text-orange-400">{formatCurrency(selectedProgram.price)}</span>
                        </div>
                    </div>

                    <p className="mt-6 text-xs text-gray-400 leading-relaxed">{selectedProgram.description}</p>

                    <p className="mt-4 text-[11px] text-gray-500 leading-relaxed border-t border-white/10 pt-4">
                        This is a simulated demo payment experience for Iron Forge Gym. No credit card information is stored.
                    </p>
                </div>
            </div>
        </section>
    );
}
