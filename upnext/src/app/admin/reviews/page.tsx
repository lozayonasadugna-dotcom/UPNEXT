import type { Metadata } from "next";
import { AdminReviewsPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Opportunity review queue",
  description: "Review submitted opportunities and approve or moderate them.",
  alternates: { canonical: "/admin/reviews" },
};

export default function Page() {
  return <AdminReviewsPage />;
}
