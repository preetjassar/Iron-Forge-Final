import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaDumbbell,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/trainers", label: "Trainers" },
  { to: "/pricing", label: "Pricing" },
  { to: "/forgefit", label: "ForgeFit", isNew: true },
  { to: "/calculations", label: "BMI / BMR" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll for subtle border effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      setProfileDropdownOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const linkClass = ({ isActive }) => `
    relative text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-200 py-1.5 flex items-center gap-1.5
    ${isActive ? "text-orange-500 font-extrabold" : "text-gray-300 hover:text-white"}
  `;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-[#090909]/95 backdrop-blur-xl border-b border-white/10 ${
        scrolled ? "shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-3" : "py-3.5"
      }`}
    >
      {/* Top ambient orange line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-sm pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <FaDumbbell className="text-orange-500 text-lg group-hover:text-black transition duration-300" />
          </div>

          <span
            className="text-2xl sm:text-3xl font-black tracking-wide text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            IRON <span className="text-orange-500">FORGE</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS (Visible on PC / Laptops >= 1024px) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-orange-500 text-black leading-none uppercase">
                      NEW
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP RIGHT AUTH ACTIONS */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {user ? (
            /* User Dropdown */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="cursor-pointer flex items-center gap-2.5 py-2 px-3.5 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all text-xs font-semibold text-gray-200"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 text-black font-extrabold text-xs flex items-center justify-center uppercase">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </div>
                <span className="max-w-[110px] truncate">
                  {user.displayName || user.email.split("@")[0]}
                </span>
                <FaChevronDown size={10} className="text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#111111] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    <p className="text-xs font-bold text-orange-400">Active Member</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <FaUser className="text-orange-500" size={13} />
                    <span>My Profile</span>
                  </Link>

                  <div className="h-px bg-white/10 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition text-left"
                  >
                    <FaSignOutAlt size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest Actions */
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-white/20 hover:border-orange-500 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)] flex items-center gap-1.5"
              >
                <span>Join Now</span>
                <FaArrowRight size={10} />
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE BUTTON (Visible only on tablets & phones < 1024px) */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden cursor-pointer text-orange-500 p-2 text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      {menuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 px-6 py-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center justify-between text-sm uppercase tracking-wider font-bold py-2 transition
                ${isActive ? "text-orange-500 font-extrabold" : "text-gray-300 hover:text-white"}
              `}
            >
              <span>{link.label}</span>
              {link.isNew && (
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-orange-500 text-black">
                  NEW
                </span>
              )}
            </NavLink>
          ))}

          <div className="h-px bg-white/10 my-3" />

          {/* User Links or Auth Buttons in Mobile Menu */}
          {user ? (
            <div className="space-y-3 pt-2">
              <div className="text-xs text-gray-400 px-2">
                Signed in as <span className="text-orange-400 font-bold">{user.email}</span>
              </div>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-200"
              >
                <FaUser className="text-orange-500" size={14} />
                <span>My Profile</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer w-full mt-3 py-3 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-bold uppercase tracking-wider text-xs transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center py-3 rounded-full border border-orange-500 text-orange-400 font-bold uppercase tracking-wider text-xs"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-center py-3 rounded-full bg-orange-500 text-black font-black uppercase tracking-wider text-xs shadow-lg"
              >
                Join Iron Forge
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}