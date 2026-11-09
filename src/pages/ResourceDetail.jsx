import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  ChevronRight,
  Leaf,
  MapPin,
  Package,
  Star,
  Droplets,
  Wind,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { getResourceById, getResourceGallery } from "../utils/resourceGallery";

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = getResourceById(id);
  const [activeImage, setActiveImage] = useState(0);
  const [reserved, setReserved] = useState(false);

  if (!resource) {
    return (
      <PageTransition className="mx-auto max-w-lg px-4 py-24 text-center">
        <Package className="mx-auto h-12 w-12 text-stone-300 dark:text-emerald-800" />
        <h1 className="mt-4 font-serif text-2xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
          Resource not found
        </h1>
        <p className="mt-2 text-stone-600 dark:text-gray-400">
          This listing may have been claimed or removed.
        </p>
        <Link
          to="/explore"
          className="mt-6 inline-flex min-h-11 items-center rounded-2xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Back to marketplace
        </Link>
      </PageTransition>
    );
  }

  const gallery = getResourceGallery(resource);
  const priceLabel = resource.isFree ? "Free" : `$${resource.price}`;

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-2xl px-3 text-sm font-medium text-stone-600 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-900 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-[#FDFBF7]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-lg shadow-emerald-900/5 transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17] dark:shadow-black/30">
            <AnimatePresence mode="wait">
              <motion.img
                key={gallery[activeImage]}
                src={gallery[activeImage]}
                alt={resource.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="aspect-[4/3] w-full object-cover lg:aspect-square"
              />
            </AnimatePresence>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.slice(1).map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(index + 1)}
                className={`overflow-hidden rounded-2xl border-2 transition-all ${
                  activeImage === index + 1
                    ? "border-emerald-600 shadow-md shadow-emerald-600/20"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`${resource.title} view ${index + 2}`}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <nav className="flex flex-wrap items-center gap-1 text-sm text-stone-500 dark:text-gray-400">
            <Link to="/" className="transition-colors duration-300 hover:text-emerald-700 dark:hover:text-emerald-400">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/explore" className="transition-colors duration-300 hover:text-emerald-700 dark:hover:text-emerald-400">
              Explore
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-emerald-900 dark:text-emerald-300">{resource.category}</span>
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              {resource.condition}
            </span>
            <span
              className={`rounded-xl px-3 py-1 text-xs font-semibold ${
                resource.isFree
                  ? "bg-orange-500 text-white"
                  : "bg-stone-100 text-stone-700 dark:bg-[#0A100D] dark:text-gray-300"
              }`}
            >
              {priceLabel}
            </span>
            <span className="text-xs text-stone-500 dark:text-gray-400">{resource.eventType}</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-4xl">
            {resource.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {resource.location} · {resource.distance}
            </span>
            <span className="flex items-center gap-1.5">
              <Package className="h-4 w-4 text-emerald-600" />
              {resource.quantity}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-emerald-600" />
              Pick up by {resource.pickupBy}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-stone-700 dark:text-gray-300">{resource.description}</p>

          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-gray-400">
            Originally used for a {resource.eventType.toLowerCase()}. This surplus is
            ready for immediate pickup — professionally stored and listed by a verified
            event partner. Perfect for planners, venues, or community hosts looking to
            reduce waste without sacrificing quality.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Leaf, label: "Waste saved", value: `${resource.ecoImpact.wasteKg} kg` },
              { icon: Wind, label: "CO₂ avoided", value: `${resource.ecoImpact.co2Kg} kg` },
              {
                icon: Droplets,
                label: "Water saved",
                value: resource.ecoImpact.waterLiters
                  ? `${resource.ecoImpact.waterLiters} L`
                  : "—",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-center transition-colors duration-300 dark:border-emerald-900/30 dark:bg-emerald-900/20"
              >
                <Icon className="mx-auto h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="mt-1 text-xs text-stone-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17]">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-gray-400">
              Listed by
            </p>
            <div className="mt-3 flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(resource.seller.name)}`}
                alt=""
                className="h-14 w-14 rounded-2xl border border-stone-200 bg-emerald-50 object-cover dark:border-emerald-900/30 dark:bg-emerald-900/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-stone-900 dark:text-[#FDFBF7]">{resource.seller.name}</p>
                  {resource.seller.verified && (
                    <BadgeCheck className="h-4 w-4 text-emerald-600" aria-label="Verified" />
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-sm text-stone-500 dark:text-gray-400">
                  <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                  <span>{resource.seller.rating} seller rating</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setReserved(true)}
            className="mt-8 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-600/30 transition-colors hover:bg-emerald-700"
          >
            Reserve Resource
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {reserved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm"
            onClick={() => setReserved(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-emerald-900/30 dark:bg-[#121C17]"
            >
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">You&apos;re all set</p>
              <h2 className="mt-1 font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                Reservation confirmed
              </h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-gray-400">
                {resource.title} is held for you. Pick up in {resource.location} before{" "}
                {resource.pickupBy}.
              </p>
              <button
                type="button"
                onClick={() => setReserved(false)}
                className="mt-6 min-h-11 w-full rounded-2xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
