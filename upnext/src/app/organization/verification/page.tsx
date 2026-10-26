import type { Metadata } from "next";
import { OrganizationVerificationPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization verification",
  description: "Track an organization's verification progress and steps.",
  alternates: { canonical: "/organization/verification" },
};

export default function Page() {
  return <OrganizationVerificationPage />;
}
