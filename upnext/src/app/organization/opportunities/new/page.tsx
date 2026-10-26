import type { Metadata } from "next";
import { OpportunityForm } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Create an opportunity",
  description: "Post a new opportunity draft or submit it for review.",
  alternates: { canonical: "/organization/opportunities/new" },
};

export default function Page() {
  return <OpportunityForm />;
}
