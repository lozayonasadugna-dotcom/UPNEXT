import Link from "next/link";
import { Search, ListChecks, TrendingUp } from "lucide-react";
import Hero from "@/components/Hero";
import DiscoverCarousel from "@/components/DiscoverCarousel";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import CategoryTiles from "@/components/CategoryTiles";
import LiveOpportunities from "@/components/LiveOpportunities";

const steps = [
  { icon: Search, title: "Discover", text: "Search by title, skill, country, or deadline. Every listing shows its source and when it was last checked." },
  { icon: ListChecks, title: "Prepare", text: "Save what fits. Build a checklist for your CV, portfolio, documents, and references with your own due dates." },
  { icon: TrendingUp, title: "Progress", text: "Follow the official link, apply there, then record your status. Your progress bar reflects tasks you finish." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <DiscoverCarousel />
      <Marquee />

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="cats">
        <h2 id="cats" className="text-3xl font-extrabold md:text-4xl">Eight ways to move forward</h2>
        <CategoryTiles />
      </section>

      <section id="featured" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10" aria-labelledby="featured-title">
        <LiveOpportunities title="Latest jobs from Germany" limit={6} />
        <div className="mt-5 flex justify-end">
          <Link href="/discover" className="text-sm font-semibold underline decoration-tangerine decoration-2 underline-offset-4">Explore all opportunities</Link>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14" aria-labelledby="how-h">
        <h2 id="how-h" className="text-3xl font-extrabold md:text-4xl">Discover, Prepare, Progress</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.1} className="h-full rounded-xl border border-line p-6 transition-colors duration-300 hover:border-tangerine">
                <span className="tnum text-sm font-bold text-tangerine">0{i + 1}</span>
                <s.icon className="mt-3" size={26} aria-hidden="true" />
                <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="mnm">
        <Reveal className="grid items-center gap-8 rounded-2xl bg-peach p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 id="mnm" className="text-3xl font-extrabold md:text-4xl">My Next Move keeps every step in view</h2>
            <p className="mt-3 text-muted">Track status from Interested to Offered. Add tasks, set due dates, and write notes. Everything stays linked to the original listing.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/my-next-move" className="btn btn-primary">Open My Next Move</Link>
              <Link href="/for-organizations" className="btn btn-ghost">Post an Opportunity</Link>
            </div>
          </div>
          <ul className="space-y-2 rounded-xl border border-line bg-white p-5 text-sm" aria-label="Example statuses">
            {["Interested", "Preparing", "Applied", "Interviewing", "Offered"].map((s) => (
              <li key={s} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-tangerine" aria-hidden="true" />{s}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold md:text-5xl">Your next move matters.</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">Start with one opportunity. Add three tasks. Take the first step today.</p>
          <Link href="/discover" className="btn btn-primary mt-6">Explore opportunities</Link>
        </Reveal>
      </section>
    </>
  );
}
