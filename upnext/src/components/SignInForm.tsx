"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function SignInForm() {
  const router = useRouter();
  const [supabase] = useState(createClient);
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!supabase) {
      setError("Sign-in is not configured yet. Add your Supabase project URL and anon key to .env.local, then restart the app.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signin") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        router.push("/profile");
        router.refresh();
        return;
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/profile" },
      });
      if (authError) throw authError;
      if (data.session) {
        router.push("/profile");
        router.refresh();
      } else {
        setMessage("Check your email for the confirmation link, then sign in.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not complete sign-in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!supabase) {
    return (
      <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm" aria-labelledby="auth-setup-title">
        <p className="badge">Guest mode</p>
        <h2 id="auth-setup-title" className="mt-4 text-2xl font-bold">Your account is coming later</h2>
        <p className="mt-2 text-sm text-muted">For now, UpNext profiles and application tracking work on this device. You can choose an avatar, set a username, save opportunities, and update your progress without creating a password.</p>
        <Link href="/profile" className="btn btn-primary mt-6 w-full">Continue with a local profile</Link>
        <p className="mt-3 text-xs text-muted">This is not an account, and your data will not sync to another device yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm" aria-labelledby="auth-title">
      <div className="flex gap-2 rounded-xl bg-peach p-1">
        {(["signin", "signup"] as const).map((value) => (
          <button key={value} type="button" onClick={() => { setMode(value); setError(""); setMessage(""); }} aria-pressed={mode === value} className={"min-h-11 flex-1 rounded-lg px-3 text-sm font-semibold transition-colors " + (mode === value ? "bg-white shadow-sm" : "text-muted")}>
            {value === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <h2 id="auth-title" className="mt-6 text-2xl font-bold">{mode === "signin" ? "Welcome back" : "Create your UpNext account"}</h2>
      <p className="mt-1 text-sm text-muted">Use your email and password to save your profile and get back to your application tracker.</p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="block text-sm font-semibold" htmlFor="email">Email address
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="field mt-1" />
        </label>
        <label className="block text-sm font-semibold" htmlFor="password">Password
          <input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="field mt-1" />
        </label>
        {error && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-900">{error}</p>}
        {message && <p role="status" className="rounded-lg border border-line bg-peach p-3 text-sm font-medium">{message}</p>}
        <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60">
          {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

    </section>
  );
}
