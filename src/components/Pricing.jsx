import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaCalculator, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { PRICING_PLANS, DURATION_OPTIONS, ADDONS_LIST } from "../data/Pricing";

export default function Pricing() {
  const navigate = useNavigate();

  // Interactive Calculator State
  const [selectedPlanId, setSelectedPlanId] = useState("premium");
  const [selectedDurationMonths, setSelectedDurationMonths] = useState(6);
  const [selectedAddonIds, setSelectedAddonIds] = useState(["personal_training"]);

  const selectedPlan = useMemo(
    () => PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1],
    [selectedPlanId]
  );

  const selectedDuration = useMemo(
    () => DURATION_OPTIONS.find((d) => d.months === selectedDurationMonths) || DURATION_OPTIONS[2],
    [selectedDurationMonths]
  );

  const selectedAddons = useMemo(
    () => ADDONS_LIST.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );

  // Calculation logic
  const calculation = useMemo(() => {
    const months = selectedDuration.months;
    const basePlanCost = selectedPlan.priceMonthly * months;
    const discountAmount = Math.round((basePlanCost * selectedDuration.discountPercent) / 100);
    const discountedBase = basePlanCost - discountAmount;

    const addonsCostPerMonth = selectedAddons.reduce((sum, a) => sum + a.pricePerMonth, 0);
    const totalAddonsCost = addonsCostPerMonth * months;

    const totalAmount = discountedBase + totalAddonsCost;

    return {
      months,
      basePlanCost,
      discountAmount,
      discountedBase,
      totalAddonsCost,
      totalAmount,
    };
  }, [selectedPlan, selectedDuration, selectedAddons]);

  const toggleAddon = (addonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleProceedToPayment = () => {
    const planSummary = {
      title: `${selectedPlan.name} Membership (${selectedDuration.label})`,
      price: calculation.totalAmount,
      duration: selectedDuration.label,
      trainer: selectedAddonIds.includes("personal_training") ? "Personal Coach Included" : "General Floor Trainer",
      description: `${selectedPlan.name} plan for ${selectedDuration.label}. Add-ons: ${
        selectedAddons.map((a) => a.name).join(", ") || "Standard Package"
      }`,
    };

    navigate("/payment", {
      state: {
        program: planSummary,
      },
    });
  };

  const handleCardSelect = (planId) => {
    setSelectedPlanId(planId);
    document.getElementById("membership-calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#050505] text-white py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[5px] text-orange-500 font-semibold text-sm mb-3">
            Membership Plans
          </p>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl uppercase text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Invest In Your Strength
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Transparent pricing with zero hidden maintenance fees. Select a base plan or use our live calculator below to customize your membership.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = plan.popular;
            return (
              <div
                key={plan.id}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between ${
                  isHighlighted
                    ? "bg-[#141414] border-2 border-orange-500 shadow-[0_20px_60px_rgba(249,115,22,0.2)] md:-translate-y-3"
                    : "bg-[#0f0f0f] border border-white/10 hover:border-orange-500/50 hover:-translate-y-2"
                }`}
              >
                {/* Popular Badge */}
                {isHighlighted && (
                  <div className="absolute top-5 right-5 bg-orange-500 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-3xl font-black uppercase text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.subtitle}</p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl sm:text-6xl font-black text-orange-500">
                        ₹{plan.priceMonthly}
                      </span>
                      <span className="text-gray-400 text-sm">/ month</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Billed monthly or discounted in tiers</span>
                  </div>

                  <div className="h-px bg-white/10 mb-8" />

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                          <FaCheck size={11} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleCardSelect(plan.id)}
                  className={`w-full py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    isHighlighted
                      ? "bg-orange-500 text-black hover:bg-orange-400 shadow-[0_10px_25px_rgba(249,115,22,0.3)]"
                      : "border border-orange-500/60 text-orange-400 hover:bg-orange-500 hover:text-black"
                  }`}
                >
                  <span>Select & Customize</span>
                  <FaArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>

        {/* DYNAMIC MEMBERSHIP COST CALCULATOR */}
        <div
          id="membership-calculator"
          className="bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-orange-400 tracking-[3px] mb-2">
                <FaCalculator />
                <span>Interactive Cost Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
                Frontend Membership Calculator
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Dynamically calculate your exact membership cost based on plan, duration, and optional add-ons.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-orange-300/80 bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/20 self-start md:self-auto">
              <FaShieldAlt />
              <span>College Project Demo • No Real Charges</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Controls (8 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Plan Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-3">
                  1. Choose Base Plan
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {PRICING_PLANS.map((p) => {
                    const isSelected = selectedPlanId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-orange-500/15 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                            : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        <div className="font-extrabold text-base">{p.name}</div>
                        <div className="text-xs text-gray-400 mt-1">₹{p.priceMonthly}/mo</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Duration Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-3">
                  2. Choose Duration & Tier Discount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DURATION_OPTIONS.map((dur) => {
                    const isSelected = selectedDurationMonths === dur.months;
                    return (
                      <button
                        key={dur.months}
                        type="button"
                        onClick={() => setSelectedDurationMonths(dur.months)}
                        className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-orange-500 text-black font-black border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                            : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        <div className="text-base font-black">{dur.label}</div>
                        <div className="text-[11px] mt-1 opacity-90">{dur.tag}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Add-ons Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-3">
                  3. Select Optional Add-Ons
                </label>
                <div className="space-y-3">
                  {ADDONS_LIST.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                          isChecked
                            ? "bg-orange-500/10 border-orange-500 text-white"
                            : "bg-black/30 border-white/10 text-gray-300 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
                          />
                          <div>
                            <div className="font-bold text-sm text-white">{addon.name}</div>
                            <div className="text-xs text-gray-400">{addon.desc}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-orange-400">+₹{addon.pricePerMonth}</span>
                          <span className="text-[11px] text-gray-500 block">/ month</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Receipt / Dynamic Summary (5 cols) */}
            <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white pb-4 mb-4 border-b border-white/10 flex items-center justify-between">
                  <span>Price Breakdown</span>
                  <span className="text-xs font-normal text-gray-400">{selectedDuration.label}</span>
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Base Plan */}
                  <div className="flex justify-between items-center text-gray-300">
                    <span>
                      {selectedPlan.name} Plan (₹{selectedPlan.priceMonthly} × {calculation.months} mos)
                    </span>
                    <span className="font-semibold text-white">₹{calculation.basePlanCost}</span>
                  </div>

                  {/* Discount */}
                  {calculation.discountAmount > 0 && (
                    <div className="flex justify-between items-center text-green-400">
                      <span>Duration Discount ({selectedDuration.discountPercent}%)</span>
                      <span className="font-semibold">-₹{calculation.discountAmount}</span>
                    </div>
                  )}

                  {/* Addons */}
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Add-ons Subtotal ({selectedAddons.length} selected)</span>
                    <span className="font-semibold text-white">₹{calculation.totalAddonsCost}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="pl-3 border-l-2 border-orange-500/30 space-y-1.5 text-xs text-gray-400">
                      {selectedAddons.map((a) => (
                        <div key={a.id} className="flex justify-between">
                          <span>{a.name}</span>
                          <span>₹{a.pricePerMonth * calculation.months}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10 my-6" />

                {/* Total Formula display */}
                <div className="bg-[#141414] border border-orange-500/20 rounded-2xl p-4 mb-6">
                  <div className="text-[11px] uppercase tracking-wider text-orange-400 font-bold mb-1">
                    Calculation Formula
                  </div>
                  <div className="text-xs text-gray-300 font-mono">
                    ({selectedPlan.name} × {calculation.months}m)
                    {calculation.discountAmount > 0 ? ` - ${selectedDuration.discountPercent}%` : ""}
                    {calculation.totalAddonsCost > 0 ? ` + Add-ons (₹${calculation.totalAddonsCost})` : ""}
                    {" = "}
                    <span className="text-orange-400 font-bold">₹{calculation.totalAmount}</span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-widest block">Total Membership Cost</span>
                    <span className="text-xs text-gray-500">Inclusive of all gym amenities</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-orange-500">
                    ₹{calculation.totalAmount}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_10px_30px_rgba(249,115,22,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Enrollment</span>
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}