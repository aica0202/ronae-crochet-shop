import { Link } from "@tanstack/react-router";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/stores/wishlistStore";
import { colorsOf, isAvailable, peso, yarnOf, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const { handles, toggle } = useWishlist();
  const p = product.node;
  const variant = p.variants.edges[0]?.node;
  const img = p.images.edges[0]?.node;
  const loved = handles.includes(p.handle);
  const available = isAvailable(product);

  const add = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    toast.success(`${p.title} added to your basket ♡`, { position: "top-center" });
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1">
      <button
        onClick={() => toggle(p.handle)}
        aria-label={loved ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 backdrop-blur"
      >
        <Heart className={`h-4 w-4 ${loved ? "fill-primary text-primary" : "text-primary"}`} />
      </button>
      <Link to="/product/$handle" params={{ handle: p.handle }} className="block aspect-square overflow-hidden bg-muted">
        {img && (
          <img src={img.url} alt={img.altText ?? p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        )}
      </Link>
      <div className="space-y-2 p-4">
        <span className="inline-block rounded-full bg-lavender px-2.5 py-0.5 text-[11px] font-semibold">{yarnOf(product)}</span>
        <Link to="/product/$handle" params={{ handle: p.handle }}>
          <h3 className="text-lg leading-tight">{p.title}</h3>
        </Link>
        {colorsOf(product).length > 0 && (
          <p className="text-xs text-muted-foreground">Colors: {colorsOf(product).join(", ")}</p>
        )}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-lg font-bold">{peso(p.priceRange.minVariantPrice.amount)}</p>
            <p className={`text-[11px] font-semibold ${available ? "text-muted-foreground" : "text-destructive"}`}>
              {available ? "In stock" : "Sold out"}
            </p>
          </div>
          <Button size="sm" className="rounded-full" onClick={add} disabled={isLoading || !variant || !available}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
