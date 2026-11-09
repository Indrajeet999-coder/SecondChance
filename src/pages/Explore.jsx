import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, PackageOpen } from "lucide-react";
import FilterSidebar from "../components/FilterSidebar";
import ResourceCard from "../components/ResourceCard";
import SkeletonCard from "../components/SkeletonCard";
import { resources } from "../data/mockData";
import { filterResources } from "../utils/filterResources";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [reserved, setReserved] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [search, category, condition, priceFilter]);

  const filtered = useMemo(
    () =>
      filterResources(resources, {
        search,
        category,
        condition,
        priceFilter,
      }),
    [search, category, condition, priceFilter],
  );

  return (
    <motion.div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-stone-200/80 pb-8 transition-colors duration-300 dark:border-emerald-900/30">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Marketplace
        </p>
        <h1 className="font-serif text-3xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-4xl">
          Explore surplus resources
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600 dark:text-gray-400">
          Search and filter decorations, lighting, furniture, floral, catering, and more from events near you.
        </p>

        <div className="mt-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white text-sm font-semibold text-emerald-900 shadow-sm transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-[#FDFBF7]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters & search
          </button>
        </div>
      </header>

      <div className="flex gap-8">
        <FilterSidebar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          condition={condition}
          onConditionChange={setCondition}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          resultCount={filtered.length}
          mobileOpen={mobileFilters}
          onMobileClose={() => setMobileFilters(false)}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-4 hidden items-center justify-between lg:flex">
            <p className="text-sm text-stone-500 dark:text-gray-400">
              Showing <span className="font-semibold text-emerald-900 dark:text-emerald-300">{filtered.length}</span> resources
            </p>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-20 text-center transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17]/60"
            >
              <PackageOpen className="h-12 w-12 text-stone-300 dark:text-emerald-800" />
              <h2 className="mt-4 font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                No resources match
              </h2>
              <p className="mt-2 max-w-sm text-sm text-stone-500 dark:text-gray-400">
                Try clearing filters or searching for a broader term like &quot;lighting&quot; or &quot;free&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setCondition("All");
                  setPriceFilter("all");
                }}
                className="mt-6 min-h-11 rounded-2xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                    linkToDetail
                    onReserve={setReserved}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {reserved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-stone-900/40 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setReserved(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-emerald-900/30 dark:bg-[#121C17]"
            >
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Reservation confirmed</p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                {reserved.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-gray-400">
                Pick up in {reserved.location} by {reserved.pickupBy}. We&apos;ve sent a mock confirmation to your profile.
              </p>
              <button
                type="button"
                onClick={() => setReserved(null)}
                className="mt-6 min-h-11 w-full rounded-2xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
