import { cacheLife } from "next/cache";
import { normalizeArbeitnowJobs } from "@/lib/live-jobs";

export async function GET() {
  try {
    const jobs = await getLiveJobs();
    return Response.json({ jobs });
  } catch (error) {
    console.error("Could not load the Arbeitnow job feed.", error);
    return Response.json({ error: "The live jobs feed is temporarily unavailable." }, { status: 502 });
  }
}

async function getLiveJobs() {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 21600, expire: 86400 });

  const response = await fetch("https://www.arbeitnow.com/api/job-board-api", {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error("Arbeitnow returned an unsuccessful response: " + response.status);
  }

  const payload: unknown = await response.json();
  const jobs = normalizeArbeitnowJobs(payload);
  if (!jobs.length) throw new Error("Arbeitnow returned no valid job records.");
  return jobs;
}
