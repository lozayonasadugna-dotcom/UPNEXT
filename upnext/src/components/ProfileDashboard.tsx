"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, CreditCard, ImagePlus, LogOut, Sparkles } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/lib/store";
import { updateProfile, useProfile } from "@/lib/profile-store";
import { getOpportunity } from "@/lib/data";

const avatars = [
  { name: "Alex", seed: "Alex" },
  { name: "Amara", seed: "Amara" },
  { name: "Jordan", seed: "Jordan" },
  { name: "Morgan", seed: "Morgan" },
  { name: "Riley", seed: "Riley" },
  { name: "Sam", seed: "Sam" },
];
const checkout = process.env.NEXT_PUBLIC_CHECKOUT_URL?.startsWith("https://") ? process.env.NEXT_PUBLIC_CHECKOUT_URL : null;

export default function ProfileDashboard() {
  const router = useRouter();
  const [supabase] = useState(createClient);
  const profile = useProfile();
  const { tracked, saved, tasks } = useStore();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      const metadataName = session?.user.user_metadata.username;
      if (typeof metadataName === "string") setName(metadataName);
    });
    void supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError) {
        setError(authError.message);
        return;
      }
      setUser(data.user);
      const metadataName = data.user?.user_metadata.username;
      if (typeof metadataName === "string") setName(metadataName);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const items = Object.values(tracked)
    .map((record) => ({ record, opportunity: getOpportunity(record.slug) }))
    .filter((item): item is { record: (typeof tracked)[string]; opportunity: NonNullable<ReturnType<typeof getOpportunity>> } => !!item.opportunity);
  const doneTasks = tasks.filter((task) => task.done).length;
  const totalTasks = tasks.length;

  async function saveProfile() {
    setBusy(true);
    setNotice("");
    setError("");
    const username = (name ?? profile.username).trim();
    if (username.length < 2 || username.length > 32) {
      setError("Your username must be between 2 and 32 characters.");
      setBusy(false);
      return;
    }
    try {
      updateProfile({ username });
      if (supabase && user) {
        const avatarUrl = profile.avatar?.startsWith("https://") ? profile.avatar : null;
        const { error: updateError } = await supabase.auth.updateUser({ data: { username, avatar_url: avatarUrl } });
        if (updateError) throw updateError;
      }
      setNotice(user ? "Profile saved to your account and this browser." : "Profile saved in this browser. Sign in to connect an account.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your profile could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file to upload.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Choose an image smaller than 10 MB.");
      return;
    }
    try {
      const image = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 512 / Math.max(image.width, image.height));
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not process this image.");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.close();
      updateProfile({ avatar: canvas.toDataURL("image/jpeg", 0.8) });
      setError("");
      setNotice("Your photo has been saved in this browser.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not load that image.");
    }
  }

  async function signOut() {
    if (!supabase) return;
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      return;
    }
    setUser(null);
    router.refresh();
  }

  const avatarSource = profile.avatar ?? "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge"><Sparkles size={14} aria-hidden="true" /> Your UpNext space</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Your profile</h1>
          <p className="mt-2 text-muted">{user ? user.email : "Your local profile and application progress."}</p>
        </div>
        {user ? (
          <button type="button" onClick={signOut} className="btn btn-ghost"><LogOut size={17} aria-hidden="true" /> Sign out</button>
        ) : (
          <span className="badge">Guest profile · sync coming later</span>
        )}
      </div>

      {!user && <p className="mt-6 rounded-xl border border-line bg-peach p-4 text-sm text-muted">You are using a guest profile. Your tracked opportunities and uploaded photo are saved on this device; account sync is planned for later.</p>}

      <section className="mt-6 rounded-2xl border border-line bg-white p-6" aria-labelledby="profile-settings">
        <h2 id="profile-settings" className="text-2xl font-bold">Profile details</h2>
        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white bg-peach shadow-md">
            <Image src={avatarSource} alt="Selected profile avatar" fill unoptimized sizes="96px" className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Choose an avatar</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {avatars.map((avatar) => {
                const url = "https://api.dicebear.com/9.x/avataaars/svg?seed=" + avatar.seed;
                return (
                  <button key={avatar.seed} type="button" onClick={() => { updateProfile({ avatar: url }); setNotice(""); setError(""); }} aria-label={"Choose " + avatar.name + " avatar"} aria-pressed={profile.avatar === url} className={"relative h-14 w-14 overflow-hidden rounded-full border-2 bg-peach transition-transform hover:scale-110 " + (profile.avatar === url ? "border-tangerine" : "border-line")}>
                    <Image src={url} alt="" fill unoptimized sizes="56px" className="object-cover" />
                    {profile.avatar === url && <span className="absolute bottom-0 right-0 rounded-full bg-tangerine p-0.5"><Check size={12} aria-hidden="true" /></span>}
                  </button>
                );
              })}
              <label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-line text-muted transition-colors hover:border-tangerine hover:text-ink" title="Upload a profile photo">
                <ImagePlus size={21} aria-hidden="true" />
                <span className="sr-only">Upload a profile photo</span>
                <input type="file" accept="image/*" className="sr-only" onChange={uploadAvatar} />
              </label>
            </div>
            <p className="mt-2 text-xs text-muted">Avatars are provided by DiceBear. Uploaded photos are resized and stored in this browser only.</p>
          </div>
        </div>
        <label htmlFor="username" className="mt-6 block text-sm font-semibold">Username
          <input id="username" maxLength={32} minLength={2} value={name ?? profile.username} onChange={(event) => setName(event.target.value)} placeholder="Choose a username" className="field mt-1 max-w-md" />
        </label>
        {error && <p role="alert" className="mt-4 text-sm font-medium text-red-800">{error}</p>}
        {notice && <p role="status" className="mt-4 text-sm font-medium text-green-800">{notice}</p>}
        <button type="button" disabled={busy} onClick={saveProfile} className="btn btn-primary mt-4 disabled:opacity-60">{busy ? "Saving..." : "Save profile"}</button>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Progress overview">
        <div className="rounded-xl border border-line bg-white p-5"><p className="text-sm text-muted">Tracked opportunities</p><p className="mt-1 text-3xl font-extrabold">{items.length}</p></div>
        <div className="rounded-xl border border-line bg-white p-5"><p className="text-sm text-muted">Saved opportunities</p><p className="mt-1 text-3xl font-extrabold">{saved.length}</p></div>
        <div className="rounded-xl border border-line bg-white p-5"><p className="text-sm text-muted">Tasks complete</p><p className="tnum mt-1 text-3xl font-extrabold">{doneTasks}<span className="text-lg text-muted"> / {totalTasks}</span></p></div>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-6" aria-labelledby="application-progress">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h2 id="application-progress" className="text-2xl font-bold">Application progress</h2><p className="mt-1 text-sm text-muted">Your current status for each opportunity in My Next Move.</p></div>
          <Link href="/my-next-move" className="text-sm font-semibold underline decoration-tangerine decoration-2 underline-offset-4">Manage tracking</Link>
        </div>
        {items.length ? (
          <ul className="mt-5 divide-y divide-line">
            {items.map(({ record, opportunity }) => {
              const opportunityTasks = tasks.filter((task) => task.slug === record.slug);
              const completed = opportunityTasks.filter((task) => task.done).length;
              const percent = opportunityTasks.length ? Math.round((completed / opportunityTasks.length) * 100) : 0;
              return (
                <li key={record.slug} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link href={"/opportunities/" + opportunity.slug} className="font-semibold hover:underline">{opportunity.title}</Link>
                    <span className="badge">{record.status}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-peach-soft" role="progressbar" aria-label={"Task progress for " + opportunity.title} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-tangerine transition-[width] duration-300" style={{ width: percent + "%" }} />
                  </div>
                  <p className="tnum mt-1 text-xs text-muted">{opportunityTasks.length ? completed + " of " + opportunityTasks.length + " tasks complete" : "No tasks added yet"} · Status: {record.status}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-5 rounded-xl bg-peach p-5">
            <p className="font-semibold">Your application tracker is ready when you are.</p>
            <p className="mt-1 text-sm text-muted">Save an opportunity or add one to My Next Move to start tracking progress.</p>
            <Link href="/discover" className="btn btn-primary mt-4">Discover opportunities</Link>
          </div>
        )}
      </section>

      <section id="premium-payment" className="mt-6 scroll-mt-24 rounded-2xl border-2 border-tangerine bg-peach p-6" aria-labelledby="profile-premium">
        <h2 id="profile-premium" className="flex items-center gap-2 text-2xl font-bold"><CreditCard size={22} aria-hidden="true" /> Premium and payment</h2>
        <p className="mt-2 text-sm text-muted">Premium features are planned and subscriptions are not active until secure checkout is connected.</p>
        {checkout ? (
          <a href={checkout} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">Continue to secure checkout</a>
        ) : (
          <p className="mt-4 text-sm font-semibold">Payment methods will appear here after checkout is configured.</p>
        )}
        <p className="mt-2 text-xs text-muted">No payment details are stored in your UpNext profile.</p>
      </section>
    </div>
  );
}
