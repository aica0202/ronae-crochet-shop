import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Heart, Sparkles, Gift, Scissors, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { productsQuery } from "@/lib/queries";
import hero from "@/assets/hero.jpg";
import bunny from "@/assets/p-bunny.jpg";
import strawberry from "@/assets/p-strawberry.jpg";
import sakura from "@/assets/p-sakura.jpg";
import teddy from "@/assets/p-teddy.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hooks by Ronae — Little Stitches, Big Cuteness" },
      { name: "description", content: "Shop handmade crochet amigurumi animals, fruits and anime-inspired plushies, stitched with love in the Philippines." },
      { property: "og:title", content: "Hooks by Ronae — Little Stitches, Big Cuteness" },
      { property: "og:description", content: "Handmade crochet companions stitched with love, just for you." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Home,
});

const categories = [
  { name: "Adorable Animals", cat: "Animals", img: bunny, bg: "bg-blush" },
  { name: "Fruity Cuties", cat: "Fruits", img: strawberry, bg: "bg-peach" },
  { name: "Anime-Inspired Plushies", cat: "Anime-Inspired", img: sakura, bg: "bg-lavender" },
  { name: "Custom Crochet Creations", cat: null, img: teddy, bg: "bg-sage" },
];

const perks = [
  { icon: Heart, t: "100% Handmade With Love" },
  { icon: Sparkles, t: "Soft and Quality Yarn" },
  { icon: Gift, t: "Personalized Gifts" },
  { icon: Scissors, t: "Carefully Crafted Details" },
  { icon: MapPin, t: "Made in the Philippines" },
];

const yarns = [
  ["Milk Cotton", "Silky-soft and matte, holds shape well — our go-to for fruits and small animals."],
  ["Cotton", "Crisp stitch definition and durable. Great for detailed dolls."],
  ["Acrylic", "Lightweight, bright colors and budget-friendly. Perfect for minis."],
  ["Cotton-Acrylic Blend", "Soft with a gentle sheen, easy to wash."],
  ["Chenille", "Velvety and squishy — made for cuddly axolotls and dinos."],
  ["Plush", "Extra fluffy and huggable, like a little cloud."],
  ["Velvet", "Luxuriously smooth with a soft shine for special gifts."],
];

function Home() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const featured = products.slice(0, 6);
  return (
    <>
      <section className="relative overflow-hidden bg-blush/50">
        {["top-16 left-[8%]", "top-1/2 left-[45%]", "bottom-10 left-[20%]"].map((pos, i) => (
          <Heart key={i} className={`absolute ${pos} h-6 w-6 animate-floaty fill-blush text-primary/40`} style={{ animationDelay: `${i}s` }} />
        ))}
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="relative">
            <p className="mb-4 inline-block rounded-full bg-background px-4 py-1 text-sm font-semibold">Handmade with Love, One Stitch at a Time ♡</p>
            <h1 className="text-5xl leading-[1.05] md:text-7xl">
              Little Stitches, <span className="italic">Big Cuteness!</span> ♡
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Discover the cutest handmade crochet companions, stitched with love and created just for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7"><Link to="/shop">Shop Our Collection</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary bg-transparent px-7"><Link to="/custom">Customize Your Plushie</Link></Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rotate-3 rounded-[3rem] bg-lavender" />
            <img src={hero} alt="Crochet bunny, teddy bear, strawberry and doll" width={1280} height={1024} className="relative rounded-[2.5rem] shadow-soft" />
            <Sparkles className="absolute -right-3 -top-3 h-10 w-10 animate-floaty text-primary" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-4xl">Featured Cuties</h2>
          <Link to="/shop" className="font-semibold underline underline-offset-4">See all</Link>
        </div>
        {featured.length === 0 ? (
          <p className="rounded-3xl bg-card p-10 text-center text-muted-foreground">No products found</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {featured.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-4xl">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c.name} className={`${c.bg} group flex flex-col overflow-hidden rounded-3xl p-4`}>
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-4 text-xl">{c.name}</h3>
              <Button asChild size="sm" variant="secondary" className="mt-3 self-start rounded-full bg-background">
                {c.cat ? (
                  <Link to="/shop" search={{ category: c.cat }}>Explore Collection</Link>
                ) : (
                  <Link to="/custom">Explore Collection</Link>
                )}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="rounded-[2.5rem] bg-peach px-6 py-14">
          <h2 className="text-center text-4xl">Why Shop With Us?</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-5">
            {perks.map(({ icon: I, t }) => (
              <div key={t} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background"><I className="h-6 w-6" /></div>
                <p className="mt-3 text-sm font-bold">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="flex items-center gap-3"><Leaf className="h-6 w-6" /><h2 className="text-4xl">Know Your Yarn</h2></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {yarns.map(([n, d]) => (
            <div key={n} className="rounded-3xl border bg-card p-5">
              <h3 className="text-lg">{n} Yarn</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
