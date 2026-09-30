import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaDumbbell,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { ensureUserDoc } from "../../lib/userServices";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/profile";

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const login = async (data) => {
    try {
      setLoading(true);
      setAuthError("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await ensureUserDoc(userCredential.user);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      let msg = "Invalid email or password. Please check your credentials.";
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") msg = "Invalid email or password. Please check your credentials.";
      if (error.code === "auth/wrong-password") msg = "Incorrect password.";
      if (error.code === "auth/invalid-email") msg = "Please enter a valid email address.";
      if (error.code === "auth/too-many-requests") msg = "Too many failed attempts. Try again later.";
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setGoogleLoading(true);
      setAuthError("");

      const result = await signInWithPopup(auth, provider);
      await ensureUserDoc(result.user);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Google auth error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setAuthError("Google Sign-In was cancelled.");
      } else {
        setAuthError("Google Sign-In failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 py-12 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-[#111111]/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center group hover:bg-orange-500 transition-all duration-300">
              <FaDumbbell className="text-orange-500 group-hover:text-black text-2xl transition duration-300" />
            </Link>
          </div>

          <h1 className="text-3xl font-black text-center text-white uppercase tracking-tight">
            Welcome Back
          </h1>

          <p className="text-center text-gray-400 text-sm mt-1 mb-8">
            Enter your credentials to access your Iron Forge account
          </p>

          {/* Inline Error Alert */}
          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs leading-relaxed animate-fadeIn">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(login)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Email Address
              </label>
              <div className="flex items-center bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                <FaEnvelope className="text-gray-500 mr-3 shrink-0" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="bg-transparent outline-none text-white w-full text-sm placeholder-gray-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password with Visibility Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <div className="flex items-center bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 transition">
                <FaLock className="text-gray-500 mr-3 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="bg-transparent outline-none text-white w-full text-sm placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-gray-500 hover:text-gray-300 ml-2 focus:outline-none"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full mt-2 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.3)] disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In to Iron Forge"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="h-px bg-white/10 flex-1" />
            <span className="px-3 text-xs uppercase text-gray-500">or</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Google Auth */}
          <button
            type="button"
            onClick={googleLogin}
            disabled={googleLoading}
            className="cursor-pointer w-full py-3.5 px-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition flex items-center justify-center gap-3 disabled:opacity-60"
          >
            <FaGoogle className="text-red-500" />
            <span>{googleLoading ? "Connecting..." : "Continue with Google"}</span>
          </button>

          {/* Switch to Signup */}
          <p className="text-center text-gray-400 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 hover:text-orange-400 font-bold transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}