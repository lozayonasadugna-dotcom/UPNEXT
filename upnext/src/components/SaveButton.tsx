"use client";
import { motion } from "motion/react";
import { Bookmark } from "lucide-react";
import { toggleSave, useStore } from "@/lib/store";

export default function SaveButton({ slug, title, withLabel = false }: { slug: string; title: string; withLabel?: boolean }) {
  const saved = useStore().saved.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleSave(slug)}
      aria-pressed={saved}
      aria-label={(saved ? "Remove saved: " : "Save: ") + title}
      className={"inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition-colors " + (saved ? "border-tangerine bg-peach" : "border-line hover:bg-peach")}
    >
      <motion.span key={String(saved)} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} className="flex">
        <Bookmark size={20} fill={saved ? "#FF642E" : "none"} color={saved ? "#FF642E" : "#202020"} />
      </motion.span>
      {withLabel && <span>{saved ? "Saved" : "Save"}</span>}
      <span role="status" className="sr-only">{saved ? "Saved" : ""}</span>
    </button>
  );
}
