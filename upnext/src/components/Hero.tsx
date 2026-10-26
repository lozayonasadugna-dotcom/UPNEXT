"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CalendarClock, GraduationCap } from "lucide-react";
import Photo from "./Photo";
import { heroImage } from "@/lib/images";
import { getOpportunity } from "@/lib/data";
import { useStore } from "@/lib/store";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } };

export default function Hero() {
  const { tracked, tasks } = useStore();
  const active = Object.values(tracked)
    .map((record) => ({ record, opportunity: getOpportunity(record.slug) }))
    .find((item) => item.opportunity);
  const activeTasks = active ? tasks.filter((task) => task.slug === active.record.slug) : [];
  const done = activeTasks.filter((task) => task.done).length;
  const pct = activeTasks.length ? Math.round((done / activeTasks.length) * 100) : 0;
  return (
    <section className="ambient relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-10 pt-12 md:grid-cols-[1.05fr_1fr] md:pt-20">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p variants={item} className="badge">Discover. Prepare. Progress.</motion.p>
        <motion.h1 variants={item} className="mt-5 text-5xl font-extrabold leading-[1.02] md:text-7xl">
          Something great is <span className="text-tangerine">next.</span>
        </motion.h1>
        <motion.p variants={item} className="mt-5 max-w-lg text-lg text-muted">
          Find jobs, internships, scholarships, courses, and grants. Turn each one into a checklist with deadlines, then track every step to your application.
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Link href="/discover" className="btn btn-primary">Explore opportunities <ArrowRight size={18} /></Link>
          <Link href="/#how" className="btn btn-ghost">See how it works</Link>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto h-[470px] w-full max-w-md md:max-w-none">
        <motion.div
          className="absolute right-0 top-0 h-[390px] w-[84%]"
          initial={{ clipPath: "inset(0 0 100% 0 round 28px)" }}
          animate={{ clipPath: "inset(0 0 0% 0 round 28px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Photo src={heroImage.src} alt={heroImage.alt} tone={heroImage.tone} label="UpNext" priority sizes="(min-width: 768px) 40vw, 90vw" className="relative h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </motion.div>

        <motion.div className="absolute -left-2 top-2 z-0 w-24" aria-hidden="true" animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <svg viewBox="0 0 120 120" fill="none">
            <motion.path d="M20 95V30L92 95V25" stroke="#FF642E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }} />
          </svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6, rotate: -1 }} transition={{ duration: 0.5, delay: 0.6 }} className="absolute left-0 top-28 z-10 w-56">
          <Link href="/discover?category=Scholarships" className="glass block rounded-xl p-4 shadow-md transition-shadow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-tangerine">
            <GraduationCap size={22} aria-hidden="true" />
            <p className="mt-2 font-display text-lg font-bold">Scholarship</p>
            <p className="tnum mt-1 flex items-center gap-2 text-sm text-muted"><CalendarClock size={16} aria-hidden="true" /> Find scholarships</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">Browse scholarships <ArrowRight size={15} aria-hidden="true" /></span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5, rotate: 1 }} transition={{ duration: 0.5, delay: 0.75 }} className="absolute bottom-0 right-4 z-10 w-64">
          <Link href={active ? "/my-next-move" : "/discover"} className="glass block rounded-xl p-4 shadow-md transition-shadow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-tangerine">
            <p className="text-sm font-semibold">My Next Move</p>
            {active?.opportunity ? (
              <>
                <p className="mt-1 line-clamp-2 text-sm font-bold">{active.opportunity.title}</p>
                <p className="mt-1 text-xs text-muted">Status: {active.record.status}</p>
                <div className="mt-3 h-2 rounded bg-peach-soft" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Task progress">
                  <div className="h-2 rounded bg-tangerine transition-[width] duration-300" style={{ width: pct + "%" }} />
                </div>
                <p className="tnum mt-1 text-xs text-muted">{activeTasks.length ? done + " of " + activeTasks.length + " tasks done" : "Add tasks to track your progress"}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold">Open your tracker <ArrowRight size={14} aria-hidden="true" /></span>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-muted">Track an opportunity to see your real application status and progress here.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">Find your next move <ArrowRight size={15} aria-hidden="true" /></span>
              </>
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
