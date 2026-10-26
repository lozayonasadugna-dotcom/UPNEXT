import type { MetadataRoute } from "next";
import { opportunities } from "@/lib/data";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/discover", "/my-next-move", "/privacy", "/terms"].map((p) => ({ url: site + p }));
  return [...pages, ...opportunities.map((o) => ({ url: site + "/opportunities/" + o.slug }))];
}
