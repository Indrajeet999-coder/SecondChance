import { Link } from "react-router-dom";
import { Leaf, Share2, Globe, Mail } from "lucide-react";

const footerLinks = {
  Marketplace: [
    { label: "Explore", to: "/explore" },
    { label: "Upload surplus", to: "/upload" },
    { label: "My profile", to: "/profile" },
  ],
  Company: [
    { label: "Our impact", to: "/#impact" },
    { label: "For venues", to: "/" },
    { label: "Contact", to: "/" },
  ],
  Legal: [
    { label: "Terms", to: "/" },
    { label: "Privacy", to: "/" },
    { label: "Safety", to: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/10 bg-white/40 transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17]/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl font-semibold text-emerald-900 transition-colors duration-300 dark:text-[#FDFBF7]">
                SecondChance
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-gray-400">
              The premium marketplace for surplus event resources. Every reservation
              keeps decor, props, and food out of landfills.
            </p>
            <div className="mt-6 flex gap-3">
              {[Share2, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-500 transition-colors duration-300 hover:border-emerald-200 hover:text-emerald-700 dark:border-emerald-900/30 dark:bg-[#0A100D] dark:text-gray-400 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-stone-600 transition-colors duration-300 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-200/80 pt-8 transition-colors duration-300 dark:border-emerald-900/30 sm:flex-row">
          <p className="text-sm text-stone-500 dark:text-gray-400">
            © {new Date().getFullYear()} SecondChance. Built for a circular event economy.
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            
          </p>
        </div>
        </div>
    </footer>
  );
}
