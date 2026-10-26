"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Building2, CheckCircle2, ChevronRight, FileCheck2, Gauge, ShieldCheck, Sparkles, UserRoundCheck, Users } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { adminSummaryData, demoComments, demoOrganization, demoOpportunities, demoReports, orgChecklist } from "@/lib/demo-workspace";
import { saveOrganizationProfile, useOrganizationProfile } from "@/lib/organization-store";

const organizationBenefits = [
  "Reach students, graduates, and professionals searching for the next opportunity.",
  "Publish vetted, discoverable listings with clear eligibility and deadlines.",
  "Manage drafts, reviews, and updates in one dashboard.",
  "Track engagement with demo analytics and community feedback.",
];

const opportunityTypes = ["Jobs", "Internships", "Scholarships", "Fellowships", "Grants", "Courses", "Funded programs", "Events", "Competitions"];

function formatStatusTone(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("verified") || normalized.includes("approved") || normalized.includes("published")) return "bg-emerald-100 text-emerald-700";
  if (normalized.includes("pending") || normalized.includes("review") || normalized.includes("submitted")) return "bg-amber-100 text-amber-700";
  if (normalized.includes("changes") || normalized.includes("rejected") || normalized.includes("suspended")) return "bg-rose-100 text-rose-700";
  return "bg-slate-100 text-slate-700";
}

