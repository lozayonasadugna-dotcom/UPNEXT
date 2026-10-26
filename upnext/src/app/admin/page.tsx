import type { Metadata } from "next";
import { AdminDashboard } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Overview of approvals, moderation, and platform analytics.",
  alternates: { canonical: "/admin" },
};

export default function Page() {
  return <AdminDashboard />;
}
