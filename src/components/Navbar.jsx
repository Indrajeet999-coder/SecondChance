import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ShoppingBag, User, Sun, Moon } from "lucide-react";
import { navLinks } from "../data/mockData";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { isDark, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 glass shadow-sm shadow-emerald-900/5 transition-colors duration-300 dark:shadow-black/20"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-h-11 min-w-11 items-center gap-2 rounded-2xl px-2 transition-colors duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
          aria-label="SecondChance home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <Leaf className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-xl">
            SecondChance
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `min-h-11 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  isActive && !link.path.includes("#")
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "text-stone-600 hover:bg-emerald-50 hover:text-emerald-900 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-[#FDFBF7]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            className={`hidden min-h-11 items-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:inline-flex ${
              isHome
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700"
                : "border border-emerald-200 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800/50 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
            }`}
          >
            Browse surplus
          </Link>

          <button
            type="button"
            onClick={toggle}
            className="relative flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-2xl border border-stone-200/80 bg-white/60 text-stone-600 transition-colors duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-amber-300 dark:hover:border-emerald-700/50 dark:hover:bg-emerald-900/40"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="moon"
                  initial={{ y: 12, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -12, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <Moon className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ y: 12, opacity: 0, rotate: 90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -12, opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <Sun className="h-5 w-5 text-amber-500" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-stone-200/80 bg-white/60 text-stone-600 transition-colors duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-gray-400 dark:hover:border-emerald-700/50 dark:hover:bg-emerald-900/40 dark:hover:text-[#FDFBF7]"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <Link
            to="/profile"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/25 transition-colors duration-300 hover:bg-emerald-700"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
