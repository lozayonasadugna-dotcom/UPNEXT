"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, ExternalLink, MapPin, RefreshCw, Radio } from "lucide-react";
import { motion } from "motion/react";
import type { Category } from "@/lib/types";
import { isLiveJob, type LiveJob } from "@/lib/live-jobs";

type LoadState = "loading" | "ready" | "error";

interface Props {
  title?: string;
  limit?: number;
  query?: string;
  category?: Category | "All";
  country?: string;
  mode?: string;
  deadline?: string;
  sort?: string;
}

export default function LiveOpportunities({
  title = "Live jobs from Germany",
  limit,
  query = "",
  category = "All",
  country = "All",
  mode = "All",
  deadline = "any",
  sort = "newest",
}: Props) {
  const [jobs, setJobs] = useState<LiveJob[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [refreshing, setRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [message, setMessage] = useState("");

  const loadJobs = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/opportunities", { signal });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const errorText = typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string"
          ? payload.error
          : "The remote jobs feed is temporarily unavailable.";
        throw new Error(errorText);
      }
      if (
        typeof payload !== "object" ||
        payload === null ||
        !("jobs" in payload) ||
        !Array.isArray(payload.jobs)
      ) {
        throw new Error("The remote jobs feed returned an unexpected response.");
      }
      if (!payload.jobs.every(isLiveJob)) {
        throw new Error("The remote jobs feed contained invalid listings.");
      }
      setJobs(payload.jobs);
      setState("ready");
      setMessage("");
      setLastChecked(new Date());
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setState("error");
      setMessage(error instanceof Error ? error.message : "The remote jobs feed is temporarily unavailable.");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const initialLoad = window.setTimeout(() => { void loadJobs(controller.signal); }, 0);
    const interval = window.setInterval(() => { void loadJobs(); }, 6 * 60 * 60 * 1000);
    return () => {
      window.clearTimeout(initialLoad);
      controller.abort();
      window.clearInterval(interval);
    };
  }, [loadJobs]);

  const filteredJobs = useMemo(() => {
    if (category !== "All" && category !== "Jobs") return [];
    if (mode === "Hybrid" || mode === "On-site") return [];
    if (deadline === "7" || deadline === "30") return [];

    const term = query.trim().toLowerCase();
    const filtered = jobs.filter((job) => {
      const text = [job.title, job.company, job.location, ...job.tags].join(" ").toLowerCase();
      if (term && !text.includes(term)) return false;
      if (mode === "Remote" && !job.remote) return false;
      if (country !== "All" && !job.location.toLowerCase().includes(country.toLowerCase())) return false;
      return true;
    });

    if (sort === "relevance" && term) {
      return filtered.sort((a, b) => {
        const score = (job: LiveJob) => (job.title.toLowerCase().includes(term) ? 3 : 0) + (job.company.toLowerCase().includes(term) ? 2 : 0);
        return score(b) - score(a);
      });
    }
    return filtered.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  }, [jobs, query, category, country, mode, deadline, sort]);

  const visibleJobs = limit ? filteredJobs.slice(0, limit) : filteredJobs;

  async function refresh() {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  }

  if (category !== "All" && category !== "Jobs") return null;

  return (
    <section aria-labelledby="live-jobs-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="live-jobs-title" className="text-3xl font-extrabold md:text-4xl">{title}</h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"><span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800"><Radio size={14} aria-hidden="true" /> Live source feed</span><span>From Arbeitnow’s Germany job board · refreshes every 6 hours · listings may be up to 24 hours old.</span></p>
        </div>
        <button type="button" onClick={refresh} disabled={refreshing || state === "loading"} className="btn btn-ghost !min-h-10 !px-3 text-sm disabled:opacity-60">
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} aria-hidden="true" />
          Refresh feed
        </button>
      </div>

      {state === "loading" ? (
        <p className="mt-5 rounded-xl border border-line bg-white p-5 text-sm text-muted" role="status">Loading current listings from Arbeitnow...</p>
      ) : state === "error" ? (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5" role="alert">
          <p className="font-semibold">Live jobs are unavailable right now.</p>
          <p className="mt-1 text-sm text-muted">{message}</p>
          <button type="button" onClick={refresh} className="btn btn-ghost mt-3">Try again</button>
        </div>
      ) : deadline === "7" || deadline === "30" ? (
        <p className="mt-5 rounded-xl border border-line bg-white p-5 text-sm text-muted">The live feed does not include application deadlines, so these jobs cannot be filtered by the selected deadline range.</p>
      ) : mode === "Hybrid" || mode === "On-site" ? (
        <p className="mt-5 rounded-xl border border-line bg-white p-5 text-sm text-muted">The live source identifies remote jobs but does not reliably distinguish hybrid from on-site roles.</p>
      ) : visibleJobs.length === 0 ? (
        <p className="mt-5 rounded-xl border border-line bg-white p-5 text-sm text-muted">No live jobs match these filters. Try another search, location, or work mode.</p>
      ) : (
        <>
          <p className="tnum mt-5 text-sm font-semibold">{filteredJobs.length} current source listings</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleJobs.map((job, index) => (
              <motion.article key={job.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: Math.min(index, 5) * 0.04 }} whileHover={{ y: -4 }} className="group flex min-h-64 flex-col rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] hover:border-tangerine hover:shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge"><BriefcaseBusiness size={13} aria-hidden="true" /> {job.remote ? "Remote · Germany feed" : "Germany feed"}</span>
                  <span className="text-xs text-muted">{job.jobType.replaceAll("_", " ")}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-snug">
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="decoration-tangerine decoration-2 underline-offset-4 group-hover:underline">
                    {job.title}<span className="sr-only"> at {job.company}</span>
                  </a>
                </h3>
                <p className="mt-1 text-sm text-muted">{job.company}</p>
                <p className="mt-3 flex items-start gap-2 text-sm text-muted"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{job.location}</p>
                <p className="mt-2 text-xs text-muted">Posted {new Date(job.publicationDate).toLocaleDateString()}</p>
                <div className="mt-auto pt-4">
                  {job.tags.length > 0 && <ul className="mb-3 flex flex-wrap gap-1.5">{job.tags.slice(0, 3).map((tag) => <li key={tag} className="rounded-full bg-peach px-2.5 py-1 text-xs font-medium">{tag}</li>)}</ul>}
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold underline decoration-tangerine decoration-2 underline-offset-4">
                    View on Arbeitnow <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      )}
      {lastChecked && <p className="mt-3 text-xs text-muted">Feed checked {lastChecked.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}. Job posts may be up to 24 hours old.</p>}
    </section>
  );
}
