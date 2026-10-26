import type { Metadata } from "next";
import { OpportunityListPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "My opportunities",
  description: "Manage opportunity drafts and review statuses.",
  alternates: { canonical: "/organization/opportunities" },
};

export default function Page() {
  return <OpportunityListPage />;
}
