"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, SearchX, FlaskConical, Radio } from "lucide-react";
import { opportunities } from "@/lib/data";
import { CATEGORIES, type Category } from "@/lib/types";
import { daysLeft, isClosed } from "@/lib/format";
import OpportunityCard from "./OpportunityCard";
import LiveOpportunities from "./LiveOpportunities";

const PAGE = 6;
const countries = Array.from(new Set(opportunities.map((o) => o.country))).sort();

export default function DiscoverClient() {
  const params = useSearchParams();
  const initialCat = params.get("category");
  const [q, setQ] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<Category | "All">(CATEGORIES.includes(initialCat as Category) ? (initialCat as Category) : "All");
  const [country, setCountry] = useState("All");
  const [mode, setMode] = useState("All");
  const [deadline, setDeadline] = useState("any");
  const [sort, setSort] = useState("relevance");
  const [shown, setShown] = useState(PAGE);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const score = (o: (typeof opportunities)[number]) => {
      if (!term) return 0;
      let s = 0;
      if (o.title.toLowerCase().includes(term)) s += 3;
      if (o.org.toLowerCase().includes(term)) s += 2;
      if (o.skills.some((k) => k.toLowerCase().includes(term))) s += 2;
      if (o.description.toLowerCase().includes(term)) s += 1;
      return s;
    };
    let r = opportunities.filter((o) => {
      if (term && score(o) === 0) return false;
      if (category !== "All" && o.category !== category) return false;
      if (country !== "All" && o.country !== country) return false;
      if (mode !== "All" && o.mode !== mode) return false;
      const d = daysLeft(o.deadline);
      if (deadline === "open" && isClosed(o)) return false;
      if (deadline === "7" && (d === null || d < 0 || d > 7)) return false;
      if (deadline === "30" && (d === null || d < 0 || d > 30)) return false;
      return true;
    });
    r = [...r].sort((a, b) => {
      if (sort === "newest") return b.postedAt.localeCompare(a.postedAt);
      if (sort === "closing") {
        const da = isClosed(a) ? Infinity : (daysLeft(a.deadline) ?? Infinity - 1);
        const db = isClosed(b) ? Infinity : (daysLeft(b.deadline) ?? Infinity - 1);
        return da - db;
      }
      return score(b) - score(a);
    });
    return r;
  }, [q, category, country, mode, deadline, sort]);

  function reset() {
    setQ(""); setCategory("All"); setCountry("All"); setMode("All"); setDeadline("any"); setSort("relevance"); setShown(PAGE);
  }
  const touch = <T,>(set: (v: T) => void) => (v: T) => { set(v); setShown(PAGE); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-extrabold md:text-5xl">Discover opportunities</h1>
      <p className="mt-2 text-muted">Search, filter, and save. Each listing links to its official source.</p>
      <div className="mt-4 grid gap-3 rounded-xl border border-line bg-white p-4 text-sm sm:grid-cols-2">
        <p className="flex items-start gap-2 text-muted"><Radio size={16} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" /><span><strong className="text-ink">Live feed:</strong> current jobs from Arbeitnow’s Germany job board, refreshed periodically.</span></p>
        <p className="flex items-start gap-2 text-muted"><FlaskConical size={16} className="mt-0.5 shrink-0 text-amber-800" aria-hidden="true" /><span><strong className="text-ink">Demo examples:</strong> fictional listings from Ethiopia and other countries, labeled on each card. Do not apply to demo examples.</span></p>
      </div>

      <div className="relative mt-6">
        <label htmlFor="q" className="sr-only">Search by title, organization, skill, or keyword</label>
        <Search className="pointer-events-none absolute left-3 top-3.5" size={18} aria-hidden="true" />
        <input id="q" type="search" value={q} onChange={(e) => touch(setQ)(e.target.value)} placeholder="Search title, organization, or skill" className="field pl-10" />
      </div>

      <div role="group" aria-label="Category" className="mt-4 flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => touch(setCategory)(c)} className="relative min-h-11 rounded-lg border border-line px-4 text-sm font-semibold">
            {category === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-lg bg-tangerine" transition={{ duration: 0.25 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        <label className="text-sm font-medium">Country
          <select className="field mt-1" value={country} onChange={(e) => touch(setCountry)(e.target.value)}>
            <option>All</option>{countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Work mode
          <select className="field mt-1" value={mode} onChange={(e) => touch(setMode)(e.target.value)}>
            <option>All</option><option>Remote</option><option>Hybrid</option><option>On-site</option>
          </select>
        </label>
        <label className="text-sm font-medium">Deadline
          <select className="field mt-1" value={deadline} onChange={(e) => touch(setDeadline)(e.target.value)}>
            <option value="any">Any</option><option value="open">Still open</option><option value="7">Within 7 days</option><option value="30">Within 30 days</option>
          </select>
        </label>
        <label className="text-sm font-medium">Sort by
          <select className="field mt-1" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Relevance</option><option value="newest">Newest</option><option value="closing">Closing soon</option>
          </select>
        </label>
        <div className="flex items-end"><button type="button" onClick={reset} className="btn btn-ghost w-full">Reset filters</button></div>
      </div>

      <p role="status" aria-live="polite" className="tnum mt-6 text-sm font-semibold">{results.length} {results.length === 1 ? "result" : "results"}</p>

      {results.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-line bg-peach px-6 py-14 text-center">
          <SearchX size={32} aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-bold">No matches yet</h2>
          <p className="mt-1 max-w-sm text-muted">Try fewer filters or a different keyword.</p>
          <button type="button" onClick={reset} className="btn btn-primary mt-5">Reset filters</button>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.slice(0, shown).map((o) => (<OpportunityCard key={o.slug} o={o} />))}
            </AnimatePresence>
          </div>
          {results.length > shown && (
            <div className="mt-8 text-center"><button type="button" className="btn btn-ghost" onClick={() => setShown(shown + PAGE)}>Show more</button></div>
          )}
        </>
      )}

      <section className="mt-14 border-t border-line pt-10" aria-label="Live remote jobs">
        <LiveOpportunities query={q} category={category} country={country} mode={mode} deadline={deadline} sort={sort} />
      </section>
    </div>
  );
}
