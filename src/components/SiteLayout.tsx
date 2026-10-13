import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Heart, Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartSync } from "@/hooks/useCartSync";

const nav = [
  { label: "Home", to: "/" as const, search: {} },
  { label: "Shop All", to: "/shop" as const, search: {} },
  { label: "Animals", to: "/shop" as const, search: { category: "Animals" } },
  { label: "Fruits", to: "/shop" as const, search: { category: "Fruits" } },
  { label: "Anime-Inspired", to: "/shop" as const, search: { category: "Anime-Inspired" } },
  { label: "Custom Orders", to: "/custom" as const, search: {} },
  { label: "About Us", to: "/about" as const, search: {} },
  { label: "Contact", to: "/contact" as const, search: {} },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <circle cx="14" cy="18" r="10" className="fill-blush stroke-primary" strokeWidth="1.5" />
        <path d="M6 15c5 2 11 2 16 0M5 20c6 2 12 2 18 0M10 9c1 6 1 12 0 18M17 8c-1 6-1 13 0 20" className="stroke-primary" strokeWidth="1" fill="none" />
        <path d="M24 4l4 2-6 12" className="stroke-primary" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className="font-display text-xl leading-none">
        Hooks <span className="italic text-muted-foreground">by</span> Ronae
      </span>
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  useCartSync();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-blush/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={n.search as never}
                activeOptions={{ exact: true, includeSearch: true }}
                activeProps={{ className: "bg-background" }}
                className="rounded-full px-3 py-1.5 text-sm font-semibold transition hover:bg-background/70"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link to="/wishlist" aria-label="Wishlist" className="rounded-full p-2 hover:bg-background/70">
              <Heart className="h-5 w-5" />
            </Link>
            <CartDrawer />
            <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-wrap gap-2 px-4 pb-4 lg:hidden">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} search={n.search as never} onClick={() => setOpen(false)} className="rounded-full bg-background/70 px-3 py-1.5 text-sm font-semibold">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="mt-24 bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">Handmade with Love, One Stitch at a Time ♡</p>
          </div>
          <div className="text-sm">
            <p className="font-bold">Explore</p>
            <div className="mt-2 flex flex-col gap-1">
              <Link to="/shop">Shop All</Link>
              <Link to="/custom">Custom Orders</Link>
              <Link to="/about">About Us</Link>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-bold">Made in the Philippines 🇵🇭</p>
            <p className="mt-2 text-muted-foreground">Every piece is crocheted by hand, so small variations make each one unique.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
