"use client";
import Link from "next/link";
import { ListPlus, Check } from "lucide-react";
import { trackOpportunity, useStore } from "@/lib/store";

export default function TrackButton({ slug }: { slug: string }) {
  const tracked = !!useStore().tracked[slug];
  if (tracked) {
    return (
      <Link href="/my-next-move" className="btn btn-ghost"><Check size={18} /> In My Next Move</Link>
    );
  }
  return (
    <button type="button" className="btn btn-primary" onClick={() => trackOpportunity(slug)}>
      <ListPlus size={18} /> Add to My Next Move
    </button>
  );
}
