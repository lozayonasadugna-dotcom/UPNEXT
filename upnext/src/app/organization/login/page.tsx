import type { Metadata } from "next";
import { OrganizationLoginForm } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Organization sign in",
  description: "Demo sign-in for the organization workspace.",
  alternates: { canonical: "/organization/login" },
};

export default function Page() {
  return <OrganizationLoginForm />;
}
