import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ResourceCard from "./ResourceCard";

export default function FeaturedCarousel({ items }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Curated surplus
            </p>
            <h2 className="font-serif text-3xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-4xl">
              Featured surplus items
            </h2>
            <p className="mt-2 max-w-xl text-stone-600 dark:text-gray-400">
              Premium event resources available now — rescued from galas, weddings, and festivals.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 transition-colors duration-300 hover:border-emerald-200 hover:text-emerald-800 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-gray-400 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 transition-colors duration-300 hover:border-emerald-200 hover:text-emerald-800 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-gray-400 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="hide-scrollbar mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="w-[min(100%,320px)] shrink-0 snap-start sm:w-[340px]"
            >
              <ResourceCard
                resource={item}
                index={index}
                linkToDetail
                onReserve={() => {}}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            to="/explore"
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border-2 border-emerald-600 px-6 py-2.5 text-sm font-semibold text-emerald-800 transition-colors duration-300 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
          >
            View all surplus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
