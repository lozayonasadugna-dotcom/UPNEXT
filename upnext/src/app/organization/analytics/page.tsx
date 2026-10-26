import type { Metadata } from "next";
import { OrganizationAnalyticsPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization analytics",
  description: "Illustrative engagement analytics for organization opportunity listings.",
  alternates: { canonical: "/organization/analytics" },
};

export default function Page() {
  return <OrganizationAnalyticsPage />;
}
