import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/WorkspaceDemo";

export const metadata: Metadata = {
  title: "Admin login",
  description: "Demo reviewer sign-in for the private admin workspace.",
  alternates: { canonical: "/admin/login" },
};

export default function Page() {
  return <AdminLoginForm />;
}
