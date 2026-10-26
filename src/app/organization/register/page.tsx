import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Register Organization" };

export default function Page() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-4xl font-extrabold">Register Organization</h1>
      <p className="mt-3 text-muted">The demonstration registration form opens in the next build step. Nothing here creates a real account.</p>
      <Link href="/for-organizations" className="btn btn-primary mt-6">Back to For Organizations</Link>
    </div>
  );
}
