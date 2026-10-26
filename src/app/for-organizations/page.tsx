import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Info, LayoutDashboard, ShieldCheck, TrendingUp, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { benefits, faqs, orgTypes, steps } from "@/lib/orgContent";

export const metadata: Metadata = {
  title: "For Organizations",
  description: "Register your organization, get verified, and publish opportunities on UpNext.",
  alternates: { canonical: "/for-organizations" },
};

const icons = [Users, ShieldCheck, LayoutDashboard, TrendingUp];

function Ctas() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/organization/register" className="btn btn-primary">Register Organization <ArrowRight size={18} aria-hidden="true" /></Link>
      <Link href="/organization/login" className="btn btn-ghost">Sign In as an Organization</Link>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 md:pt-20">
        <p className="badge">For Organizations</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-6xl">Reach people who are ready for your next opportunity.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">UpNext connects legitimate opportunity providers with students, graduates, and professionals. Register your organization, get verified, and publish listings that link to your official application page.</p>
        <div className="mt-8"><Ctas /></div>
        <p className="mt-8 flex max-w-2xl gap-2 rounded-lg border border-tangerine bg-peach p-3 text-sm font-medium">
          <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          Demonstration build. Registration, review decisions, and analytics in the organization workspace are simulated until a backend is connected. Nothing you enter creates a real account.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="benefits">
        <Reveal>
          <h2 id="benefits" className="text-3xl font-extrabold md:text-4xl">Why publish on UpNext</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = icons[i];
              return (
                <li key={b.title} className="rounded-xl border border-line p-6 transition-colors duration-300 hover:border-tangerine">
                  <Icon size={26} aria-hidden="true" />
                  <h3 className="mt-3 text-xl font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted">{b.text}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8" aria-labelledby="types">
        <Reveal>
          <h2 id="types" className="text-3xl font-extrabold md:text-4xl">What you publish</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {orgTypes.map((t) => (<li key={t} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold">{t}</li>))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="verify">
        <Reveal>
          <h2 id="verify" className="text-3xl font-extrabold md:text-4xl">Two separate checks</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-peach p-6">
              <h3 className="text-xl font-bold">Organization verification</h3>
              <p className="mt-2 text-muted">Reviewers check who you are, your official website, and your authority to represent the organization. Statuses are Not submitted, Pending review, Verified, Changes requested, Rejected, and Suspended.</p>
            </div>
            <div className="rounded-xl bg-peach p-6">
              <h3 className="text-xl font-bold">Opportunity review</h3>
              <p className="mt-2 text-muted">Reviewers check each listing: its description, eligibility, deadline, and links. A verified organization still submits every listing for review.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8" aria-labelledby="steps">
        <h2 id="steps" className="text-3xl font-extrabold md:text-4xl">Eight steps from sign-up to published</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 2) * 0.08} className="flex h-full gap-4 rounded-xl border border-line p-5">
                <span className="tnum flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tangerine font-bold">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl font-extrabold md:text-4xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-line p-4 open:border-tangerine">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                {f.q}
                <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-2 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 text-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold md:text-5xl">Ready to publish?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">Start with your organization profile. Add your first opportunity after your review.</p>
          <div className="mt-6 flex justify-center"><Ctas /></div>
        </Reveal>
      </section>
    </>
  );
}
