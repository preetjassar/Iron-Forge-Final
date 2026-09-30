// Predefined workout database for the ForgeFit workout generator
// Pure frontend logic — no external AI API required

export const GOALS = [
  { id: "muscle_gain", label: "Muscle Gain", desc: "Hypertrophy focused with moderate reps and progressive tension", icon: "Flame" },
  { id: "fat_loss", label: "Fat Loss", desc: "High density circuits and metabolic conditioning to maximize calorie burn", icon: "Zap" },
  { id: "strength", label: "Strength", desc: "Heavy compound lifting focusing on maximum neural recruitment and power", icon: "Shield" },
  { id: "general_fitness", label: "General Fitness", desc: "Balanced strength, mobility, and cardiovascular health for everyday vitality", icon: "Heart" },
];

export const EXPERIENCES = [
  { id: "beginner", label: "Beginner", desc: "< 1 year of consistent lifting", levelBadge: "Foundational" },
  { id: "intermediate", label: "Intermediate", desc: "1 - 3 years of structured training", levelBadge: "Balanced" },
  { id: "advanced", label: "Advanced", desc: "3+ years of progressive overload", levelBadge: "High Intensity" },
];

export const TRAINING_DAYS = [
  { id: "3", label: "3 Days / Week", splitName: "Full Body Rotation" },
  { id: "4", label: "4 Days / Week", splitName: "Upper / Lower Split" },
  { id: "5", label: "5 Days / Week", splitName: "Push / Pull / Legs + Upper / Lower" },
  { id: "6", label: "6 Days / Week", splitName: "Push / Pull / Legs (PPL x2)" },
];

export const EQUIPMENTS = [
  { id: "full_gym", label: "Full Gym", desc: "Barbells, Dumbbells, Cables, Leg Press, Smith Machine, Benches" },
  { id: "home", label: "Home / Basic", desc: "Dumbbells, Resistance Bands, Pull-Up Bar, Bodyweight" },
];

export const DURATIONS = [
  { id: "30", label: "30 Minutes", exerciseCount: 3, restMultiplier: 0.75 },
  { id: "45", label: "45 Minutes", exerciseCount: 5, restMultiplier: 1.0 },
  { id: "60", label: "60 Minutes", exerciseCount: 6, restMultiplier: 1.25 },
];

