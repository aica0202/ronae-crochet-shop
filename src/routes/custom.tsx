import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Crochet Orders — Hooks by Ronae" },
      { name: "description", content: "Request a personalized crochet plushie: name dolls, pet plushies, couple dolls, bouquets and more." },
      { property: "og:title", content: "Custom Orders — Hooks by Ronae" },
      { property: "og:description", content: "Dream it, and we'll stitch it." },
    ],
  }),
  component: Custom,
});

const ideas = [
  "Personalized Name Crochet Dolls", "Custom Pet Crochet Plushies", "Couple Crochet Dolls", "Birthday Crochet Gifts",
  "Graduation Crochet Dolls", "Mini Crochet Keychains", "Custom Color Plushies", "Crochet Flower Bouquets",
];

const fields: Array<[string, string, string?]> = [
  ["name", "Your name"], ["phone", "Contact number", "tel"], ["email", "Email address", "email"],
  ["design", "Preferred crochet design"], ["yarn", "Preferred yarn material"], ["colors", "Preferred colors"],
  ["size", "Desired size (cm)"], ["quantity", "Quantity", "number"], ["budget", "Budget range (₱)"], ["date", "Expected delivery date", "date"],
];

function Custom() {
  const [error, setError] = useState("");
  const [category, setCategory] = useState(ideas[0]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    if (!f.get("name") || !f.get("phone") || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please fill in your name, contact number and a valid email.");
      return;
    }
    setError("");
    const body = [`Category: ${category}`, ...fields.map(([k, l]) => `${l}: ${f.get(k) ?? ""}`), `Notes: ${f.get("notes") ?? ""}`].join("\n");
    window.location.href = `mailto:hello@hooksbyronae.com?subject=${encodeURIComponent("Custom crochet request")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-5xl">Customize Your Plushie ♡</h1>
      <p className="mt-4 text-muted-foreground">Price starts at ₱250 depending on size and detail — or request a quote below.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {ideas.map((i) => (
          <button key={i} type="button" onClick={() => setCategory(i)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${category === i ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{i}</button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-[2rem] bg-card p-6 shadow-soft sm:grid-cols-2">
        {fields.map(([k, l, t]) => (
          <div key={k}>
            <Label htmlFor={k}>{l}</Label>
            <Input id={k} name={k} type={t ?? "text"} className="mt-1 rounded-xl bg-background" />
          </div>
        ))}
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Additional customization instructions</Label>
          <Textarea id="notes" name="notes" rows={4} className="mt-1 rounded-xl bg-background" placeholder="Tell us about reference photos too — you can attach them in your email." />
        </div>
        <p className="rounded-2xl bg-peach p-4 text-sm sm:col-span-2">
          Custom orders are handmade especially for you. Final prices and completion times depend on the design, size, materials, and complexity.
        </p>
        {error && <p className="text-sm font-semibold text-destructive sm:col-span-2">{error}</p>}
        <Button type="submit" size="lg" className="rounded-full sm:col-span-2">Submit Custom Request</Button>
        <p className="text-center text-xs text-muted-foreground sm:col-span-2">This opens your email app with your request filled in — just hit send.</p>
      </form>
    </div>
  );
}
