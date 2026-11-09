import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Leaf, BadgeCheck } from "lucide-react";

export default function ResourceCard({
  resource,
  onReserve,
  index = 0,
  linkToDetail = false,
}) {
  const priceLabel = resource.isFree ? "Free" : `$${resource.price}`;
  const detailPath = `/resource/${resource.id}`;

  const imageBlock = (
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={resource.image}
        alt={resource.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span
        className={`absolute left-3 top-3 rounded-xl px-3 py-1 text-xs font-semibold shadow-sm ${
          resource.isFree
            ? "bg-orange-500 text-white"
            : "bg-white/90 text-emerald-900 backdrop-blur-sm dark:bg-[#121C17]/90 dark:text-emerald-200"
        }`}
      >
        {priceLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-xl bg-emerald-600/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {resource.condition}
      </span>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm shadow-stone-900/5 transition-colors duration-300 hover:shadow-lg hover:shadow-emerald-900/10 dark:border-emerald-900/30 dark:bg-[#121C17] dark:shadow-black/20 dark:hover:shadow-emerald-900/20"
    >
      {linkToDetail ? (
        <Link to={detailPath} className="block">
          {imageBlock}
        </Link>
      ) : (
        imageBlock
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {resource.category}
        </p>
        {linkToDetail ? (
          <Link to={detailPath}>
            <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-stone-900 transition-colors duration-300 hover:text-emerald-800 dark:text-[#FDFBF7] dark:hover:text-emerald-300">
              {resource.title}
            </h3>
          </Link>
        ) : (
          <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-stone-900 dark:text-[#FDFBF7]">
            {resource.title}
          </h3>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-sm text-stone-500 dark:text-gray-400">
          <MapPin className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            {resource.location} · {resource.distance}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-500 dark:text-gray-400">
          {resource.seller.verified && (
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          )}
          <span>{resource.seller.name}</span>
          <span className="text-stone-300 dark:text-emerald-900/50">·</span>
          <span className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
            <Leaf className="h-3 w-3" />
            {resource.ecoImpact.wasteKg}kg saved
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          {linkToDetail && (
            <Link
              to={detailPath}
              className="flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-emerald-200 text-sm font-semibold text-emerald-800 transition-colors duration-300 hover:bg-emerald-50 dark:border-emerald-800/50 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
            >
              View
            </Link>
          )}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onReserve?.(resource)}
            className={`flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 transition-colors duration-300 hover:bg-emerald-700 ${
              linkToDetail ? "flex-1" : "w-full"
            }`}
          >
            Reserve
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