// Exercise library categorized by movement pattern and equipment
export const EXERCISE_BANK = {
  chest: {
    full_gym: [
      { name: "Barbell Bench Press", tip: "Retract scapulae and drive through feet" },
      { name: "Incline Dumbbell Press", tip: "Set bench to 30 degrees to target upper pectorals" },
      { name: "Cable Chest Flyes", tip: "Squeeze pectorals at contraction point, control the stretch" },
      { name: "Chest Dips (Weighted)", tip: "Lean forward 15 degrees to prioritize chest over triceps" },
      { name: "Machine Chest Press", tip: "Keep shoulders down and push with elbows tucked" },
      { name: "Decline Dumbbell Press", tip: "Maintain core tightness throughout the press" },
    ],
    home: [
      { name: "Standard Push-Ups", tip: "Keep body in rigid plank, chest to floor" },
      { name: "Decline Push-Ups", tip: "Elevate feet on chair/bench for upper chest focus" },
      { name: "Floor Dumbbell Press", tip: "Touch elbows lightly to floor then press explosively" },
      { name: "Resistance Band Chest Flyes", tip: "Anchor band behind you and squeeze hands together" },
      { name: "Diamond Push-Ups", tip: "Hands close under sternum for inner chest & triceps" },
    ],
  },
  back: {
    full_gym: [
      { name: "Barbell Deadlift", tip: "Neutral spine, engage lats before breaking the floor" },
      { name: "Lat Pulldown (Wide Grip)", tip: "Pull elbows down towards back pockets, do not swing" },
      { name: "Barbell Bent-Over Row", tip: "Hinge at 45 degrees, pull bar towards naval" },
      { name: "Seated Cable Row", tip: "Initiate pull by retracting shoulder blades" },
      { name: "Single-Arm Dumbbell Row", tip: "Keep torso parallel to floor, drive elbow high" },
      { name: "T-Bar Row", tip: "Tight core, pull smoothly to lower ribs" },
    ],
    home: [
      { name: "Pull-Ups / Chin-Ups", tip: "Full dead hang to chin clearly over bar" },
      { name: "Dumbbell Bent-Over Row", tip: "Hinge at hips, flat spine, pull smoothly" },
      { name: "Resistance Band Face Pulls", tip: "Pull band to bridge of nose with external rotation" },
      { name: "Inverted Rows (under table/bar)", tip: "Straight body line, pull chest to underside" },
      { name: "Prone Superman Holds", tip: "Lift chest and thighs off floor to strengthen erectors" },
    ],
  },
  legs: {
    full_gym: [
      { name: "Barbell Back Squat", tip: "Brace core deeply, hit parallel or below" },
      { name: "Leg Press", tip: "Do not lock knees at the top, control descent" },
      { name: "Romanian Deadlift (RDL)", tip: "Hinge back into hips with soft knees, feel hamstrings stretch" },
      { name: "Walking Dumbbell Lunges", tip: "Maintain upright torso, 90-degree bend in front knee" },
      { name: "Leg Extension", tip: "Pause 1 second at full knee extension" },
      { name: "Lying Hamstring Leg Curl", tip: "Keep hips pinned to pad throughout the curl" },
      { name: "Standing Calf Raises", tip: "Deep stretch at bottom, explosive push on big toe" },
    ],
    home: [
      { name: "Goblet Squat (Dumbbell)", tip: "Hold weight close to sternum, keep chest proud" },
      { name: "Dumbbell Romanian Deadlift", tip: "Push hips back like closing a door behind you" },
      { name: "Bulgarian Split Squats", tip: "Rear foot on sofa/chair, drive through front heel" },
      { name: "Jump Squats / Bodyweight Squats", tip: "Land softly and smoothly transition into next rep" },
      { name: "Single-Leg Glute Bridges", tip: "Drive heel into floor, squeeze glute at peak" },
      { name: "Elevated Single-Leg Calf Raises", tip: "Full range of motion off step or thick book" },
    ],
  },
  shoulders: {
    full_gym: [
      { name: "Overhead Barbell Military Press", tip: "Lock out overhead with bicep beside ear" },
      { name: "Seated Dumbbell Shoulder Press", tip: "Press in slight arc without banging weights together" },
      { name: "Dumbbell Lateral Raises", tip: "Lead with elbows, slight forward tilt, pinkies high" },
      { name: "Cable Face Pulls", tip: "Essential for rear delts and rotator cuff health" },
      { name: "Barbell Upright Row", tip: "Wide grip to spare shoulders, pull to mid-chest" },
      { name: "Reverse Pec Deck Fly", tip: "Squeeze rear deltoids, keep arms slightly soft" },
    ],
    home: [
      { name: "Standing Dumbbell Shoulder Press", tip: "Brace glutes and abs to avoid arching lower back" },
      { name: "Dumbbell Lateral Raises", tip: "Strict form, avoid using leg drive or torso swing" },
      { name: "Bent-Over Rear Delt Flyes", tip: "Hinge at hips, raise arms out like wings" },
      { name: "Pike Push-Ups", tip: "Hips high in V-shape, lower head between hands" },
      { name: "Resistance Band Overhead Press", tip: "Step on band center, press smoothly overhead" },
    ],
  },
  arms: {
    full_gym: [
      { name: "Barbell Bicep Curl", tip: "Elbows pinned to sides, avoid rocking back" },
      { name: "Triceps Cable Pushdown", tip: "Use rope or V-bar, spread rope at the bottom" },
      { name: "Incline Dumbbell Curl", tip: "Provides deep stretch on the long head of the bicep" },
      { name: "Skull Crushers (EZ-Bar)", tip: "Lower bar to forehead/crown, pivot at elbows only" },
      { name: "Hammer Curls", tip: "Neutral palms to target brachialis and forearm thickness" },
      { name: "Overhead Cable Triceps Extension", tip: "Deep triceps stretch with elbows high" },
    ],
    home: [
      { name: "Dumbbell Bicep Curls", tip: "Supinate wrist on the way up for peak bicep squeeze" },
      { name: "Chair / Bench Triceps Dips", tip: "Keep back close to bench, lower to 90 degrees" },
      { name: "Dumbbell Hammer Curls", tip: "Controlled tempo, pause at top contraction" },
      { name: "Overhead Dumbbell Triceps Extension", tip: "Cup one heavy dumbbell with both hands" },
      { name: "Diamond Push-Ups (Close Grip)", tip: "Maximizes tricep activation through bodyweight" },
    ],
  },
  core: {
    full_gym: [
      { name: "Hanging Leg Raises", tip: "Curl pelvis upward, do not rely on hip flexor swing" },
      { name: "Cable Woodchoppers", tip: "Rotate through thoracic spine and engage obliques" },
      { name: "Ab Wheel Rollouts", tip: "Tuck hips, roll forward as far as core stability allows" },
      { name: "Weighted Plank", tip: "Plate on mid-back, squeeze glutes and quad muscles" },
    ],
    home: [
      { name: "Plank with Shoulder Taps", tip: "Minimize hip sway while tapping opposite shoulder" },
      { name: "Bicycle Crunches", tip: "Rotate elbow to opposite knee with controlled tempo" },
      { name: "Lying Leg Raises", tip: "Keep lower back pressed flat into floor" },
      { name: "Russian Twists", tip: "Elevate feet if intermediate, twist shoulders fully" },
    ],
  },
};

