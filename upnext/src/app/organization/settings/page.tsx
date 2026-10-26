import type { Metadata } from "next";
import { OrganizationSettingsPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization settings",
  description: "Update the organization account and public-facing details.",
  alternates: { canonical: "/organization/settings" },
};

export default function Page() {
  return <OrganizationSettingsPage />;
}
