"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, Clock, ShieldCheck, ShieldAlert, FlaskConical } from "lucide-react";
import type { Opportunity } from "@/lib/types";
import { useDeadline } from "@/lib/useDeadline";
import { categoryImages } from "@/lib/images";
import SaveButton from "./SaveButton";
import Photo from "./Photo";

export default function OpportunityCard({ o }: { o: Opportunity }) {
  const deadline = useDeadline(o);
  const [closed, label] = deadline === "pending" ? [false, "Checking deadline..."] : deadline.split(":");
  const isDeadlineClosed = closed === "closed";
  const img = categoryImages[o.category];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-[box-shadow,border-color] duration-300 hover:border-tangerine hover:shadow-lg"
    >
      <div className="relative">
        <Photo src={img.src} alt={img.alt} tone={img.tone} label={o.category} sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw" className="relative aspect-[16/9] w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute left-3 top-3 flex max-w-[calc(100%-4.5rem)] flex-wrap gap-1.5">
          <span className="badge bg-white">{o.category}</span>
          {o.illustrative && <span className="badge border border-amber-200 bg-amber-50 text-amber-900"><FlaskConical size={12} aria-hidden="true" /> Demo · {o.country}</span>}
        </div>
        <div className="absolute right-3 top-3 rounded-lg bg-white"><SaveButton slug={o.slug} title={o.title} /></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold leading-snug">
          <Link href={"/opportunities/" + o.slug} className="hover:underline">{o.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{o.org}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          <li className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> {o.location}, {o.country} · {o.mode}</li>
          <li className={"tnum flex items-center gap-2 " + (isDeadlineClosed ? "text-muted" : "font-semibold")}><Clock size={16} aria-hidden="true" /> {label}</li>
          <li className="flex items-center gap-2 text-muted">
            {o.lastVerified ? <ShieldCheck size={16} aria-hidden="true" /> : <ShieldAlert size={16} aria-hidden="true" />}
            {o.lastVerified ? "Source checked" : "Not yet verified"}
          </li>
        </ul>
        {o.eligibility[0] && <p className="mt-3 text-sm text-muted">Eligibility: {o.eligibility[0]}</p>}
        {o.funding && <p className="mt-1 text-sm text-muted">Funding: {o.funding}</p>}
        {o.skills.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Related skills">
            {o.skills.slice(0, 3).map((skill) => <li key={skill} className="rounded-full bg-peach px-2.5 py-1 text-xs font-medium">{skill}</li>)}
          </ul>
        )}
        {o.illustrative && <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-950">Demo example · fictional listing for display only. Not a real opportunity.</p>}
        <Link href={"/opportunities/" + o.slug} className="mt-4 text-sm font-semibold underline decoration-tangerine decoration-2 underline-offset-4">
          View details<span className="sr-only"> for {o.title}</span>
        </Link>
      </div>
    </motion.article>
  );
}
