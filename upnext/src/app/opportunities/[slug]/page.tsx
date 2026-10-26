import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, AlertTriangle, ArrowLeft } from "lucide-react";
import { getOpportunity, opportunities } from "@/lib/data";
import { formatDate } from "@/lib/format";
import SaveButton from "@/components/SaveButton";
import TrackButton from "@/components/TrackButton";
import DetailHero from "@/components/DetailHero";
import OpportunityAvailability from "@/components/OpportunityAvailability";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return opportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = getOpportunity(slug);
  if (!o) return { title: "Not found" };
  return { title: o.title + " at " + o.org, description: o.description, alternates: { canonical: "/opportunities/" + o.slug } };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-2 text-muted">{children}</div>
    </section>
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const o = getOpportunity(slug);
  if (!o) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/discover" className="inline-flex items-center gap-1 text-sm font-semibold"><ArrowLeft size={16} aria-hidden="true" /> Back to discover</Link>

      <DetailHero category={o.category} />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="badge">{o.category}</span>
        <span className="badge">{o.mode}</span>
      </div>
      <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{o.title}</h1>
      <p className="mt-2 text-lg text-muted">{o.org}</p>

      {o.illustrative && (
        <p className="mt-5 flex gap-2 rounded-lg border border-tangerine bg-peach p-3 text-sm font-medium"><AlertTriangle size={18} className="shrink-0" aria-hidden="true" /> Illustrative sample record for development. It is not a real listing and its links are placeholders.</p>
      )}
      {!o.lastVerified && (
        <p className="mt-3 flex gap-2 rounded-lg border border-line p-3 text-sm"><AlertTriangle size={18} className="shrink-0" aria-hidden="true" /> This listing has not been verified yet. Check the official source before you act.</p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <SaveButton slug={o.slug} title={o.title} withLabel />
        <TrackButton slug={o.slug} />
      </div>

      <dl className="tnum mt-8 grid gap-4 rounded-xl border border-line p-5 sm:grid-cols-2">
        <div><dt className="text-xs font-bold uppercase text-muted">Location</dt><dd>{o.location}, {o.country}</dd></div>
        <div><dt className="text-xs font-bold uppercase text-muted">Deadline</dt><dd>{o.deadline ? formatDate(o.deadline) + (o.timezone ? " (" + o.timezone + ")" : " (time zone not provided)") : "Not provided"}</dd></div>
        <div><dt className="text-xs font-bold uppercase text-muted">Funding or pay</dt><dd>{o.funding ?? "Not provided or verified"}</dd></div>
        <div><dt className="text-xs font-bold uppercase text-muted">Last verified</dt><dd>{o.lastVerified ? formatDate(o.lastVerified) : "Not yet verified"}</dd></div>
      </dl>

      <Section title="About this opportunity"><p>{o.description}</p></Section>
      <Section title="Eligibility">
        {o.eligibility.length ? <ul className="list-disc space-y-1 pl-5">{o.eligibility.map((e) => <li key={e}>{e}</li>)}</ul> : <p>Eligibility has not been provided.</p>}
      </Section>
      <Section title="Required documents">
        {o.documents.length ? <ul className="list-disc space-y-1 pl-5">{o.documents.map((d) => <li key={d}>{d}</li>)}</ul> : <p>No documents listed. Check the official source.</p>}
      </Section>

      <Section title="Official links">
        <p>You apply on the official site. UpNext does not submit applications.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={o.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Official source <ExternalLink size={16} aria-hidden="true" /></a>
          <OpportunityAvailability opportunity={o} />
        </div>
      </Section>
    </article>
  );
}
