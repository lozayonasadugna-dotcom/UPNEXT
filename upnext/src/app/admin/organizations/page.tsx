import type { Metadata } from "next";
import { AdminOrganizationsPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization verification queue",
  description: "Review organization verification requests and statuses.",
  alternates: { canonical: "/admin/organizations" },
};

export default function Page() {
  return <AdminOrganizationsPage />;
}
