import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/15"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-emerald-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-emerald-900/40 dark:bg-[#121C17]/80 dark:text-emerald-300">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Surplus event resources · Zero waste mission
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-6xl lg:text-7xl"
          >
            Give every gala, wedding & festival a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              second chance
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 transition-colors duration-300 dark:text-gray-400 sm:text-xl"
          >
            The premium marketplace for surplus decorations, props, furniture, and food.
            Rescue resources from events near you — before they hit the landfill.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/explore"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
            >
              Explore marketplace
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#impact"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-stone-200 bg-white/60 px-8 py-3 text-base font-semibold text-emerald-900 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/40 dark:bg-[#121C17]/60 dark:text-[#FDFBF7] dark:hover:border-emerald-700 dark:hover:bg-emerald-900/30"
            >
              See our impact
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-10 transition-colors duration-300 dark:border-emerald-900/30 sm:gap-8"
          >
            {[
              { value: "12.4k+", label: "Items rescued" },
              { value: "890+", label: "Verified sellers" },
              { value: "48t", label: "Waste diverted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-stone-500 transition-colors duration-300 dark:text-gray-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/60 shadow-2xl shadow-emerald-900/10 transition-colors duration-300 dark:border-emerald-900/30 dark:shadow-black/40">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
              alt="Elegant sustainable event setup"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <div className="glass absolute -bottom-6 left-4 right-4 mx-auto max-w-md rounded-2xl p-4 shadow-lg sm:left-8 sm:right-auto sm:max-w-xs">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
              Live now
            </p>
            <p className="mt-1 text-sm font-semibold text-stone-900 dark:text-[#FDFBF7]">
              50m silk draping · Brooklyn — Free pickup
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
