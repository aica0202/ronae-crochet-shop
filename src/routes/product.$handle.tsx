import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Heart, Loader2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { productQuery } from "@/lib/queries";
import { peso, yarnOf } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/stores/wishlistStore";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(productQuery(params.handle));
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Hooks by Ronae" }, { name: "robots", content: "noindex" }] };
    const n = loaderData.node;
    const img = n.images.edges[0]?.node.url;
    return {
      meta: [
        { title: `${n.title} — Hooks by Ronae` },
        { name: "description", content: n.description.slice(0, 155) },
        { property: "og:title", content: `${n.title} — Hooks by Ronae` },
        { property: "og:description", content: n.description.slice(0, 155) },
        { property: "og:type", content: "product" },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl">This little friend wandered off</h1>
      <Link to="/shop" className="mt-4 inline-block underline">Back to shop</Link>
    </div>
  );
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { data } = useSuspenseQuery(productQuery(handle));
  const product = data!;
  const p = product.node;
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const { handles, toggle } = useWishlist();
  const variant = p.variants.edges[variantIdx]?.node;
  const images = p.images.edges;

  const add = async () => {
    if (!variant) return;
    await addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: qty, selectedOptions: variant.selectedOptions });
    toast.success(`${p.title} added to your basket ♡`, { position: "top-center" });
  };
  const orderNow = async () => {
    await add();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <div className="aspect-square overflow-hidden rounded-[2rem] bg-card shadow-soft">
          {images[imgIdx] && <img src={images[imgIdx].node.url} alt={images[imgIdx].node.altText ?? p.title} className="h-full w-full object-cover" />}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {images.map((im, i) => (
              <button key={im.node.url} onClick={() => setImgIdx(i)} className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${i === imgIdx ? "border-primary" : "border-transparent"}`}>
                <img src={im.node.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold">{p.productType}</span>
        <h1 className="mt-4 text-5xl">{p.title}</h1>
        <p className="mt-3 text-3xl font-bold">{variant ? peso(variant.price.amount) : ""}</p>
        <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 rounded-3xl bg-card p-5 text-sm">
          <dt className="font-bold">Yarn type</dt><dd>{yarnOf(product)}</dd>
          <dt className="font-bold">Availability</dt><dd>{variant?.availableForSale ? "In stock" : "Sold out"}</dd>
          <dt className="font-bold">Handmade</dt><dd>Made to order in the Philippines</dd>
        </dl>
        {p.variants.edges.length > 1 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-bold">Color</p>
            <div className="flex flex-wrap gap-2">
              {p.variants.edges.map((v, i) => (
                <button key={v.node.id} onClick={() => setVariantIdx(i)} className={`rounded-full border px-4 py-1.5 text-sm ${i === variantIdx ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
                  {v.node.title}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border bg-card px-2 py-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></Button>
            <span className="w-6 text-center">{qty}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></Button>
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-full" onClick={() => toggle(p.handle)} aria-label="Wishlist">
            <Heart className={`h-5 w-5 ${handles.includes(p.handle) ? "fill-primary text-primary" : ""}`} />
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button size="lg" className="rounded-full px-8" onClick={add} disabled={isLoading || !variant?.availableForSale}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
          </Button>
          <Button size="lg" variant="secondary" className="rounded-full px-8" onClick={orderNow} disabled={isLoading || !variant?.availableForSale}>Order Now</Button>
        </div>
      </div>
    </div>
  );
}
