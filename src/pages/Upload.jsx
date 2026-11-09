import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload as UploadIcon,
  ImagePlus,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { uploadCategories, uploadConditions } from "../data/mockData";

const STEPS = ["Photos", "Details", "Review"];

const initialForm = (category, condition) => ({
  title: "",
  category,
  condition,
  description: "",
  location: "",
  isFree: true,
  price: "",
});

export default function Upload() {
  const [step, setStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: uploadCategories[0],
    condition: uploadConditions[0],
    description: "",
    location: "",
    isFree: true,
    price: "",
  });

  const addFiles = useCallback((fileList) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!incoming.length) return;

    setFiles((prev) => [...prev, ...incoming].slice(0, 6));
    incoming.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target.result].slice(0, 6));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const canContinue =
    step === 0
      ? previews.length > 0
      : step === 1
        ? form.title.trim().length >= 4 && form.location.trim().length >= 2
        : true;

  const resetForm = () => {
    setStep(0);
    setFiles([]);
    setPreviews([]);
    setForm(initialForm(uploadCategories[0], uploadConditions[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageTransition className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 shadow-lg shadow-emerald-600/20 dark:bg-emerald-900/40"
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-8 font-serif text-2xl font-semibold leading-snug text-emerald-900 dark:text-[#FDFBF7] sm:text-3xl"
        >
          Success! Your resource has been listed in the marketplace.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/explore"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            View marketplace
          </Link>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-stone-200 px-6 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-50"
          >
            List another item
          </button>
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Share surplus
        </p>
        <h1 className="font-serif text-3xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7] sm:text-4xl">
          Upload a resource
        </h1>
        <p className="mt-2 text-stone-600 dark:text-gray-400">
          List decorations, props, furniture, or food from your latest event.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-lg shadow-emerald-900/5 transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17] dark:shadow-black/30 sm:p-8"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-emerald-900 dark:text-[#FDFBF7]">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-stone-500 dark:text-gray-400">{STEPS[step]}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-emerald-900/30">
            <motion.div
              className="h-full rounded-full bg-emerald-600"
              initial={false}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <div className="mt-4 flex justify-between gap-2">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`flex-1 text-center text-xs font-medium ${
                  i <= step ? "text-emerald-700 dark:text-emerald-400" : "text-stone-400 dark:text-gray-500"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <label
                htmlFor="file-upload"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors duration-300 ${
                  dragOver
                    ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-900/40"
                    : "border-stone-300 bg-[#FDFBF7] hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-[#0A100D] dark:hover:border-emerald-600 dark:hover:bg-emerald-900/20"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <UploadIcon className="h-7 w-7" />
                </span>
                <p className="mt-4 text-center font-semibold text-emerald-900 dark:text-[#FDFBF7]">
                  Drag & drop photos here
                </p>
                <p className="mt-1 text-center text-sm text-stone-500 dark:text-gray-400">
                  or click to browse · PNG, JPG up to 6 images
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </label>

              {previews.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {previews.map((src, index) => (
                    <div key={src} className="group relative aspect-square overflow-hidden rounded-2xl">
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex min-h-9 min-w-9 items-center justify-center rounded-xl bg-stone-900/70 text-white opacity-0 transition group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {previews.length < 6 && (
                    <label
                      htmlFor="file-upload-more"
                      className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 text-stone-400 hover:border-emerald-400 hover:text-emerald-600"
                    >
                      <ImagePlus className="h-6 w-6" />
                      <span className="mt-1 text-xs">Add</span>
                      <input
                        id="file-upload-more"
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={(e) => addFiles(e.target.files)}
                      />
                    </label>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="title" className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 50m White Silk Draping from Wedding"
                  className="input-field mt-2"
                />
              </div>

              <div>
                <label htmlFor="category" className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Category
                </label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input-field mt-2"
                >
                  {uploadCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Condition</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {uploadConditions.map((cond) => (
                    <label
                      key={cond}
                      className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        form.condition === cond
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : "border-stone-200 text-stone-600 hover:border-emerald-200 dark:border-emerald-900/30 dark:bg-[#0A100D] dark:text-gray-400 dark:hover:border-emerald-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={form.condition === cond}
                        onChange={() => setForm({ ...form, condition: cond })}
                        className="sr-only"
                      />
                      {cond}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="location" className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Pickup location
                </label>
                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="City, State"
                  className="input-field mt-2"
                />
              </div>

              <div>
                <label htmlFor="description" className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the item, event origin, and pickup notes..."
                  className="textarea-field mt-2"
                />
              </div>

              <fieldset>
                <legend className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Pricing</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  <label
                    className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium ${
                      form.isFree
                        ? "border-orange-500 bg-orange-50 text-orange-900"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={form.isFree}
                      onChange={() => setForm({ ...form, isFree: true })}
                      className="sr-only"
                    />
                    Free
                  </label>
                  <label
                    className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium ${
                      !form.isFree
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={!form.isFree}
                      onChange={() => setForm({ ...form, isFree: false })}
                      className="sr-only"
                    />
                    Set price
                  </label>
                  {!form.isFree && (
                    <input
                      type="number"
                      min="1"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="$"
                      className="input-field min-h-11 w-28 px-3"
                    />
                  )}
                </div>
              </fieldset>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-5"
            >
              <div className="flex gap-4 overflow-x-auto pb-2">
                {previews.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                  />
                ))}
              </div>
              <dl className="space-y-3 rounded-2xl bg-[#FDFBF7] p-5 text-sm transition-colors duration-300 dark:bg-[#0A100D]">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-gray-400">Title</dt>
                  <dd className="text-right font-medium text-stone-900 dark:text-[#FDFBF7]">{form.title}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Category</dt>
                  <dd className="font-medium text-stone-900">{form.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Condition</dt>
                  <dd className="font-medium text-stone-900">{form.condition}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Location</dt>
                  <dd className="font-medium text-stone-900">{form.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Price</dt>
                  <dd className="font-medium text-emerald-700">
                    {form.isFree ? "Free" : `$${form.price || "0"}`}
                  </dd>
                </div>
              </dl>
              {form.description && (
                <p className="text-sm leading-relaxed text-stone-600">{form.description}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-2xl border border-stone-200 text-sm font-semibold text-emerald-900 transition-colors duration-300 hover:bg-emerald-50 dark:border-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/30 sm:flex-none sm:px-6"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-2xl bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700"
            >
              Submit Listing
            </button>
          )}
        </div>
      </form>
    </PageTransition>
  );
}