export function OrganizationLandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid gap-8 rounded-[2rem] border border-line bg-white p-6 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div>
          <p className="badge w-fit"><Building2 size={14} aria-hidden="true" /> UpNext for Organizations</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Share opportunities with the people who are ready to act.</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">UpNext helps legitimate employers, universities, NGOs, and funding bodies reach students, graduates, and professionals with credible opportunity listings and a transparent review process.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/organization/register" className="btn btn-primary">Register Organization</Link>
            <Link href="/organization/login" className="btn btn-ghost">Sign In as an Organization</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-tangerine" aria-hidden="true" /> Verified review process</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-tangerine" aria-hidden="true" /> Demo-ready workflow</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="relative h-48 sm:h-56">
            <Image src="/images/internships.jpg" alt="Students collaborating on a project" fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Opportunity starts here</p>
              <p className="mt-1 text-xl font-bold">Reach people ready for their next step.</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Why organizations choose UpNext</p>
            <ul className="mt-4 space-y-3">
              {organizationBenefits.slice(0, 3).map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm text-muted"><span className="mt-0.5 text-tangerine"><CheckCircle2 size={18} aria-hidden="true" /></span>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }} className="rounded-2xl border border-line bg-white p-6">
          <ShieldCheck className="text-tangerine" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold">Trusted visibility</h2>
          <p className="mt-2 text-muted">Every opportunity is reviewed before publication and organizations can explain their legitimacy and authorization.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: 0.08 }} className="rounded-2xl border border-line bg-white p-6">
          <Gauge className="text-tangerine" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold">Clear analytics</h2>
          <p className="mt-2 text-muted">Track views, saves, application-link clicks, and engagement trends without exposing personal viewer details.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: 0.16 }} className="rounded-2xl border border-line bg-white p-6">
          <Users className="text-tangerine" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold">Better signals</h2>
          <p className="mt-2 text-muted">Give students and professionals useful context through comments, reports, and a transparent moderation workflow.</p>
        </motion.div>
      </section>

      <section className="mt-16 rounded-2xl border border-line bg-peach p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Supported opportunity types</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {opportunityTypes.map((type) => (
            <span key={type} className="badge">{type}</span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-extrabold md:text-4xl">How the review process works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {orgChecklist.map((step, index) => (
            <li key={step} className="rounded-2xl border border-line bg-white p-5">
              <div className="text-sm font-bold text-tangerine">0{index + 1}</div>
              <p className="mt-2 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-2xl border border-line bg-white p-6 md:p-8">
        <h2 className="text-3xl font-extrabold">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-line p-4">
            <h3 className="font-bold">Who can register?</h3>
            <p className="mt-1 text-muted">Employers, universities, NGOs, government bodies, funding providers, and other legitimate organization types may apply.</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <h3 className="font-bold">Do I need to be fully verified before I post?</h3>
            <p className="mt-1 text-muted">Yes. Organizations begin with an account and verification stage. Approved organizations can submit listings and reviewers inspect each listing before publication.</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <h3 className="font-bold">Is this real authentication?</h3>
            <p className="mt-1 text-muted">This prototype uses demo flows and clearly labels the simulated state. A production deployment will require server-side authentication and policy enforcement.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function OrganizationRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const defaultForm = {
    organizationName: "North Star Careers",
    organizationType: "Employer",
    country: "Ethiopia",
    location: "Addis Ababa",
    website: "https://example.org",
    contactEmail: "hello@example.org",
    representativeName: "Marta Bekele",
    jobTitle: "Partnerships Lead",
    phone: "+251 911 000 000",
    description: "We connect talent with career and learning opportunities across East Africa.",
    opportunityTypes: "Jobs, Internships, Courses",
  };
  const [form, setForm] = useState<typeof defaultForm>(() => {
    if (typeof window === "undefined") return defaultForm;
    try {
      const raw = window.localStorage.getItem("upnext-org-registration");
      if (!raw) return defaultForm;
      return { ...defaultForm, ...JSON.parse(raw) };
    } catch {
      return defaultForm;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const canContinue = step < 3;

  function updateField(field: keyof typeof defaultForm, value: string) {
    setForm((prev: typeof defaultForm) => ({ ...prev, [field]: value }));
    setErrors((prev: Record<string, string>) => ({ ...prev, [field]: "" }));
  }

  function validateStep(stepToValidate: number) {
    const nextErrors: Record<string, string> = {};
    if (stepToValidate === 1) {
      if (!form.organizationName.trim()) nextErrors.organizationName = "Enter the official organization name.";
      if (!form.country.trim()) nextErrors.country = "Enter the country.";
      if (!form.website.trim()) {
        nextErrors.website = "Add the official website.";
      } else {
        try {
          const website = new URL(form.website);
          if (website.protocol !== "https:" && website.protocol !== "http:") throw new Error();
        } catch {
          nextErrors.website = "Enter a valid website URL starting with http:// or https://.";
        }
      }
    }
    if (stepToValidate === 2) {
      if (!form.representativeName.trim()) nextErrors.representativeName = "Add the representative name.";
      if (!form.jobTitle.trim()) nextErrors.jobTitle = "Add the representative's job title.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) nextErrors.contactEmail = "Enter a valid contact email.";
    }
    if (stepToValidate === 3) {
      if (form.description.trim().length < 20) nextErrors.description = "Write at least 20 characters about your organization.";
      if (!form.opportunityTypes.trim()) nextErrors.opportunityTypes = "Add at least one opportunity type.";
    }
    return nextErrors;
  }

  function continueStep() {
    const nextErrors = validateStep(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(3, current + 1));
  }

  function saveDraft() {
    window.localStorage.setItem("upnext-org-registration", JSON.stringify(form));
    setSubmitted(false);
    setErrors({});
    setSaveMessage("Your demo registration draft is saved in this browser. No account has been created.");
  }

  function submitRegistration() {
    const nextErrors = validateStep(1);
    Object.assign(nextErrors, validateStep(2), validateStep(3));
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidStep = ["organizationName", "country", "website"].some((field) => field in nextErrors)
        ? 1
        : ["representativeName", "jobTitle", "contactEmail"].some((field) => field in nextErrors) ? 2 : 3;
      setStep(firstInvalidStep);
      return;
    }
    window.localStorage.setItem("upnext-org-registration", JSON.stringify(form));
    saveOrganizationProfile({
      ...demoOrganization,
      name: form.organizationName,
      type: form.organizationType,
      country: form.country,
      location: form.location,
      website: form.website,
      contactEmail: form.contactEmail,
      contactName: form.representativeName,
      jobTitle: form.jobTitle,
      phone: form.phone,
      description: form.description,
      opportunityTypes: form.opportunityTypes.split(",").map((type) => type.trim()).filter(Boolean),
      verificationStatus: "Pending review",
    } as typeof demoOrganization);
    setSaveMessage("");
    setSubmitted(true);
    setTimeout(() => router.push("/organization/login"), 700);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="badge">Demo registration</p>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Register your organization</h1>
            <p className="mt-2 text-sm text-muted">A short three-step demo. No password or identity documents are requested.</p>
          </div>
          <div className="shrink-0 rounded-full bg-peach px-3 py-1.5 text-sm font-semibold text-ink">Step {step} of 3</div>
        </div>
        <ol aria-label="Registration progress" className="mt-6 grid grid-cols-3 gap-2">
          {["Organization", "Representative", "Opportunity scope"].map((label, index) => (
            <li key={label} className={"border-t-2 pt-2 text-xs font-semibold sm:text-sm " + (index + 1 <= step ? "border-tangerine text-ink" : "border-line text-muted")}>
              <span className="mr-2 text-tangerine">0{index + 1}</span>{label}
            </li>
          ))}
        </ol>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-peach">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} className="h-full bg-tangerine" />
        </div>
        <p className="mt-5 text-sm font-semibold text-ink">{["Organization details", "Representative contact", "Opportunity plans"][step - 1]}</p>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
            <p className="text-lg font-bold">Demo registration saved.</p>
            <p className="mt-2 text-sm">Your organization profile is ready for the verification flow. You may continue to the organization sign-in demo.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-sm font-semibold">Official organization name</span>
                  <input value={form.organizationName} onChange={(e) => updateField("organizationName", e.target.value)} className="field" />
                  {errors.organizationName && <span className="mt-1 block text-sm text-red-600">{errors.organizationName}</span>}
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Organization type</span>
                  <select value={form.organizationType} onChange={(e) => updateField("organizationType", e.target.value)} className="field">
                    <option>Employer</option>
                    <option>University</option>
                    <option>Government institution</option>
                    <option>NGO</option>
                    <option>Scholarship provider</option>
                    <option>Training institution</option>
                    <option>Other legitimate organization</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Country</span>
                  <input value={form.country} onChange={(e) => updateField("country", e.target.value)} className="field" />
                  {errors.country && <span className="mt-1 block text-sm text-red-600">{errors.country}</span>}
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Location</span>
                  <input value={form.location} onChange={(e) => updateField("location", e.target.value)} className="field" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-sm font-semibold">Official website</span>
                  <input value={form.website} onChange={(e) => updateField("website", e.target.value)} className="field" />
                  {errors.website && <span className="mt-1 block text-sm text-red-600">{errors.website}</span>}
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Representative name</span>
                  <input value={form.representativeName} onChange={(e) => updateField("representativeName", e.target.value)} className="field" />
                  {errors.representativeName && <span className="mt-1 block text-sm text-red-600">{errors.representativeName}</span>}
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Representative job title</span>
                  <input value={form.jobTitle} onChange={(e) => updateField("jobTitle", e.target.value)} className="field" />
                  {errors.jobTitle && <span className="mt-1 block text-sm text-red-600">{errors.jobTitle}</span>}
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Contact email</span>
                  <input type="email" value={form.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} className="field" />
                  {errors.contactEmail && <span className="mt-1 block text-sm text-red-600">{errors.contactEmail}</span>}
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Contact number</span>
                  <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="field" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-sm font-semibold">Brief description</span>
                  <textarea rows={4} value={form.description} onChange={(e) => updateField("description", e.target.value)} className="field resize-none p-3" />
                  {errors.description && <span className="mt-1 block text-sm text-red-600">{errors.description}</span>}
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Opportunity types you plan to publish</span>
                  <input value={form.opportunityTypes} onChange={(e) => updateField("opportunityTypes", e.target.value)} className="field" />
                  {errors.opportunityTypes && <span className="mt-1 block text-sm text-red-600">{errors.opportunityTypes}</span>}
                </label>
                <dl className="grid gap-3 rounded-xl border border-line p-4 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted">Organization</dt><dd className="mt-1 font-medium">{form.organizationName || "Not entered yet"}</dd></div>
                  <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted">Representative</dt><dd className="mt-1 font-medium">{form.representativeName || "Not entered yet"}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wide text-muted">Official website</dt><dd className="mt-1 break-all font-medium">{form.website || "Not entered yet"}</dd></div>
                </dl>
                <div className="rounded-xl border border-line bg-peach p-4 text-sm text-muted">
                  <p className="font-semibold text-ink">Demo review note</p>
                  <p className="mt-2">This prototype does not validate documents or identities. It simulates a review submission and shows a verification state for demo purposes.</p>
                </div>
              </div>
            )}
              </motion.div>
            </AnimatePresence>

            {saveMessage && <p role="status" className="rounded-xl border border-line bg-[#f7f5f3] p-3 text-sm text-muted">{saveMessage}</p>}

            <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
              <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1}>Back</button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={saveDraft}>Save draft</button>
                {canContinue ? (
                  <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={continueStep}>Continue</button>
                ) : (
                  <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={submitRegistration}>Submit for review</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function OrganizationLoginForm() {
  const router = useRouter();
  const profile = useOrganizationProfile();
  const [error, setError] = useState("");

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const cleanedEmail = String(values.get("email") ?? "").trim();
    const cleanedName = String(values.get("organizationName") ?? "").trim();
    if (!cleanedEmail || !cleanedName) {
      setError("Enter your organization email and organization name.");
      return;
    }
    window.localStorage.setItem("upnext-org-session", JSON.stringify({ email: cleanedEmail, organizationName: cleanedName, demo: true }));
    saveOrganizationProfile({ ...profile, contactEmail: cleanedEmail, name: cleanedName });
    router.push("/organization/dashboard");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="badge">Demo sign in</p>
        <h1 className="mt-3 text-3xl font-extrabold">Organization sign in</h1>
        <p className="mt-2 text-muted">This is a demo workflow for the prototype. Do not enter real passwords or sensitive credentials.</p>
        <form onSubmit={signIn} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Organization email</span>
            <input name="email" type="email" defaultValue={profile.contactEmail} required className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Organization name</span>
            <input name="organizationName" defaultValue={profile.name} required className="field" />
          </label>
          <button type="submit" className="btn btn-primary w-full">Continue to dashboard</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export function OrganizationDashboard() {
  const orgProfile = useOrganizationProfile();
  const stats = useMemo(() => [
    { label: "Published opportunities", value: "3", tone: "bg-emerald-100 text-emerald-700" },
    { label: "Drafts", value: "2", tone: "bg-slate-100 text-slate-700" },
    { label: "Awaiting review", value: "1", tone: "bg-amber-100 text-amber-700" },
    { label: "Listings needing changes", value: "1", tone: "bg-rose-100 text-rose-700" },
  ], []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-2xl border border-line bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="badge"><Building2 size={14} aria-hidden="true" /> Demo organization workspace</p>
            <h1 className="mt-3 text-3xl font-extrabold">Welcome, {orgProfile.name}</h1>
            <p className="mt-1 text-muted">{orgProfile.contactEmail}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/organization/opportunities/new" className="btn btn-primary">Post an Opportunity</Link>
            <Link href="/organization/analytics" className="btn btn-ghost">View analytics</Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.06 }} className="rounded-2xl border border-line bg-white p-5">
            <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.tone}`}>{item.label}</div>
            <p className="mt-4 text-3xl font-extrabold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-white p-4">
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
            <Image src="/images/jobs.jpg" alt="" fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Your organization profile</p>
            <p className="mt-1 truncate text-xs text-muted">{orgProfile.type} · {orgProfile.location}, {orgProfile.country}</p>
            <p className="mt-1 text-xs text-muted">Verification: {orgProfile.verificationStatus} · demo state</p>
          </div>
        </div>
        <Link href="/organization/profile" className="btn btn-ghost">Manage profile</Link>
      </div>

      <section className="mt-8 space-y-6">
          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-xl font-bold">Recent opportunities</h2>
            <div className="mt-4 space-y-3">
              {demoOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="flex flex-col gap-3 rounded-xl border border-line p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{opportunity.title}</p>
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${formatStatusTone(opportunity.status)}`}>{opportunity.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{opportunity.category} · {opportunity.country}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/organization/opportunities" className="btn btn-ghost">Manage</Link>
                    <Link href="/organization/opportunities/new" className="btn btn-primary">Edit</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
    </div>
  );
}

