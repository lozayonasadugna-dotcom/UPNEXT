import type { Metadata } from "next";
import { OrganizationProfilePage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization profile",
  description: "Manage your organization profile and representative information.",
  alternates: { canonical: "/organization/profile" },
};

export default function Page() {
  return <OrganizationProfilePage />;
}
