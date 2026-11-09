import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bookmark,
  LayoutGrid,
  Settings,
  Leaf,
  Award,
  Recycle,
  Pencil,
  Bell,
  Shield,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import ResourceCard from "../components/ResourceCard";
import { currentUser, resources } from "../data/mockData";

const TABS = [
  { id: "listings", label: "My Listings", icon: LayoutGrid },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("saved");
  const [settings, setSettings] = useState({
    name: currentUser.name,
    email: currentUser.email,
    emailAlerts: true,
    pickupReminders: true,
    publicProfile: false,
  });
  const [saved, setSaved] = useState(false);

  const savedResources = resources.filter((r) =>
    currentUser.savedResourceIds.includes(r.id),
  );
  const myListings = resources.filter((r) =>
    currentUser.listingIds.includes(r.id),
  );

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="lg:w-56 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:text-emerald-800 dark:border-emerald-900/30 dark:bg-[#121C17] dark:text-gray-400 dark:hover:border-emerald-700 dark:hover:text-[#FDFBF7]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17] sm:p-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-20 w-20 rounded-2xl border-2 border-emerald-100 object-cover shadow-md"
              />
              <div>
                <h1 className="font-serif text-2xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-3xl">
                  {currentUser.name}
                </h1>
                <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
                  {currentUser.location} · Member since {currentUser.memberSince}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-gray-400">
                  {currentUser.bio}
                </p>
              </div>
              <Link
                to="/upload"
                className="sm:ml-auto inline-flex min-h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700"
              >
                <Pencil className="h-4 w-4" />
                New listing
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Recycle,
                label: "Items rescued",
                value: currentUser.stats.itemsRescued,
                accent: "emerald",
              },
              {
                icon: Leaf,
                label: "Waste diverted",
                value: `${currentUser.stats.wasteDivertedKg}kg`,
                accent: "orange",
              },
              {
                icon: Award,
                label: "Community rank",
                value: currentUser.stats.communityRank,
                accent: "emerald",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-5 shadow-sm transition-colors duration-300 ${
                  stat.accent === "orange"
                    ? "border-orange-100 bg-gradient-to-br from-orange-50 to-white dark:border-orange-900/30 dark:from-orange-950/40 dark:to-[#121C17]"
                    : "border-emerald-100 bg-gradient-to-br from-emerald-50 to-white dark:border-emerald-900/30 dark:from-emerald-950/40 dark:to-[#121C17]"
                }`}
              >
                <stat.icon
                  className={`h-5 w-5 ${
                    stat.accent === "orange" ? "text-orange-500" : "text-emerald-600"
                  }`}
                />
                <p className="mt-3 font-serif text-2xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {activeTab === "saved" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10"
            >
              <h2 className="font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                Saved resources
              </h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
                {savedResources.length} items you&apos;re watching for pickup
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                {savedResources.map((resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                    linkToDetail
                  />
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === "listings" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10"
            >
              <h2 className="font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                My listings
              </h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
                {myListings.length} active surplus listings
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {myListings.map((resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                    linkToDetail
                  />
                ))}
              </div>
              <Link
                to="/upload"
                className="mt-6 inline-flex min-h-11 items-center rounded-2xl border-2 border-dashed border-emerald-300 px-6 py-2.5 text-sm font-semibold text-emerald-800 transition-colors duration-300 hover:bg-emerald-50 dark:border-emerald-700/50 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
              >
                + Upload another resource
              </Link>
            </motion.section>
          )}

          {activeTab === "settings" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10"
            >
              <h2 className="font-serif text-xl font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                Account settings
              </h2>
              <form
                onSubmit={handleSaveSettings}
                className="mt-6 max-w-xl space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17]"
              >
                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                    Display name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="input-field mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="input-field mt-2"
                  />
                </div>

                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </legend>
                  {[
                    { key: "emailAlerts", label: "Email alerts for new matches" },
                    { key: "pickupReminders", label: "Pickup deadline reminders" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex min-h-11 cursor-pointer items-center justify-between rounded-2xl border border-stone-100 bg-[#FDFBF7] px-4 transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#0A100D]"
                    >
                      <span className="text-sm text-stone-700 dark:text-gray-300">{label}</span>
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) =>
                          setSettings({ ...settings, [key]: e.target.checked })
                        }
                        className="h-5 w-5 rounded accent-emerald-600"
                      />
                    </label>
                  ))}
                </fieldset>

                <label className="flex min-h-11 cursor-pointer items-center justify-between rounded-2xl border border-stone-100 bg-[#FDFBF7] px-4 transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#0A100D]">
                  <span className="flex items-center gap-2 text-sm text-stone-700 dark:text-gray-300">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    Public profile
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.publicProfile}
                    onChange={(e) =>
                      setSettings({ ...settings, publicProfile: e.target.checked })
                    }
                    className="h-5 w-5 rounded accent-emerald-600"
                  />
                </label>

                <button
                  type="submit"
                  className="min-h-11 w-full rounded-2xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {saved ? "Settings saved" : "Save changes"}
                </button>
              </form>
            </motion.section>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
