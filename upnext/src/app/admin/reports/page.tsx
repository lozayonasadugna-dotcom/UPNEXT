import type { Metadata } from "next";
import { AdminReportsPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Moderation queue",
  description: "Review reports, escalations, and moderation outcomes.",
  alternates: { canonical: "/admin/reports" },
};

export default function Page() {
  return <AdminReportsPage />;
}
