import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { productsQuery } from "@/lib/queries";
import { colorsOf, yarnOf } from "@/lib/shopify";

type ShopSearch = { category?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    category: typeof s["category"] === "string" ? s["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Crochet Plushies — Hooks by Ronae" },
      { name: "description", content: "Browse handmade amigurumi animals, fruits and anime-inspired plushies. Filter by yarn, color and price." },
      { property: "og:title", content: "Shop — Hooks by Ronae" },
      { property: "og:description", content: "Find your new handmade crochet companion." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Shop,
});

const cats = ["Animals", "Fruits", "Anime-Inspired"];

function Shop() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { category } = Route.useSearch();
  const [q, setQ] = useState("");
  const [yarn, setYarn] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("newest");

  const yarnList = [...new Set(products.map(yarnOf))];
  const colorList = [...new Set(products.flatMap(colorsOf))];

  const list = useMemo(() => {
    const r = products.filter((p) => {
      const n = p.node;
      return (
        (!category || n.productType === category) &&
        (!q || n.title.toLowerCase().includes(q.toLowerCase())) &&
        (!yarn || yarnOf(p) === yarn) &&
        (!color || colorsOf(p).includes(color)) &&
        Number(n.priceRange.minVariantPrice.amount) <= maxPrice
      );
    });
    const price = (p: (typeof r)[number]) => Number(p.node.priceRange.minVariantPrice.amount);
    if (sort === "low") r.sort((a, b) => price(a) - price(b));
    else if (sort === "high") r.sort((a, b) => price(b) - price(a));
    else if (sort === "popular") r.sort((a, b) => Number(b.node.tags.includes("featured")) - Number(a.node.tags.includes("featured")));
    else r.sort((a, b) => b.node.createdAt.localeCompare(a.node.createdAt));
    return r;
  }, [products, category, q, yarn, color, maxPrice, sort]);

  const select = "h-10 rounded-full border bg-card px-4 text-sm";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-5xl">{category ?? "Shop All"}</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/shop" search={{}} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${!category ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>All</Link>
        {cats.map((c) => (
          <Link key={c} to="/shop" search={{ category: c }} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{c}</Link>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search plushies…" className="rounded-full bg-card pl-9" />
        </div>
        <select className={select} value={yarn} onChange={(e) => setYarn(e.target.value)}>
          <option value="">All yarns</option>
          {yarnList.map((y) => <option key={y}>{y}</option>)}
        </select>
        <select className={select} value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">All colors</option>
          {colorList.map((c) => <option key={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm">
          Up to ₱{maxPrice}
          <input type="range" min={100} max={1000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="accent-primary" />
        </label>
        <select className={select} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
      {list.length === 0 ? (
        <p className="mt-10 rounded-3xl bg-card p-10 text-center text-muted-foreground">No products found</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
