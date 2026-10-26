import type { Opportunity } from "./types";

export function daysLeft(deadline: string | null): number | null {
  if (!deadline) return null;
  const end = new Date(deadline + "T23:59:59").getTime();
  return Math.ceil((end - Date.now()) / 86400000);
}

export function isClosed(o: Opportunity): boolean {
  const d = daysLeft(o.deadline);
  return o.status !== "Published" || (d !== null && d < 0);
}

export function deadlineLabel(o: Opportunity): string {
  if (o.status === "Withdrawn") return "Withdrawn";
  if (o.status === "Expired") return "Expired";
  const d = daysLeft(o.deadline);
  if (d === null) return "Deadline not provided";
  if (d < 0) return "Closed";
  if (d === 0) return "Closes today";
  if (d === 1) return "1 day left";
  return d + " days left";
}

export function formatDate(iso: string | null): string {
  if (!iso) return "Not provided";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