export function OrganizationVerificationPage() {
  const [status] = useState("Pending review");
  const progress = 5;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <p className="badge">Demo verification</p>
        <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Organization verification</h1>
        <p className="mt-2 text-muted">This workflow is a front-end prototype. A real deployment must validate identity and documents on the server.</p>

        <div className="mt-6 rounded-xl border border-line bg-peach p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Current status</p>
              <p className="text-xl font-bold">{status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted">Progress</p>
              <p className="text-xl font-bold">{progress}/8 steps</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {orgChecklist.map((step, index) => (
            <div key={step} className={`rounded-2xl border p-4 ${index < progress ? "border-emerald-200 bg-emerald-50" : "border-line bg-white"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Step {index + 1}</span>
                {index < progress ? <CheckCircle2 className="text-emerald-600" size={18} aria-hidden="true" /> : <ChevronRight className="text-muted" size={18} aria-hidden="true" />}
              </div>
              <p className="mt-2 font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrganizationAnalyticsPage() {
  const [period, setPeriod] = useState("7 days");
  const metrics = [
    { label: "Opportunity views", value: period === "7 days" ? "1,248" : "4,862", delta: "+12.4%" },
    { label: "Saves", value: period === "7 days" ? "186" : "702", delta: "+8.1%" },
    { label: "Application-link clicks", value: period === "7 days" ? "74" : "291", delta: "+5.6%" },
    { label: "Community feedback", value: "3", delta: "2 questions" },
  ];
  const activity = period === "7 days" ? [34, 48, 41, 68, 56, 82, 73] : [38, 54, 49, 63, 57, 72, 88, 66, 76, 91, 81, 96];

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-tangerine">ORGANIZATION REPORTING</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Analytics</h1>
          <p className="mt-2 text-sm text-muted">Aggregate engagement for this organization’s demo listings.</p>
        </div>
        <label className="block w-full sm:w-44">
          <span className="sr-only">Analytics date range</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)} className="field">
            <option>7 days</option>
            <option>30 days</option>
          </select>
        </label>
      </div>

      <p className="rounded-xl border border-peach-soft bg-peach px-4 py-3 text-xs text-muted">Illustrative demo metrics only. Views, saves, and clicks are not connected to real people; application-link clicks do not confirm a completed application.</p>

      <section aria-label="Organization engagement metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-sm font-medium text-muted">{metric.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-extrabold tabular-nums">{metric.value}</p>
              <span className="text-xs font-semibold text-emerald-700">{metric.delta}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold">Engagement trend</h2>
          <p className="mt-1 text-sm text-muted">Views and saves · sample daily activity</p>
          <div className="mt-6 flex h-48 items-end gap-2 border-b border-line pb-2 sm:gap-3">
            {activity.map((value, index) => (
              <div key={`${index}-${value}`} className="flex h-full flex-1 items-end gap-1" title={`${value} illustrative views`}>
                <div className="w-1/2 rounded-t bg-tangerine/80" style={{ height: `${value}%` }} />
                <div className="w-1/2 rounded-t bg-peach-soft" style={{ height: `${Math.max(12, value * 0.44)}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-tangerine" />Views</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-peach-soft" />Saves</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold">Listing performance</h2>
          <p className="mt-1 text-sm text-muted">Views by opportunity · sample</p>
          <div className="mt-5 space-y-4">
            {[
              { title: "Product Design Intern", views: "624", width: "88%" },
              { title: "Graduate Software Engineer", views: "412", width: "63%" },
              { title: "Women in STEM Fellowship", views: "212", width: "38%" },
            ].map((item) => (
              <div key={item.title}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{item.title}</span>
                  <span className="shrink-0 tabular-nums text-muted">{item.views}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#f1efed]">
                  <div className="h-full rounded-full bg-tangerine" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-line pt-4 text-sm">
            <div className="flex justify-between py-1.5"><span className="text-muted">Published</span><span className="font-semibold">1</span></div>
            <div className="flex justify-between py-1.5"><span className="text-muted">Under review</span><span className="font-semibold">1</span></div>
            <div className="flex justify-between py-1.5"><span className="text-muted">Needs changes</span><span className="font-semibold">1</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function OpportunityListPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="badge">Opportunity management</p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">My opportunities</h1>
        </div>
        <Link href="/organization/opportunities/new" className="btn btn-primary">Create draft</Link>
      </div>

      <div className="mt-8 space-y-4">
        {demoOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">{opportunity.title}</p>
                  <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${formatStatusTone(opportunity.status)}`}>{opportunity.status}</span>
                </div>
                <p className="mt-1 text-muted">{opportunity.category} · {opportunity.location} · Deadline {opportunity.deadline}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn btn-ghost">Edit</button>
                <button type="button" className="btn btn-primary">Submit for review</button>
              </div>
            </div>
            {opportunity.reviewFeedback && <p className="mt-3 rounded-xl border border-line bg-peach p-3 text-sm text-muted">Reviewer feedback: {opportunity.reviewFeedback}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OpportunityForm() {
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    title: "Community Data Mentor",
    category: "Jobs",
    organization: "North Star Careers",
    description: "Mentor young learners through a community training program.",
    eligibility: "Open to professionals with coaching or teaching experience.",
    location: "Addis Ababa",
    country: "Ethiopia",
    mode: "Hybrid",
    deadline: "2027-02-01",
    funding: "Not specified",
    officialUrl: "https://example.org/opportunities/community-data-mentor",
    applicationUrl: "https://example.org/apply/community-data-mentor",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function saveAsDraft() {
    setSuccess("Draft saved in the demo workspace.");
  }

  function submitForReview() {
    setSuccess("Submission queued for review. It now appears in the admin queue.");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <p className="badge">Opportunity submission</p>
        <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Create an opportunity</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Opportunity title</span>
            <input value={form.title} onChange={(e) => updateField("title", e.target.value)} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Category</span>
            <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="field">
              <option>Jobs</option>
              <option>Internships</option>
              <option>Scholarships</option>
              <option>Fellowships</option>
              <option>Grants</option>
              <option>Courses</option>
              <option>Events</option>
              <option>Competitions</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Organization</span>
            <input value={form.organization} onChange={(e) => updateField("organization", e.target.value)} className="field" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Full description</span>
            <textarea rows={5} value={form.description} onChange={(e) => updateField("description", e.target.value)} className="field resize-none p-3" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Eligibility</span>
            <textarea rows={3} value={form.eligibility} onChange={(e) => updateField("eligibility", e.target.value)} className="field resize-none p-3" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Country</span>
            <input value={form.country} onChange={(e) => updateField("country", e.target.value)} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Location</span>
            <input value={form.location} onChange={(e) => updateField("location", e.target.value)} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Mode</span>
            <select value={form.mode} onChange={(e) => updateField("mode", e.target.value)} className="field">
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Deadline</span>
            <input type="date" value={form.deadline} onChange={(e) => updateField("deadline", e.target.value)} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Funding or fees</span>
            <input value={form.funding} onChange={(e) => updateField("funding", e.target.value)} className="field" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Official announcement URL</span>
            <input value={form.officialUrl} onChange={(e) => updateField("officialUrl", e.target.value)} className="field" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Application URL</span>
            <input value={form.applicationUrl} onChange={(e) => updateField("applicationUrl", e.target.value)} className="field" />
          </label>
        </div>

        {success && <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{success}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn btn-ghost" onClick={saveAsDraft}>Save as draft</button>
          <button type="button" className="btn btn-primary" onClick={submitForReview}>Submit for review</button>
          <Link href="/organization/opportunities" className="btn btn-ghost">Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export function OrganizationProfilePage() {
  const profile = useOrganizationProfile();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const contactEmail = String(values.get("contactEmail") ?? "").trim();
    const website = String(values.get("website") ?? "").trim();
    const contactName = String(values.get("contactName") ?? "").trim();

    if (!name || !contactName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      setError("Add an organization name, representative, and valid contact email.");
      setNotice("");
      return;
    }
    try {
      const normalizedWebsite = new URL(website);
      if (normalizedWebsite.protocol !== "https:" && normalizedWebsite.protocol !== "http:") throw new Error("Invalid protocol");
      saveOrganizationProfile({
        ...profile,
        name,
        contactEmail,
        website: normalizedWebsite.toString(),
        type: String(values.get("type")) as typeof profile.type,
        country: String(values.get("country") ?? "").trim(),
        location: String(values.get("location") ?? "").trim(),
        contactName,
        jobTitle: String(values.get("jobTitle") ?? "").trim(),
        phone: String(values.get("phone") ?? "").trim(),
        description: String(values.get("description") ?? "").trim(),
        opportunityTypes: String(values.get("opportunityTypes") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
      });
      setError("");
      setNotice("Organization profile saved in this browser.");
    } catch (cause) {
      setNotice("");
      setError(cause instanceof Error && cause.message.includes("could not be saved")
        ? cause.message
        : "Enter a valid organization website beginning with http:// or https://.");
    }
  }

  return (
    <div className="space-y-6 py-2">
      <div>
        <p className="text-sm font-semibold text-tangerine">ORGANIZATION ACCOUNT</p>
        <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Organization profile</h1>
        <p className="mt-2 text-sm text-muted">Manage the organization details shown with your demo listings.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="relative h-40 sm:h-52">
          <Image src="/images/events.jpg" alt="A community event and learning session" fill sizes="(max-width: 768px) 100vw, 70vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Demo organization profile</p>
              <p className="mt-1 text-2xl font-bold">{profile.name}</p>
            </div>
            <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${formatStatusTone(profile.verificationStatus)}`}>Verification: {profile.verificationStatus}</span>
          </div>
        </div>
        <form onSubmit={saveProfile} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Official organization name</span>
            <input name="name" defaultValue={profile.name} required maxLength={100} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Organization type</span>
            <select name="type" defaultValue={profile.type} className="field">
              <option>Employer</option>
              <option>University</option>
              <option>Government institution</option>
              <option>NGO</option>
              <option>Scholarship provider</option>
              <option>Training institution</option>
              <option>Other legitimate organization</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Contact email</span>
            <input name="contactEmail" type="email" defaultValue={profile.contactEmail} required className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Representative name</span>
            <input name="contactName" defaultValue={profile.contactName} required className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Job title</span>
            <input name="jobTitle" defaultValue={profile.jobTitle} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Country</span>
            <input name="country" defaultValue={profile.country} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Location</span>
            <input name="location" defaultValue={profile.location} className="field" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Official website</span>
            <input name="website" type="url" defaultValue={profile.website} required className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Contact phone</span>
            <input name="phone" type="tel" defaultValue={profile.phone} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Opportunity types</span>
            <input name="opportunityTypes" defaultValue={profile.opportunityTypes.join(", ")} className="field" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Organization description</span>
            <textarea name="description" defaultValue={profile.description} rows={4} maxLength={600} className="field resize-y p-3" />
          </label>
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <button type="submit" className="btn btn-primary">Save organization profile</button>
            <span className="text-xs text-muted">Saved only in this browser for the demo.</span>
          </div>
          {error && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{error}</p>}
          {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 sm:col-span-2">{notice}</p>}
        </form>
      </div>
    </div>
  );
}

export function OrganizationSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <p className="badge">Organization settings</p>
        <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Settings and account details</h1>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Display name</span>
            <input defaultValue={demoOrganization.name} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Public contact email</span>
            <input defaultValue={demoOrganization.contactEmail} className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Organization website</span>
            <input defaultValue={demoOrganization.website} className="field" />
          </label>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  );
}

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("reviewer@upnext.demo");
  const [error, setError] = useState("");

  function login() {
    if (!email.trim()) {
      setError("Enter a demo reviewer email.");
      return;
    }
    window.localStorage.setItem("upnext-admin-session", JSON.stringify({ email, demo: true }));
    router.push("/admin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="badge">Demo reviewer mode</p>
        <h1 className="mt-3 text-3xl font-extrabold">Admin sign in</h1>
        <p className="mt-2 text-muted">This is a private reviewer tool for demonstrations only. It is not a real production authorization flow.</p>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Reviewer email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
          </label>
          <button type="button" className="btn btn-primary w-full" onClick={login}>Enter demo admin</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const cards = [
    { label: "Published listings", value: adminSummaryData.publishedListings, note: "Across the demo platform", href: "/admin/analytics", accent: "bg-emerald-500" },
    { label: "Opportunity reviews", value: adminSummaryData.pendingReviews, note: "Waiting for a decision", href: "/admin/reviews", accent: "bg-tangerine" },
    { label: "Organization checks", value: adminSummaryData.pendingOrganizations, note: "Verification queue", href: "/admin/organizations", accent: "bg-violet-500" },
    { label: "Open reports", value: adminSummaryData.unresolvedReports, note: "Need moderator attention", href: "/admin/reports", accent: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-tangerine">REVIEW DESK</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Platform overview</h1>
          <p className="mt-2 text-sm text-muted">Triage submissions, verification requests, and community reports.</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-peach-soft bg-peach px-3 py-1.5 text-xs font-semibold text-ink">Illustrative demo data</span>
      </div>

      <section aria-label="Platform summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-peach-soft hover:shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted">{card.label}</p>
              <span className={`h-2 w-2 rounded-full ${card.accent}`} aria-hidden="true" />
            </div>
            <p className="mt-4 text-3xl font-extrabold tabular-nums">{card.value}</p>
            <p className="mt-2 text-xs text-muted">{card.note}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
              <h2 className="text-xl font-bold">Review activity</h2>
              <p className="mt-1 text-sm text-muted">Decisions completed in the last seven demo days</p>
          </div>
            <Link href="/admin/analytics" className="text-sm font-semibold text-ink underline decoration-tangerine decoration-2 underline-offset-4">View analytics</Link>
          </div>
          <div className="mt-6 grid h-44 grid-cols-7 items-end gap-2 border-b border-line px-1 pb-2 sm:gap-4" aria-label="Daily review totals, illustrative: 8, 12, 9, 15, 11, 18, 14">
            {[8, 12, 9, 15, 11, 18, 14].map((value, index) => (
              <div key={index} className="flex h-full flex-col items-center justify-end gap-2">
                <span className="text-[11px] tabular-nums text-muted">{value}</span>
                <div title={`${value} demo decisions`} className="w-full max-w-12 rounded-t-lg bg-tangerine/80 transition-colors hover:bg-tangerine" style={{ height: `${(value / 18) * 72}%` }} />
                <span className="text-[10px] text-muted">{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Example counts only; no live reviewer activity is connected.</p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Needs attention</h2>
              <p className="mt-1 text-sm text-muted">Demo queue summaries</p>
            </div>
            <span className="badge">Today</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { label: "Opportunity submissions", count: adminSummaryData.pendingReviews, href: "/admin/reviews" },
              { label: "Organization verifications", count: adminSummaryData.pendingOrganizations, href: "/admin/organizations" },
              { label: "Unresolved reports", count: adminSummaryData.unresolvedReports, href: "/admin/reports" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between rounded-xl border border-line px-3 py-3 transition hover:bg-[#faf9f7]">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="rounded-full bg-peach px-2.5 py-1 text-xs font-bold tabular-nums">{item.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <p className="rounded-xl border border-line bg-white px-4 py-3 text-xs text-muted">All figures on this prototype dashboard are illustrative. Reviewer access and decisions are not secured or persisted to a backend.</p>
    </div>
  );
}

export function AdminOrganizationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Organization verification queue</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-peach text-sm uppercase tracking-[0.08em] text-muted">
            <tr>
              <th className="px-4 py-3">Organization</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Representative</th>
            </tr>
          </thead>
          <tbody>
            {[{ ...demoOrganization, verificationStatus: "Pending review" }, { ...demoOrganization, name: "Bright Future Labs", verificationStatus: "Verified" }].map((org) => (
              <tr key={org.id + org.name} className="border-t border-line">
                <td className="px-4 py-3">{org.name}</td>
                <td className="px-4 py-3">{org.type}</td>
                <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${formatStatusTone(org.verificationStatus)}`}>{org.verificationStatus}</span></td>
                <td className="px-4 py-3">{org.contactName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Opportunity review queue</h1>
      <div className="mt-6 space-y-4">
        {demoOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xl font-bold">{opportunity.title}</p>
                <p className="mt-1 text-sm text-muted">{opportunity.organization} · {opportunity.category}</p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${formatStatusTone(opportunity.status)}`}>{opportunity.status}</span>
            </div>
            <p className="mt-3 text-muted">{opportunity.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary">Approve</button>
              <button type="button" className="btn btn-ghost">Request changes</button>
              <button type="button" className="btn btn-ghost">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminReportsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Moderation queue</h1>
      <div className="mt-6 space-y-4">
        {demoReports.map((report) => (
          <div key={report.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xl font-bold">{report.opportunityTitle}</p>
                <p className="mt-1 text-sm text-muted">{report.reason} · {report.severity} severity</p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${formatStatusTone(report.status)}`}>{report.status}</span>
            </div>
            <p className="mt-3 text-muted">{report.explanation}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary">Resolve</button>
              <button type="button" className="btn btn-ghost">Escalate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminAnalyticsPage() {
  const metricCards = [
    { label: "Published opportunities", value: adminSummaryData.publishedListings, detail: "Current demo total", tint: "text-emerald-700", dot: "bg-emerald-500" },
    { label: "Pending reviews", value: adminSummaryData.pendingReviews, detail: "Opportunity submissions", tint: "text-amber-700", dot: "bg-amber-500" },
    { label: "Organization checks", value: adminSummaryData.pendingOrganizations, detail: "Awaiting a decision", tint: "text-violet-700", dot: "bg-violet-500" },
    { label: "Unresolved reports", value: adminSummaryData.unresolvedReports, detail: "Needs moderator review", tint: "text-rose-700", dot: "bg-rose-500" },
    { label: "Expired listings", value: adminSummaryData.expiredListings, detail: "Not currently active", tint: "text-slate-700", dot: "bg-slate-400" },
    { label: "Comments to moderate", value: adminSummaryData.commentsAwaitingModeration, detail: "Illustrative queue", tint: "text-orange-700", dot: "bg-orange-500" },
  ];
  const categories = [
    { label: "Jobs", count: 42, width: "84%" },
    { label: "Scholarships", count: 31, width: "62%" },
    { label: "Internships", count: 28, width: "56%" },
    { label: "Courses", count: 19, width: "38%" },
    { label: "Other", count: 12, width: "24%" },
  ];
  const trend = [
    { label: "Mon", value: 9 },
    { label: "Tue", value: 13 },
    { label: "Wed", value: 11 },
    { label: "Thu", value: 18 },
    { label: "Fri", value: 15 },
    { label: "Sat", value: 22 },
    { label: "Sun", value: 19 },
  ];

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-tangerine">PLATFORM REPORTING</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Analytics</h1>
          <p className="mt-2 text-sm text-muted">Review volume, listing mix, and moderation workload.</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-peach-soft bg-peach px-3 py-1.5 text-xs font-semibold">Illustrative demo data · Last 7 days</span>
      </div>

      <section aria-label="Platform metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metricCards.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${metric.dot}`} aria-hidden="true" />
              <p className="text-sm font-medium text-muted">{metric.label}</p>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-extrabold tabular-nums">{metric.value}</p>
              <p className={`text-xs font-semibold ${metric.tint}`}>{metric.detail}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Review decisions over time</h2>
              <p className="mt-1 text-sm text-muted">Daily decisions · illustrative count</p>
            </div>
            <span className="badge">Last 7 days</span>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-[2rem_1fr] gap-2">
              <div className="flex flex-col justify-between pb-6 text-[10px] text-muted" aria-hidden="true"><span>24</span><span>16</span><span>8</span><span>0</span></div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[calc(100%-1.5rem)] flex-col justify-between" aria-hidden="true">
                  {[0, 1, 2, 3].map((line) => <span key={line} className="border-t border-dashed border-line" />)}
                </div>
                <svg viewBox="0 0 700 180" role="img" aria-label="Illustrative daily review decisions: Monday 9, Tuesday 13, Wednesday 11, Thursday 18, Friday 15, Saturday 22, Sunday 19" className="relative h-44 w-full overflow-visible">
                  <polyline points="0,112 116,82 233,97 350,52 466,67 583,22 700,37" fill="none" stroke="#ff642e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  {trend.map((point, index) => (
                    <circle key={point.label} cx={index * (700 / 6)} cy={180 - point.value * 7.2} r="5" fill="white" stroke="#ff642e" strokeWidth="3">
                      <title>{point.label}: {point.value} demo decisions</title>
                    </circle>
                  ))}
                </svg>
                <div className="grid grid-cols-7 text-center text-[10px] text-muted">
                  {trend.map((point) => <span key={point.label}>{point.label}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold">Published listing mix</h2>
          <p className="mt-1 text-sm text-muted">By opportunity category · example counts</p>
          <div className="mt-5 space-y-4">
            {categories.map((category) => (
              <div key={category.label}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <span className="font-medium">{category.label}</span>
                  <span className="tabular-nums text-muted">{category.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#f1efed]">
                  <div className="h-full rounded-full bg-tangerine" style={{ width: category.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rounded-xl border border-line bg-white px-4 py-3 text-xs text-muted">
        Prototype analytics are centralized illustrative figures, not live platform activity. Report volume is a review signal only and does not establish wrongdoing.
      </div>
    </div>
  );
}

export function DemoCommentsList() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Community feedback</h1>
      <div className="mt-6 space-y-4">
        {demoComments.map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold">{comment.author}</p>
              <span className="badge">{comment.kind}</span>
            </div>
            <p className="mt-3 text-muted">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoReportOpportunity() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="badge">Report opportunity</p>
        <h1 className="mt-3 text-3xl font-extrabold">Flag a listing</h1>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Reason</span>
            <select className="field">
              <option>Suspicious or potentially fraudulent</option>
              <option>Incorrect deadline or eligibility</option>
              <option>Broken application link</option>
              <option>Expired opportunity</option>
              <option>Misleading funding, salary, or fees</option>
              <option>Duplicate listing</option>
              <option>Other</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Optional explanation</span>
            <textarea rows={4} className="field resize-none p-3" />
          </label>
          <button type="button" className="btn btn-primary" onClick={() => setSubmitted(true)}>Submit report</button>
          {submitted && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Your demo report was submitted to the moderator queue.</p>}
        </div>
      </div>
    </div>
  );
}

export function WorkspaceCallout() {
  return (
    <div className="mx-auto mt-8 max-w-6xl px-4">
      <div className="rounded-2xl border border-line bg-white p-5 text-sm text-muted">
        <div className="flex items-center gap-2 text-ink"><Sparkles size={16} className="text-tangerine" aria-hidden="true" /> Demo-only prototype</div>
        <p className="mt-2">Organization and reviewer workflows are simulated and clearly labeled. This is designed to match the product vision while the backend is built later.</p>
      </div>
    </div>
  );
}

export function OrganizationShell() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AnimatePresence mode="wait">
        <motion.div key="workspace-shell" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center gap-2"><UserRoundCheck className="text-tangerine" size={18} aria-hidden="true" /><span className="font-semibold">Organization workspace</span></div>
            <p className="mt-2 text-muted">This variation extends the UpNext experience for providers, reviewers, and platform administrators.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/organization/login" className="btn btn-primary">Organization sign in</Link>
              <Link href="/admin/login" className="btn btn-ghost">Reviewer access</Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function DemoLandingPrompt() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-line bg-peach p-5 text-sm text-muted">
        <div className="flex items-center gap-2 font-semibold text-ink"><FileCheck2 size={16} className="text-tangerine" aria-hidden="true" /> Product demo</div>
        <p className="mt-2">You can switch between the public student site, the organization workspace, and the reviewer interface without changing the core UpNext experience.</p>
      </div>
    </div>
  );
}
