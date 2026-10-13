import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hooks by Ronae" },
      { name: "description", content: "Get in touch with Hooks by Ronae for orders, questions and custom requests." },
      { property: "og:title", content: "Contact — Hooks by Ronae" },
      { property: "og:description", content: "Say hello — we'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Mail, t: "Email", d: "hello@hooksbyronae.com" },
    { icon: MapPin, t: "Based in", d: "The Philippines — shipping nationwide" },
    { icon: Clock, t: "Replies", d: "Within 1–2 days" },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-5xl">Say Hello ♡</h1>
      <p className="mt-4 text-muted-foreground">Questions about an order or a custom idea? We'd love to hear from you.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl bg-card p-6 shadow-soft">
            <I className="mx-auto h-6 w-6" />
            <p className="mt-3 font-bold">{t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
