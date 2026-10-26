"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/organization/")) return null;

  return (
    <footer className="mt-24 border-t border-line bg-peach">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">Your next move matters. Discover opportunities, prepare, and track your progress in one place.</p>
        </div>
        <nav aria-label="Product">
          <h2 className="text-sm font-bold">Product</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-ink" href="/discover">Discover</Link></li>
            <li><Link className="hover:text-ink" href="/for-organizations">For Organizations</Link></li>
            <li><Link className="hover:text-ink" href="/my-next-move">My Next Move</Link></li>
            <li><Link className="hover:text-ink" href="/profile">Your profile</Link></li>
            <li><Link className="hover:text-ink" href="/premium">Premium</Link></li>
            <li><Link className="hover:text-ink" href="/#how">How it works</Link></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2 className="text-sm font-bold">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-ink" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-ink" href="/terms">Terms of Service</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-peach-soft px-4 py-4 text-center text-xs text-muted">UpNext links to official sources. You apply on the official site, never inside UpNext.</p>
    </footer>
  );
}
