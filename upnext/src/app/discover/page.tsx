import type { Metadata } from "next";
import { Suspense } from "react";
import DiscoverClient from "@/components/DiscoverClient";

export const metadata: Metadata = { title: "Discover opportunities", description: "Search jobs, internships, scholarships, courses, and grants.", alternates: { canonical: "/discover" } };

function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10" aria-busy="true">
      <div className="skeleton h-12 w-2/3" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="skeleton h-56" />)}
      </div>
    </div>
  );
}

export default function Page() {
  return (<Suspense fallback={<Loading />}><DiscoverClient /></Suspense>);
}
