import type { Metadata } from "next";
import { OrganizationDashboard } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization dashboard",
  description: "Overview of your organization workspace, listings, and verification status.",
  alternates: { canonical: "/organization/dashboard" },
};

export default function Page() {
  return <OrganizationDashboard />;
}
