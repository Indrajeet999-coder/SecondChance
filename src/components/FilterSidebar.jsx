import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, conditions } from "../data/mockData";

const filterBtn =
  "min-h-11 rounded-2xl px-3.5 py-2 text-sm font-medium transition-colors duration-300";
const filterBtnActive = "bg-emerald-600 text-white shadow-md shadow-emerald-600/20";
const filterBtnIdle =
  "border border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:text-emerald-800 dark:border-emerald-900/30 dark:bg-[#0A100D] dark:text-gray-400 dark:hover:border-emerald-700/50 dark:hover:text-[#FDFBF7]";

export default function FilterSidebar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  condition,
  onConditionChange,
  priceFilter,
  onPriceFilterChange,
  resultCount,
  mobileOpen,
  onMobileClose,
}) {
  const panel = (
    <aside className="flex flex-col gap-6">
      <div>
        <label htmlFor="search" className="sr-only">
          Search resources
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400 dark:text-gray-500" />
          <input
            id="search"
            type="search"
            placeholder="Search surplus items..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field py-2.5 pl-10"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
          Category
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`${filterBtn} ${
                category === cat ? filterBtnActive : filterBtnIdle
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
          Condition
        </legend>
        <div className="mt-3 space-y-2">
          {conditions.map((cond) => (
            <label
              key={cond}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 transition-colors duration-300 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/20"
            >
              <input
                type="radio"
                name="condition"
                checked={condition === cond}
                onChange={() => onConditionChange(cond)}
                className="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm text-stone-700 dark:text-gray-300">{cond}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
          Price
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {[
            { value: "all", label: "All prices" },
            { value: "free", label: "Free only" },
            { value: "paid", label: "Paid items" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 transition-colors duration-300 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/20"
            >
              <input
                type="radio"
                name="price"
                checked={priceFilter === opt.value}
                onChange={() => onPriceFilterChange(opt.value)}
                className="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm text-stone-700 dark:text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 transition-colors duration-300 dark:bg-emerald-900/25 dark:text-emerald-300">
        <span className="font-semibold">{resultCount}</span> resources match your filters
      </p>
    </aside>
  );

  return (
    <>
      <div className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-stone-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17]/90">
          <div className="mb-4 flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
            <SlidersHorizontal className="h-4 w-4" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          {panel}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm dark:bg-black/60"
            onClick={onMobileClose}
            aria-label="Close filters"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-[#FDFBF7] p-6 shadow-2xl transition-colors duration-300 dark:bg-[#0A100D] dark:shadow-black/40">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                Filters
              </h2>
              <button
                type="button"
                onClick={onMobileClose}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-[#FDFBF7]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
