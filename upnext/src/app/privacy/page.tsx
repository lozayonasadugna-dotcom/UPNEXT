import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-3 rounded-lg border border-tangerine bg-peach p-3 text-sm font-medium">Draft for review. A lawyer has not reviewed this text.</p>
      <h2 className="mt-8 text-2xl font-bold">What UpNext stores</h2>
      <p className="mt-2 text-muted">Without an account, your saved items, tasks, and notes stay in your browser storage. With an account, they will be stored in your private Supabase records.</p>
      <h2 className="mt-8 text-2xl font-bold">What UpNext collects</h2>
      <p className="mt-2 text-muted">Only the information needed to run the service, such as your email and the profile fields you choose to add.</p>
      <h2 className="mt-8 text-2xl font-bold">Your control</h2>
      <p className="mt-2 text-muted">You will be able to edit your profile and delete your data. Contact details will be added before launch.</p>
    </div>
  );
}
