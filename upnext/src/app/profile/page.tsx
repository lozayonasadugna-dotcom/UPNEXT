import type { Metadata } from "next";
import ProfileDashboard from "@/components/ProfileDashboard";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Manage your UpNext profile and track your application progress.",
};

export default function Page() {
  return <ProfileDashboard />;
}
