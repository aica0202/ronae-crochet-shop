import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet the Maker — Hooks by Ronae" },
      { name: "description", content: "The story behind Hooks by Ronae's handmade crochet treasures." },
      { property: "og:title", content: "About — Hooks by Ronae" },
      { property: "og:description", content: "Every stitch tells a little story." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
      <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[2.5rem] bg-lavender text-muted-foreground">
        <Camera className="h-10 w-10" />
        <p className="mt-2 text-sm">Owner photo coming soon</p>
      </div>
      <div>
        <h1 className="text-5xl leading-tight">Meet the Hands Behind Hooks by Ronae ♡</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Welcome to Hooks by Ronae, where every stitch tells a little story. What started as a love for yarn and creativity has grown into a cozy collection of handmade crochet treasures. From adorable animals to delightful fruity friends, each piece is thoughtfully crocheted with patience, care, and lots of love.
        </p>
      </div>
    </div>
  );
}
