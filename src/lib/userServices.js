import { db } from "./firebase";
import {
    doc,
    getDoc,
    setDoc,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
    arrayUnion
} from "firebase/firestore";

/**
 * Local storage helpers for offline resilience & instant caching
 */
const getLocalKey = (prefix, uid) => `${prefix}_${uid}`;

export const getCachedPrograms = (uid) => {
    if (!uid) return [];
    try {
        const raw = localStorage.getItem(getLocalKey("iron_forge_programs", uid));
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const setCachedPrograms = (uid, programs) => {
    if (!uid) return;
    try {
        localStorage.setItem(getLocalKey("iron_forge_programs", uid), JSON.stringify(programs));
    } catch (e) {
        console.warn("Could not cache programs to localStorage:", e);
    }
};

export const getCachedBookings = (uid) => {
    if (!uid) return [];
    try {
        const raw = localStorage.getItem(getLocalKey("iron_forge_bookings", uid));
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const setCachedBookings = (uid, bookings) => {
    if (!uid) return;
    try {
        localStorage.setItem(getLocalKey("iron_forge_bookings", uid), JSON.stringify(bookings));
    } catch (e) {
        console.warn("Could not cache bookings to localStorage:", e);
    }
};

/**
 * Ensure user document exists in 'users' collection without overwriting existing data.
 */
export async function ensureUserDoc(user, extraData = {}) {
    if (!user?.uid) return null;
    try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            const initialDoc = {
                uid: user.uid,
                name: extraData.name || user.displayName || user.email?.split("@")[0] || "Iron Member",
                email: user.email || "",
                phone: extraData.phone || "",
                age: extraData.age || "",
                fitnessGoal: extraData.fitnessGoal || "Muscle Gain",
                plan: extraData.plan || "Standard Member",
                joinedPrograms: [],
                bookings: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            await setDoc(userRef, initialDoc);
            return initialDoc;
        } else {
            // Update profile with any extra data if provided
            if (Object.keys(extraData).length > 0) {
                await setDoc(userRef, { ...extraData, updatedAt: serverTimestamp() }, { merge: true });
            }
            return snap.data();
        }
    } catch (err) {
        console.warn("ensureUserDoc warning:", err);
        return null;
    }
}

/**
 * Record a program enrollment for the authenticated user.
 * Stores in user doc (joinedPrograms array & active plan), root 'enrollments' collection, and localStorage.
 */
export async function recordProgramEnrollment(user, program, memberDetails = {}, paymentDetails = {}) {
    if (!user?.uid) throw new Error("User must be authenticated to enroll in a program.");

    const referenceId = paymentDetails.paymentId || ("IFG" + Math.floor(100000 + Math.random() * 900000));
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const newEnrollment = {
        id: referenceId,
        referenceId,
        programName: program.title || program.name || "Iron Forge Program",
        description: program.description || "",
        trainer: program.trainer || "Senior Coach",
        duration: program.duration || "12 Weeks",
        schedule: program.schedule || "Mon - Sat (Flexible Schedule)",
        level: program.level || "All Fitness Levels",
        price: Number(program.price || 0),
        status: "Active",
        paymentStatus: "Paid",
        paymentMethod: paymentDetails.paymentMethod || "Credit Card (Demo)",
        joinedAt: now.toISOString(),
        formattedDate,
        memberName: memberDetails.fullName || user.displayName || "Member",
        memberEmail: user.email,
        memberPhone: memberDetails.phone || "",
    };

    // 1. Update localStorage cache immediately
    const existingCached = getCachedPrograms(user.uid);
    const updatedPrograms = [newEnrollment, ...existingCached.filter(p => p.id !== referenceId && p.programName !== newEnrollment.programName)];
    setCachedPrograms(user.uid, updatedPrograms);

    // 2. Persist in Firestore
    try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
            userRef,
            {
                plan: newEnrollment.programName,
                planPrice: newEnrollment.price,
                planDuration: newEnrollment.duration,
                trainer: newEnrollment.trainer,
                paymentStatus: "Active",
                phone: memberDetails.phone || user.phoneNumber || "",
                joinedPrograms: arrayUnion(newEnrollment),
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        );

        // Also add to dedicated 'enrollments' collection for institutional record keeping
        await addDoc(collection(db, "enrollments"), {
            ...newEnrollment,
            uid: user.uid,
            createdAt: serverTimestamp(),
        });
    } catch (err) {
        console.warn("Firestore enrollment save warning (cached locally):", err);
    }

    return newEnrollment;
}

/**
 * Record a training session booking for the authenticated user.
 */
export async function recordUserBooking(user, bookingData) {
    if (!user?.uid) throw new Error("User must be authenticated to book a session.");

    const bookingId = bookingData.bookingId || ("BK" + Math.floor(100000 + Math.random() * 900000));
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const newBooking = {
        id: bookingId,
        bookingId,
        program: bookingData.program || "Personal Training",
        trainer: bookingData.trainer || "Certified Coach",
        date: bookingData.date || formattedDate,
        time: bookingData.time || "10:00 AM",
        status: "Confirmed",
        paymentStatus: "Completed",
        createdAt: now.toISOString(),
        memberName: user.displayName || user.email?.split("@")[0] || "Member",
        memberEmail: user.email,
    };

    // 1. Update localStorage cache
    const existingCached = getCachedBookings(user.uid);
    const updatedBookings = [newBooking, ...existingCached.filter(b => b.id !== bookingId)];
    setCachedBookings(user.uid, updatedBookings);

    // 2. Persist to Firestore
    try {
        // Save to root 'bookings' collection
        await addDoc(collection(db, "bookings"), {
            ...newBooking,
            uid: user.uid,
            timestamp: serverTimestamp(),
        });

        // Also merge into user's document
        const userRef = doc(db, "users", user.uid);
        await setDoc(
            userRef,
            {
                bookings: arrayUnion(newBooking),
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        );
    } catch (err) {
        console.warn("Firestore booking save warning (cached locally):", err);
    }

    return newBooking;
}

/**
 * Comprehensive fetcher for the user's profile, joined programs, and bookings.
 * Merges Firestore user doc, collections, and local storage fallback seamlessly.
 */
export async function fetchUserFullProfile(user) {
    if (!user?.uid) return null;

    let profile = {
        name: user.displayName || user.email?.split("@")[0] || "Iron Member",
        email: user.email || "",
        phone: "",
        age: "",
        fitnessGoal: "Muscle Gain",
        plan: "Standard Member",
    };

    let joinedPrograms = [...getCachedPrograms(user.uid)];
    let bookings = [...getCachedBookings(user.uid)];

    try {
        // 1. Fetch user doc
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();
            profile = {
                name: data.name || profile.name,
                email: data.email || profile.email,
                phone: data.phone || profile.phone,
                age: data.age || profile.age,
                fitnessGoal: data.fitnessGoal || data.goal || profile.fitnessGoal,
                plan: data.plan || profile.plan,
            };

            // If user doc has joinedPrograms array, merge
            if (Array.isArray(data.joinedPrograms) && data.joinedPrograms.length > 0) {
                data.joinedPrograms.forEach((prog) => {
                    if (!joinedPrograms.some((p) => p.id === prog.id || p.programName === prog.programName)) {
                        joinedPrograms.push(prog);
                    }
                });
            } else if (data.plan && data.plan !== "Standard Member" && data.plan !== "Standard Access") {
                // Synthesize from active plan if array not yet populated
                const legacyProg = {
                    id: "ACTIVE-PLAN",
                    referenceId: "IFG-MEMBER",
                    programName: data.plan,
                    trainer: data.trainer || "Assigned Coach",
                    duration: data.planDuration || "Active Plan",
                    schedule: "Mon - Sat (Flexible)",
                    status: "Active",
                    paymentStatus: data.paymentStatus || "Paid",
                    price: data.planPrice || 0,
                    formattedDate: "Current Member Plan",
                };
                if (!joinedPrograms.some((p) => p.programName === legacyProg.programName)) {
                    joinedPrograms.push(legacyProg);
                }
            }

            // If user doc has bookings array, merge
            if (Array.isArray(data.bookings) && data.bookings.length > 0) {
                data.bookings.forEach((b) => {
                    if (!bookings.some((existing) => existing.id === b.id || (existing.date === b.date && existing.time === b.time))) {
                        bookings.push(b);
                    }
                });
            }
        } else {
            // First time user, ensure doc exists
            await ensureUserDoc(user);
        }

        // 2. Also query root 'bookings' collection for any bookings with uid == user.uid
        try {
            const bookingsQuery = query(collection(db, "bookings"), where("uid", "==", user.uid));
            const bookingsSnap = await getDocs(bookingsQuery);
            bookingsSnap.forEach((docItem) => {
                const bData = docItem.data();
                const item = {
                    id: docItem.id,
                    bookingId: bData.bookingId || docItem.id,
                    program: bData.program || "Training Session",
                    trainer: bData.trainer || "Coach",
                    date: bData.date || "Scheduled Date",
                    time: bData.time || "Scheduled Time",
                    status: bData.status || "Confirmed",
                    paymentStatus: bData.paymentStatus || "Completed",
                };
                if (!bookings.some((existing) => existing.id === item.id || existing.bookingId === item.bookingId || (existing.date === item.date && existing.time === item.time))) {
                    bookings.push(item);
                }
            });
        } catch (queryErr) {
            console.warn("Could not query bookings collection:", queryErr);
        }

        // 3. Also query root 'enrollments' collection
        try {
            const enrollQuery = query(collection(db, "enrollments"), where("uid", "==", user.uid));
            const enrollSnap = await getDocs(enrollQuery);
            enrollSnap.forEach((docItem) => {
                const eData = docItem.data();
                const item = {
                    id: docItem.id,
                    referenceId: eData.referenceId || docItem.id,
                    programName: eData.programName || eData.plan || "Iron Forge Program",
                    trainer: eData.trainer || "Certified Coach",
                    duration: eData.duration || "12 Weeks",
                    schedule: eData.schedule || "Flexible Hours",
                    status: eData.status || "Active",
                    paymentStatus: eData.paymentStatus || "Paid",
                    price: eData.price || 0,
                    formattedDate: eData.formattedDate || "Recent",
                };
                if (!joinedPrograms.some((existing) => existing.id === item.id || existing.referenceId === item.referenceId || existing.programName === item.programName)) {
                    joinedPrograms.push(item);
                }
            });
        } catch (queryErr) {
            console.warn("Could not query enrollments collection:", queryErr);
        }

        // Update local caches with the merged sets
        setCachedPrograms(user.uid, joinedPrograms);
        setCachedBookings(user.uid, bookings);
    } catch (err) {
        console.error("fetchUserFullProfile error:", err);
    }

    return {
        profile,
        joinedPrograms,
        bookings,
    };
}
