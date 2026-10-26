import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-extrabold">Terms of Service</h1>
      <p className="mt-3 rounded-lg border border-tangerine bg-peach p-3 text-sm font-medium">Draft for review. A lawyer has not reviewed this text.</p>
      <h2 className="mt-8 text-2xl font-bold">How listings work</h2>
      <p className="mt-2 text-muted">UpNext links to official sources. You apply on the official site. UpNext does not submit applications for you.</p>
      <h2 className="mt-8 text-2xl font-bold">Verification</h2>
      <p className="mt-2 text-muted">Editors check each listing against its source and record the date. UpNext does not guarantee that any listing is legitimate or still open. Confirm details with the official source.</p>
    </div>
  );
}
