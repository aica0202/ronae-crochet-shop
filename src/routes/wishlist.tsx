import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { productsQuery } from "@/lib/queries";
import { useWishlist } from "@/stores/wishlistStore";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Hooks by Ronae" },
      { name: "description", content: "The crochet friends you've saved for later." },
      { property: "og:title", content: "Wishlist — Hooks by Ronae" },
      { property: "og:description", content: "Saved handmade crochet plushies." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Wishlist,
});

function Wishlist() {
  const { data } = useSuspenseQuery(productsQuery);
  const handles = useWishlist((s) => s.handles);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const list = ready ? data.filter((p) => handles.includes(p.node.handle)) : [];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-5xl">Your Wishlist ♡</h1>
      {list.length === 0 ? (
        <p className="mt-8 rounded-3xl bg-card p-10 text-center text-muted-foreground">
          Nothing saved yet — <Link to="/shop" className="underline">find a cutie</Link>.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
