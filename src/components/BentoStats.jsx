import { motion } from "framer-motion";
import { Droplets, Recycle, TreePine, Users, Package } from "lucide-react";
import { impactStats } from "../data/mockData";

const icons = {
  waste: Recycle,
  events: Users,
  co2: TreePine,
  sellers: Users,
  rescued: Package,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BentoStats() {
  return (
    <section id="impact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Environmental impact
          </p>
          <h2 className="font-serif text-3xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-4xl">
            Every reservation rewires the event economy
          </h2>
          <p className="mt-3 text-stone-600 dark:text-gray-400">
            Real-time impact from our community of venues, planners, and hosts giving surplus a second life.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {impactStats.map((stat) => {
            const Icon = icons[stat.id] || Droplets;
            const isLarge = stat.span.includes("row-span-2");

            return (
              <motion.div
                key={stat.id}
                variants={item}
                className={`${stat.span} group relative overflow-hidden rounded-2xl border border-stone-200/80 p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-emerald-900/30 ${
                  stat.accent === "orange"
                    ? "bg-gradient-to-br from-orange-50 to-[#FDFBF7] dark:from-orange-950/30 dark:to-[#121C17]"
                    : stat.accent === "emerald"
                      ? "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-[#121C17]"
                      : "bg-white dark:bg-[#121C17]"
                } ${isLarge ? "flex flex-col justify-between lg:min-h-[300px]" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      stat.accent === "orange"
                        ? "bg-orange-500 text-white"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className={isLarge ? "mt-auto" : "mt-4"}>
                  <p className="text-sm font-medium text-stone-500 dark:text-gray-400">{stat.label}</p>
                  <p className="mt-1 font-serif text-4xl font-semibold tracking-tight text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-5xl">
                    {stat.value}
                    {stat.unit && (
                      <span className="ml-1 text-2xl font-sans font-medium text-stone-500">
                        {stat.unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-600/5 transition-transform group-hover:scale-110" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
