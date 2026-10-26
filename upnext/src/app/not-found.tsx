import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-5xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-muted">This page does not exist or has moved.</p>
      <Link href="/discover" className="btn btn-primary mt-6">Explore opportunities</Link>
    </div>
  );
}