// Generates plan structure based on days, goal, experience, duration, equipment
export function generateWorkoutPlan({ goal, experience, days, equipment, duration }) {
  const dayCount = parseInt(days, 10) || 4;
  const eq = equipment === "home" ? "home" : "full_gym";
  const durConfig = DURATIONS.find((d) => d.id === duration) || DURATIONS[1];
  const count = durConfig.exerciseCount;

  // Goal-based rep & set schemes
  let repScheme = "8–12 Reps";
  let setScheme = "3–4 Sets";
  let restTime = "60–90 sec";

  if (goal === "strength") {
    repScheme = experience === "advanced" ? "3–5 Reps" : "4–6 Reps";
    setScheme = "4–5 Sets";
    restTime = "120–180 sec";
  } else if (goal === "fat_loss") {
    repScheme = "12–15 Reps";
    setScheme = "3 Sets";
    restTime = "30–45 sec";
  } else if (goal === "muscle_gain") {
    repScheme = "8–12 Reps";
    setScheme = "4 Sets";
    restTime = "75–90 sec";
  } else {
    repScheme = "10–12 Reps";
    setScheme = "3 Sets";
    restTime = "60 sec";
  }

  // Define Day Templates based on dayCount
  let schedule = [];

  if (dayCount === 3) {
    schedule = [
      {
        day: "Monday",
        title: "Full Body A — Quad & Push Focus",
        muscleGroups: ["legs", "chest", "shoulders", "core"],
      },
      { day: "Tuesday", title: "Active Recovery / Rest", isRest: true },
      {
        day: "Wednesday",
        title: "Full Body B — Posterior Chain & Pull Focus",
        muscleGroups: ["back", "legs", "arms", "core"],
      },
      { day: "Thursday", title: "Active Recovery / Rest", isRest: true },
      {
        day: "Friday",
        title: "Full Body C — Hypertrophy & Arms Focus",
        muscleGroups: ["chest", "back", "arms", "shoulders"],
      },
      { day: "Saturday", title: "Cardio & Mobility", isRest: true },
      { day: "Sunday", title: "Full Rest Day", isRest: true },
    ];
  } else if (dayCount === 4) {
    schedule = [
      {
        day: "Monday",
        title: "Upper Body Power",
        muscleGroups: ["chest", "back", "shoulders"],
      },
      {
        day: "Tuesday",
        title: "Lower Body Strength & Core",
        muscleGroups: ["legs", "core"],
      },
      { day: "Wednesday", title: "Mid-Week Recovery", isRest: true },
      {
        day: "Thursday",
        title: "Upper Body Hypertrophy & Arms",
        muscleGroups: ["chest", "back", "arms"],
      },
      {
        day: "Friday",
        title: "Lower Body & Posterior Focus",
        muscleGroups: ["legs", "core"],
      },
      { day: "Saturday", title: "Active Recovery", isRest: true },
      { day: "Sunday", title: "Rest & Meal Prep", isRest: true },
    ];
  } else if (dayCount === 5) {
    schedule = [
      {
        day: "Monday",
        title: "Chest & Triceps (Push)",
        muscleGroups: ["chest", "arms"],
      },
      {
        day: "Tuesday",
        title: "Back & Biceps (Pull)",
        muscleGroups: ["back", "arms"],
      },
      {
        day: "Wednesday",
        title: "Legs & Core (Lower)",
        muscleGroups: ["legs", "core"],
      },
      {
        day: "Thursday",
        title: "Shoulders & Traps",
        muscleGroups: ["shoulders", "core"],
      },
      {
        day: "Friday",
        title: "Full Body Functional Finisher",
        muscleGroups: ["legs", "back", "chest"],
      },
      { day: "Saturday", title: "Recovery & Light Cardio", isRest: true },
      { day: "Sunday", title: "Rest Day", isRest: true },
    ];
  } else {
    // 6 Days PPL x 2
    schedule = [
      { day: "Monday", title: "Push (Chest, Shoulders, Triceps)", muscleGroups: ["chest", "shoulders", "arms"] },
      { day: "Tuesday", title: "Pull (Back, Rear Delts, Biceps)", muscleGroups: ["back", "arms"] },
      { day: "Wednesday", title: "Legs (Quads, Hamstrings, Calves)", muscleGroups: ["legs", "core"] },
      { day: "Thursday", title: "Push (Hypertrophy Focus)", muscleGroups: ["chest", "shoulders", "arms"] },
      { day: "Friday", title: "Pull (Lats, Upper Back, Biceps)", muscleGroups: ["back", "arms"] },
      { day: "Saturday", title: "Legs (Posterior Chain & Core)", muscleGroups: ["legs", "core"] },
      { day: "Sunday", title: "Full Rest Day", isRest: true },
    ];
  }

  // Populate exercises for active days
  const populatedDays = schedule.map((dayItem) => {
    if (dayItem.isRest) {
      return {
        ...dayItem,
        description: "Focus on hydration, 8 hours of sleep, static stretching, and hitting daily protein goals.",
        exercises: [],
      };
    }

    const dayExercises = [];
    const groups = dayItem.muscleGroups || ["chest", "back", "legs"];

    // Distribute target count across groups
    let groupIdx = 0;
    while (dayExercises.length < count) {
      const currentGroup = groups[groupIdx % groups.length];
      const bank = EXERCISE_BANK[currentGroup]?.[eq] || EXERCISE_BANK[currentGroup]?.full_gym || [];

      // Pick an exercise not already picked for this day
      const candidate = bank.find((ex) => !dayExercises.some((dEx) => dEx.name === ex.name));

      if (candidate) {
        dayExercises.push({
          name: candidate.name,
          category: currentGroup.toUpperCase(),
          sets: setScheme,
          reps: repScheme,
          rest: restTime,
          tip: candidate.tip,
        });
      } else {
        // Fallback pick
        const fallback = bank[dayExercises.length % bank.length];
        if (fallback) {
          dayExercises.push({
            name: fallback.name,
            category: currentGroup.toUpperCase(),
            sets: setScheme,
            reps: repScheme,
            rest: restTime,
            tip: fallback.tip,
          });
        }
      }
      groupIdx++;
      if (groupIdx > 20) break; // guard
    }

    return {
      ...dayItem,
      exercises: dayExercises,
    };
  });

  return {
    id: `plan_${Date.now()}`,
    createdAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    params: {
      goal,
      experience,
      days: `${dayCount} Days`,
      equipment: equipment === "home" ? "Home / Basic" : "Full Gym",
      duration: `${duration} Minutes`,
    },
    meta: {
      split: TRAINING_DAYS.find((d) => d.id === days)?.splitName || "Personalized Split",
      goalTitle: GOALS.find((g) => g.id === goal)?.label || "Custom Goal",
      experienceLevel: EXPERIENCES.find((e) => e.id === experience)?.label || "All Levels",
    },
    days: populatedDays,
  };
}
