import type { Metadata } from "next";
import { OrganizationRegistrationForm } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Register your organization",
  description: "Create a demo organization profile and start the verification workflow.",
  alternates: { canonical: "/organization/register" },
};

export default function Page() {
  return <OrganizationRegistrationForm />;
}
