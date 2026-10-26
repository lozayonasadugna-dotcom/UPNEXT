"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Trash2, Plus, Inbox, ExternalLink } from "lucide-react";
import { getOpportunity } from "@/lib/data";
import { APP_STATUSES, type AppStatus } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { addTask, deleteTask, toggleTask, untrack, updateTracked, useStore, type Task } from "@/lib/store";

function TaskForm({ slug }: { slug: string }) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (t.length < 2) { setError("Enter a task with at least 2 characters."); return; }
    if (t.length > 120) { setError("Keep the task under 120 characters."); return; }
    addTask(slug, t, due || null);
    setTitle(""); setDue(""); setError("");
  }
  return (
    <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row" noValidate>
      <div className="flex-1">
        <label htmlFor={"t-" + slug} className="sr-only">New task</label>
        <input id={"t-" + slug} className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task, such as Update CV" aria-invalid={!!error} aria-describedby={error ? "e-" + slug : undefined} />
        {error && <p id={"e-" + slug} role="alert" className="mt-1 text-sm font-medium">{error}</p>}
      </div>
      <div>
        <label htmlFor={"d-" + slug} className="sr-only">Due date</label>
        <input id={"d-" + slug} type="date" className="field" value={due} onChange={(e) => setDue(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary"><Plus size={18} aria-hidden="true" /> Add</button>
    </form>
  );
}

function TaskRow({ t }: { t: Task }) {
  return (
    <motion.li layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-3 py-1.5">
      <input id={"c-" + t.id} type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} className="h-5 w-5 accent-[#FF642E]" />
      <label htmlFor={"c-" + t.id} className={"flex-1 text-sm " + (t.done ? "text-muted line-through" : "")}>
        {t.title}{t.due && <span className="tnum ml-2 text-xs text-muted">due {formatDate(t.due)}</span>}
      </label>
      <button type="button" aria-label={"Delete task: " + t.title} className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-peach" onClick={() => { if (window.confirm("Delete this task?")) deleteTask(t.id); }}>
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </motion.li>
  );
}

export default function MyNextMove() {
  const { tracked, tasks, saved } = useStore();
  const [sort, setSort] = useState("deadline");

  const items = Object.values(tracked)
    .map((tr) => ({ tr, o: getOpportunity(tr.slug) }))
    .filter((x): x is { tr: typeof x.tr; o: NonNullable<typeof x.o> } => !!x.o)
    .sort((a, b) => {
      if (sort === "status") return APP_STATUSES.indexOf(a.tr.status) - APP_STATUSES.indexOf(b.tr.status);
      if (sort === "updated") return b.tr.updatedAt - a.tr.updatedAt;
      return (a.o.deadline ?? "9999").localeCompare(b.o.deadline ?? "9999");
    });

  const upcoming = tasks.filter((t) => !t.done && t.due).sort((a, b) => (a.due as string).localeCompare(b.due as string)).slice(0, 5);
  const savedOnly = saved.filter((s) => !tracked[s]).map((s) => getOpportunity(s)).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-extrabold md:text-5xl">My Next Move</h1>
      <p className="mt-2 text-muted">Your saved opportunities, tasks, and notes. They are saved in this browser; account sync is coming later.</p>

      {items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-line bg-peach px-6 py-14 text-center">
          <Inbox size={32} aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-bold">Nothing here yet</h2>
          <p className="mt-1 max-w-sm text-muted">Open an opportunity and choose Add to My Next Move. Then add your first task.</p>
          <Link href="/discover" className="btn btn-primary mt-5">Explore opportunities</Link>
        </div>
      ) : (
        <>
          <section className="mt-8 rounded-xl border border-line p-5" aria-labelledby="up">
            <h2 id="up" className="text-xl font-bold">Upcoming tasks</h2>
            {upcoming.length === 0 ? <p className="mt-2 text-sm text-muted">No upcoming tasks with a due date.</p> : (
              <ul className="tnum mt-2 space-y-1 text-sm">
                {upcoming.map((t) => (<li key={t.id}>{formatDate(t.due)} · {t.title} <span className="text-muted">({getOpportunity(t.slug)?.title})</span></li>))}
              </ul>
            )}
          </section>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="tnum text-sm font-semibold">{items.length} tracked</p>
            <label className="flex items-center gap-2 text-sm font-medium">Sort by
              <select className="field !w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="deadline">Deadline</option><option value="status">Status</option><option value="updated">Recently updated</option>
              </select>
            </label>
          </div>

          <ul className="mt-4 space-y-5">
            <AnimatePresence>
              {items.map(({ tr, o }) => {
                const mine = tasks.filter((t) => t.slug === tr.slug);
                const done = mine.filter((t) => t.done).length;
                const pct = mine.length ? Math.round((done / mine.length) * 100) : 0;
                return (
                  <motion.li key={tr.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="rounded-xl border border-line p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold"><Link href={"/opportunities/" + o.slug} className="hover:underline">{o.title}</Link></h2>
                        <p className="text-sm text-muted">{o.org} · <span className="tnum">Deadline: {formatDate(o.deadline)}</span></p>
                      </div>
                      <label className="text-sm font-medium">Status
                        <select className="field mt-1" value={tr.status} onChange={(e) => updateTracked(tr.slug, { status: e.target.value as AppStatus })}>
                          {APP_STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </label>
                    </div>

                    <div className="mt-4" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={"Task progress for " + o.title}>
                      <div className="h-2 rounded bg-peach-soft"><motion.div className="h-2 rounded bg-tangerine" initial={false} animate={{ width: pct + "%" }} transition={{ duration: 0.3 }} /></div>
                      <p className="tnum mt-1 text-xs text-muted">{mine.length ? done + " of " + mine.length + " tasks done" : "No tasks yet"}</p>
                    </div>

                    <ul className="mt-2"><AnimatePresence>{mine.map((t) => <TaskRow key={t.id} t={t} />)}</AnimatePresence></ul>
                    <TaskForm slug={tr.slug} />

                    <label htmlFor={"n-" + tr.slug} className="mt-4 block text-sm font-medium">Notes</label>
                    <textarea id={"n-" + tr.slug} rows={3} maxLength={1000} className="field mt-1 py-2" value={tr.note} onChange={(e) => updateTracked(tr.slug, { note: e.target.value })} />

                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href={o.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Official application <ExternalLink size={16} aria-hidden="true" /></a>
                      <button type="button" className="btn btn-ghost" onClick={() => { if (window.confirm("Remove this opportunity and its tasks from My Next Move?")) untrack(tr.slug); }}>Remove</button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </>
      )}

      {savedOnly.length > 0 && (
        <section className="mt-10" aria-labelledby="sv">
          <h2 id="sv" className="text-xl font-bold">Saved, not yet tracked</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {savedOnly.map((o) => o && (<li key={o.slug}><Link className="font-semibold underline" href={"/opportunities/" + o.slug}>{o.title}</Link> <span className="text-muted">at {o.org}</span></li>))}
          </ul>
        </section>
      )}
    </div>
  );
}
