import type { Metadata } from "next";
import Link from "next/link";
import { Check, LifeBuoy, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Premium",
  description: "Planned UpNext Premium features, support, and how payment works.",
  alternates: { canonical: "/premium" },
};

const price = process.env.NEXT_PUBLIC_PREMIUM_PRICE;
const rawCheckout = process.env.NEXT_PUBLIC_CHECKOUT_URL;
const checkout = rawCheckout && rawCheckout.startsWith("https://") ? rawCheckout : null;
const support = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

const free = [
  "Search and filter every listing",
  "Save opportunities",
  "My Next Move with tasks, notes, and status, stored in your browser",
];

const premium = [
  "Priority support",
  "Deadline reminders by email",
  "My Next Move synced across your devices",
  "Application checklist templates",
  "CV and cover-letter templates",
  "Interview preparation guides",
  "Weekly hand-picked opportunity digest",
  "Early view of newly verified listings",
];

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold md:text-5xl">UpNext Premium</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">More support and practical application tools for people who apply seriously. Premium is not on sale yet; every benefit below is planned and is not currently available.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-6" aria-labelledby="free-h">
          <h2 id="free-h" className="text-2xl font-bold">Free</h2>
          <p className="mt-1 text-muted">Available now</p>
          <ul className="mt-5 space-y-3 text-sm">
            {free.map((f) => (<li key={f} className="flex gap-2"><Check size={18} className="shrink-0" aria-hidden="true" />{f}</li>))}
          </ul>
          <Link href="/discover" className="btn btn-ghost mt-6">Start free</Link>
        </section>

        <section className="rounded-2xl border-2 border-tangerine bg-peach p-6" aria-labelledby="prem-h">
          <h2 id="prem-h" className="text-2xl font-bold">Premium</h2>
          <p className="tnum mt-1 text-xl font-bold">{price || "Price coming soon"}</p>
          <ul className="mt-5 space-y-3 text-sm">
            {premium.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={18} className="shrink-0" aria-hidden="true" />
                <span>{f} <span className="badge ml-1">Planned</span></span>
              </li>
            ))}
          </ul>
          {checkout ? (
            <Link href="/profile#premium-payment" className="btn btn-primary mt-6">Choose Premium</Link>
          ) : (
            <Link href="/profile#premium-payment" className="btn btn-ghost mt-6">Go to your profile</Link>
          )}
          <p className="mt-3 text-xs text-muted">When available, Subscribe will open a secure checkout page. UpNext does not collect or store payment details.</p>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-line p-6" aria-labelledby="pay-h">
        <h2 id="pay-h" className="flex items-center gap-2 text-2xl font-bold"><ShieldCheck size={22} aria-hidden="true" /> How payment works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
          <li>Select Subscribe. A secure payment page from the payment provider opens.</li>
          <li>Pay with a method the provider offers, such as mobile money, bank, or card.</li>
          <li>The provider handles your payment details. UpNext does not store card numbers.</li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border border-line p-6" aria-labelledby="sup-h">
        <h2 id="sup-h" className="flex items-center gap-2 text-2xl font-bold"><LifeBuoy size={22} aria-hidden="true" /> Support</h2>
        <p className="mt-2 text-muted">
          {support ? (<>Write to <a className="font-semibold underline" href={"mailto:" + support}>{support}</a>. Premium members get priority replies once Premium is live.</>) : "A support contact will appear here once it is set."}
        </p>
      </section>
    </div>
  );
}
