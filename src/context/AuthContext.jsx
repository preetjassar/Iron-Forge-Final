import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import { auth, provider } from "../lib/firebase";
import { ensureUserDoc } from "../lib/userServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    }

    function login(email, password) {
        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    }

    function loginWithGoogle() {
        return signInWithPopup(auth, provider);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {
                setUser(currentUser);
                if (currentUser) {
                    try {
                        await ensureUserDoc(currentUser);
                    } catch (err) {
                        console.warn("Auth state change user doc check error:", err);
                    }
                }
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const value = {
        user,
        signup,
        login,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}