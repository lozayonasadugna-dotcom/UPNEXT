export type Category = "Jobs" | "Internships" | "Scholarships" | "Online Courses" | "Volunteer" | "Competitions" | "Grants" | "Events";
export type Mode = "Remote" | "Hybrid" | "On-site";
export type OppStatus = "Published" | "Expired" | "Withdrawn";

export interface Opportunity {
  slug: string;
  title: string;
  org: string;
  category: Category;
  country: string;
  location: string;
  mode: Mode;
  deadline: string | null;
  timezone: string | null;
  postedAt: string;
  skills: string[];
  eligibility: string[];
  description: string;
  documents: string[];
  funding: string | null;
  sourceUrl: string;
  applyUrl: string;
  lastVerified: string | null;
  status: OppStatus;
  illustrative: boolean;
}

export type AppStatus =
  | "Interested" | "Preparing" | "Applied" | "Interviewing"
  | "Offered" | "Rejected" | "Withdrawn" | "Expired";

export const APP_STATUSES: AppStatus[] = [
  "Interested", "Preparing", "Applied", "Interviewing", "Offered", "Rejected", "Withdrawn", "Expired",
];

export const CATEGORIES: Category[] = ["Jobs", "Internships", "Scholarships", "Online Courses", "Volunteer", "Competitions", "Grants", "Events"];
