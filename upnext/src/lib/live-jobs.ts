export interface LiveJob {
  id: string;
  url: string;
  title: string;
  company: string;
  tags: string[];
  jobType: string;
  publicationDate: string;
  location: string;
  remote: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function safeArbeitnowUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["arbeitnow.com", "www.arbeitnow.com"].includes(url.hostname) ? url.href : null;
  } catch {
    return null;
  }
}

export function isLiveJob(value: unknown): value is LiveJob {
  return isRecord(value) &&
    typeof value.id === "string" &&
    safeArbeitnowUrl(value.url) !== null &&
    typeof value.title === "string" &&
    typeof value.company === "string" &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string") &&
    typeof value.jobType === "string" &&
    typeof value.publicationDate === "string" &&
    typeof value.location === "string" &&
    typeof value.remote === "boolean";
}

export function normalizeArbeitnowJobs(value: unknown): LiveJob[] {
  if (!isRecord(value) || !Array.isArray(value.data)) return [];

  return value.data.flatMap((entry): LiveJob[] => {
    if (!isRecord(entry)) return [];
    const url = safeArbeitnowUrl(entry.url);
    if (
      !url ||
      typeof entry.slug !== "string" ||
      typeof entry.title !== "string" ||
      typeof entry.company_name !== "string" ||
      typeof entry.created_at !== "number" ||
      !Number.isFinite(entry.created_at) ||
      entry.created_at <= 0
    ) return [];

    const tags = Array.isArray(entry.tags)
      ? entry.tags.filter((tag): tag is string => typeof tag === "string").slice(0, 5)
      : [];
    const jobTypes = Array.isArray(entry.job_types)
      ? entry.job_types.filter((jobType): jobType is string => typeof jobType === "string")
      : [];

    return [{
      id: entry.slug,
      url,
      title: entry.title,
      company: entry.company_name,
      tags,
      jobType: jobTypes.length ? jobTypes.join(" · ") : "Job",
      publicationDate: new Date(entry.created_at * 1000).toISOString(),
      location: typeof entry.location === "string" && entry.location.trim() ? entry.location : "Germany",
      remote: entry.remote === true,
    }];
  });
}
