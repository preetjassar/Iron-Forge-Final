import Strength from "../assets/programers/Strength.png";
import WeightLoss from "../assets/programers/weightloss.png";
import Cardio from "../assets/programers/cardio.png";
import Yoga from "../assets/programers/yoga.png";
import Crossfit from "../assets/programers/crossfit.png";
import Personal from "../assets/programers/personal training.png";

import {
    FaDumbbell,
    FaFire,
    FaHeartbeat,
    FaSpa,
    FaWeightHanging,
    FaUser,
} from "react-icons/fa";

const programs = [
    {
        id: 1,
        title: "Strength Training",
        description: "Build lean muscle and increase raw strength with progressive overload and power lifting foundations.",
        duration: "12 Weeks",
        level: "Intermediate / Advanced",
        trainer: "Arjun Mehta",
        price: 12999,
        schedule: "Mon - Fri, 6:00 AM - 10:00 AM & 5:00 PM - 9:00 PM",
        features: [
            "Barbell squat, bench press & deadlift mastery",
            "Periodized progressive overload programming",
            "Nutritional macro breakdown for muscle hypertrophy",
            "Weekly 1-on-1 form check and load calibration",
        ],
        image: Strength,
        icon: FaDumbbell,
        path: "StrengthTraining",
    },
    {
        id: 2,
        title: "Weight Loss",
        description: "Torch body fat and sculpt athletic muscle with structured metabolic conditioning and nutrition guidance.",
        duration: "8 Weeks",
        level: "All Fitness Levels",
        trainer: "Rohan Malhotra",
        price: 9999,
        schedule: "Mon, Wed, Fri, 7:00 AM - 9:00 AM & 6:00 PM - 8:00 PM",
        features: [
            "Targeted metabolic resistance training & HIIT",
            "Custom sustainable calorie deficit nutrition plan",
            "Body fat percentage & biometric composition tracking",
            "Continuous hydration and recovery coaching",
        ],
        image: WeightLoss,
        icon: FaFire,
        path: "WeightLoss",
    },
    {
        id: 3,
        title: "Cardio Fitness",
        description: "Maximize cardiovascular endurance, stamina, and VO2 max through high-tempo aerobic circuits.",
        duration: "6 Weeks",
        level: "Beginner / Intermediate",
        trainer: "Simran Kaur",
        price: 8999,
        schedule: "Tue, Thu, Sat, 6:30 AM - 8:30 AM & 5:30 PM - 7:30 PM",
        features: [
            "Aerobic threshold and heart rate zone optimization",
            "Dynamic interval cardio, rowing, and turf sprinting",
            "Low-impact stamina building & active recovery days",
            "Comprehensive cardiovascular health monitoring",
        ],
        image: Cardio,
        icon: FaHeartbeat,
        path: "CardioFitness",
    },
    {
        id: 4,
        title: "Yoga & Flexibility",
        description: "Enhance athletic joint mobility, prevent injury, and restore central nervous system balance.",
        duration: "10 Weeks",
        level: "All Levels Welcome",
        trainer: "Ananya Sharma",
        price: 7999,
        schedule: "Mon - Fri, 6:00 AM - 8:00 AM & 6:00 PM - 7:30 PM",
        features: [
            "Asana postures targeting hips, shoulders & spinal mobility",
            "Guided breathwork for central nervous system decompression",
            "Functional range conditioning for joint longevity",
            "Restorative recovery protocols for intense training cycles",
        ],
        image: Yoga,
        icon: FaSpa,
        path: "YogaFlexibilty",
    },
    {
        id: 5,
        title: "CrossFit",
        description: "Intense functional training combining Olympic lifting, gymnastics, and high-density work capacity.",
        duration: "8 Weeks",
        level: "Intermediate / Advanced",
        trainer: "Mohit Gupta",
        price: 10999,
        schedule: "Mon - Sat, 6:00 AM - 9:00 AM & 5:00 PM - 8:30 PM",
        features: [
            "Olympic snatch and clean & jerk technical coaching",
            "High-density Workouts of the Day (WODs)",
            "Gymnastics bar & ring strength progressions",
            "Pacing and lactate clearance conditioning",
        ],
        image: Crossfit,
        icon: FaWeightHanging,
        path: "Crossfit",
    },
    {
        id: 6,
        title: "Personal Training",
        description: "1-on-1 private coaching tailored precisely to your biomechanics, schedule, and transformation targets.",
        duration: "Custom Plan",
        level: "Personalized (1-on-1)",
        trainer: "Rohit Verma",
        price: 14999,
        schedule: "Flexible 1-on-1 Scheduling (Mon - Sun)",
        features: [
            "Dedicated private coach for all workout sessions",
            "Custom biometric assessment and mobility screening",
            "Daily meal logging review and macronutrient adjustments",
            "Priority gym equipment access and exclusive session booking",
        ],
        image: Personal,
        icon: FaUser,
        path: "PersonalTraining",
    },
];

export default programs;