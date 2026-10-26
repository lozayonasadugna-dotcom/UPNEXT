import type { Metadata } from "next";
import { AdminAnalyticsPage } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Platform analytics",
  description: "View illustrative platform-wide analytics for review and moderation.",
  alternates: { canonical: "/admin/analytics" },
};

export default function Page() {
  return <AdminAnalyticsPage />;
}
