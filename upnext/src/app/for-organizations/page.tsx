import type { Metadata } from "next";
import { OrganizationLandingPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "For Organizations",
  description: "Register an organization, verify your profile, and publish opportunities on UpNext.",
  alternates: { canonical: "/for-organizations" },
};

export default function Page() {
  return <OrganizationLandingPage />;
}
