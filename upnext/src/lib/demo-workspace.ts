export type OrganizationType =
  | "Employer"
  | "University"
  | "Government institution"
  | "NGO"
  | "Scholarship provider"
  | "Training institution"
  | "Other legitimate organization";

export type VerificationStatus =
  | "Not submitted"
  | "Pending review"
  | "Verified"
  | "Changes requested"
  | "Rejected"
  | "Suspended";

export type SubmissionStatus =
  | "Draft"
  | "Submitted"
  | "Under review"
  | "Changes requested"
  | "Approved / Published"
  | "Rejected"
  | "Expired"
  | "Withdrawn";

export type ReportReason =
  | "Suspicious or potentially fraudulent"
  | "Incorrect deadline or eligibility"
  | "Broken application link"
  | "Expired opportunity"
  | "Misleading funding, salary, or fees"
  | "Duplicate listing"
  | "Other";

export interface OrganizationProfile {
  id: string;
  name: string;
  type: OrganizationType;
  country: string;
  location: string;
  website: string;
  contactEmail: string;
  contactName: string;
  jobTitle: string;
  phone: string;
  description: string;
  opportunityTypes: string[];
  verificationStatus: VerificationStatus;
  verificationSteps: string[];
  demoNote: string;
}

export interface OpportunitySubmission {
  id: string;
  title: string;
  category: string;
  organization: string;
  description: string;
  eligibility: string;
  country: string;
  location: string;
  mode: "Remote" | "Hybrid" | "On-site";
  deadline: string;
  funding: string;
  officialUrl: string;
  applicationUrl: string;
  status: SubmissionStatus;
  reviewFeedback: string;
  createdAt: string;
  lastUpdated: string;
}

export interface ModerationReport {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  reporter: string;
  reason: ReportReason;
  explanation: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "Under review" | "Resolved" | "Dismissed" | "Escalated";
  createdAt: string;
}

export const demoOrganization: OrganizationProfile = {
  id: "org-demo-01",
  name: "North Star Careers",
  type: "Employer",
  country: "Ethiopia",
  location: "Addis Ababa",
  website: "https://example.org",
  contactEmail: "hello@example.org",
  contactName: "Marta Bekele",
  jobTitle: "Partnerships Lead",
  phone: "+251 911 000 000",
  description: "A regional employer and training partner connecting students and early-career professionals with meaningful opportunities.",
  opportunityTypes: ["Jobs", "Internships", "Training programs", "Events"],
  verificationStatus: "Pending review",
  verificationSteps: [
    "Account created",
    "Email confirmed",
    "Website submitted",
    "Evidence uploaded",
    "Under review",
    "Decision pending",
    "Opportunity review ready",
    "Approved listing workflow",
  ],
  demoNote: "Demo org profile for prototype workflow only.",
};

export const demoOpportunities: OpportunitySubmission[] = [
  {
    id: "opp-101",
    title: "Product Design Intern",
    category: "Internships",
    organization: "North Star Careers",
    description: "Support product research and interface iteration for a digital learning platform.",
    eligibility: "Final-year students or recent graduates with a portfolio.",
    country: "Ethiopia",
    location: "Addis Ababa",
    mode: "Hybrid",
    deadline: "2027-02-15",
    funding: "Stipend available",
    officialUrl: "https://example.org/opportunities/design-intern",
    applicationUrl: "https://example.org/apply/design-intern",
    status: "Approved / Published",
    reviewFeedback: "Approved in demo review. Listing is visible in the public discovery page.",
    createdAt: "2026-10-01",
    lastUpdated: "2026-10-12",
  },
  {
    id: "opp-102",
    title: "Graduate Software Engineer",
    category: "Jobs",
    organization: "North Star Careers",
    description: "Build a customer-facing learning product with a small engineering team.",
    eligibility: "Bachelor's degree and at least one portfolio project.",
    country: "Kenya",
    location: "Remote",
    mode: "Remote",
    deadline: "2026-12-20",
    funding: "Competitive salary",
    officialUrl: "https://example.org/jobs/engineer",
    applicationUrl: "https://example.org/apply/engineer",
    status: "Under review",
    reviewFeedback: "Waiting for reviewer decision.",
    createdAt: "2026-10-15",
    lastUpdated: "2026-10-22",
  },
  {
    id: "opp-103",
    title: "Women in STEM Fellowship",
    category: "Scholarships",
    organization: "North Star Careers",
    description: "A fellowship for early-career women building careers in digital fields.",
    eligibility: "Open to female students and recent graduates in STEM.",
    country: "Ethiopia",
    location: "Addis Ababa",
    mode: "On-site",
    deadline: "2027-01-10",
    funding: "Tuition and stipend support",
    officialUrl: "https://example.org/fellowships/women-stem",
    applicationUrl: "https://example.org/apply/women-stem",
    status: "Changes requested",
    reviewFeedback: "Please confirm the funding details and final deadline before publication.",
    createdAt: "2026-10-10",
    lastUpdated: "2026-10-20",
  },
];

export const demoReports: ModerationReport[] = [
  {
    id: "rep-01",
    opportunityId: "opp-101",
    opportunityTitle: "Product Design Intern",
    reporter: "Guest user",
    reason: "Broken application link",
    explanation: "The application URL returned a 404 error when it was tested.",
    severity: "Medium",
    status: "Under review",
    createdAt: "2026-10-18",
  },
  {
    id: "rep-02",
    opportunityId: "opp-103",
    opportunityTitle: "Women in STEM Fellowship",
    reporter: "Demo student",
    reason: "Misleading funding, salary, or fees",
    explanation: "The funding information was inconsistent with the official source shown in the listing.",
    severity: "High",
    status: "Open",
    createdAt: "2026-10-21",
  },
];

export const demoComments = [
  { id: "c-1", author: "Aisha", kind: "Helpful information", text: "The description looks accurate and the contact email was responsive." },
  { id: "c-2", author: "Daniel", kind: "Question", text: "Is there a remote option for the internship if I am outside Addis Ababa?" },
];

export const orgChecklist = [
  "Create an organization account",
  "Confirm the organization email",
  "Submit official website and identity info",
  "Provide evidence of legitimacy",
  "Reviewers inspect the organization",
  "Decision or follow-up request sent",
  "Approved organization submits an opportunity",
  "Reviewer approves, requests changes, or rejects",
];

export const adminSummaryData = {
  publishedListings: 128,
  pendingReviews: 14,
  pendingOrganizations: 9,
  unresolvedReports: 7,
  commentsAwaitingModeration: 5,
  expiredListings: 18,
};
