"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Building2, ChartNoAxesCombined, CircleUserRound, FileText, LayoutDashboard, Settings2, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { useOrganizationProfile } from "@/lib/organization-store";

type WorkspaceNavItem = { href: string; label: string; count?: string };

const organizationLinks: WorkspaceNavItem[] = [
  { href: "/organization/dashboard", label: "Overview" },
  { href: "/organization/opportunities", label: "My opportunities" },
  { href: "/organization/analytics", label: "Analytics" },
  { href: "/organization/opportunities/new", label: "Post an opportunity" },
  { href: "/organization/verification", label: "Verification" },
  { href: "/organization/profile", label: "Organization profile" },
  { href: "/organization/settings", label: "Settings" },
];

const adminLinks: WorkspaceNavItem[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/organizations", label: "Organizations", count: "9" },
  { href: "/admin/reviews", label: "Opportunity reviews", count: "14" },
  { href: "/admin/reports", label: "Reports", count: "7" },
  { href: "/admin/analytics", label: "Analytics" },
];

function getWorkspaceIcon(type: "organization" | "admin", label: string) {
  if (type === "admin") {
    if (label === "Overview") return LayoutDashboard;
    if (label === "Organizations") return Building2;
    if (label === "Opportunity reviews") return FileText;
    if (label === "Reports") return ShieldCheck;
    return ChartNoAxesCombined;
  }
  if (label === "Overview") return LayoutDashboard;
  if (label === "My opportunities" || label === "Post an opportunity") return FileText;
  if (label === "Analytics") return ChartNoAxesCombined;
  if (label === "Verification") return ShieldCheck;
  if (label === "Organization profile") return CircleUserRound;
  return Settings2;
}

function WorkspaceFrame({ type, children }: { type: "organization" | "admin"; children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = type === "admin";
  const organization = useOrganizationProfile();
  const isLogin = pathname === "/admin/login" || pathname === "/organization/login" || pathname === "/organization/register";
  const links = isAdmin ? adminLinks : organizationLinks;
  const title = isAdmin ? "Review workspace" : "Organization workspace";
  const label = isAdmin ? "DEMO REVIEWER" : "DEMO ORGANIZATION";

  return (
    <div className="min-h-[calc(100vh-1px)] bg-[#faf9f7]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="UpNext public site"><Logo /></Link>
            <span className="hidden h-7 w-px bg-line sm:block" aria-hidden="true" />
            <span className="hidden text-sm font-semibold text-muted sm:block">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-peach-soft bg-peach px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] text-ink sm:inline-flex">{label}</span>
            <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted transition hover:bg-peach hover:text-ink">
              <ArrowLeft size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Public site</span>
            </Link>
          </div>
        </div>
      </header>

      {isLogin ? (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      ) : (
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8">
          <aside className="h-fit rounded-2xl border border-line bg-white p-3 lg:sticky lg:top-6">
            <div className="px-3 pb-3 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{isAdmin ? "Administration" : "Workspace"}</p>
              <p className="mt-1 truncate text-sm font-semibold text-ink">{isAdmin ? "UpNext review desk" : organization.name}</p>
            </div>
            <nav aria-label={isAdmin ? "Admin workspace" : "Organization workspace"} className="flex gap-1 overflow-x-auto lg:flex-col">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== (isAdmin ? "/admin" : "/organization/dashboard") && pathname.startsWith(link.href + "/"));
                const Icon = getWorkspaceIcon(type, link.label);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={"flex min-h-10 shrink-0 items-center justify-between gap-3 rounded-xl px-3 text-sm font-medium transition-colors lg:w-full " + (active ? "bg-peach text-ink" : "text-muted hover:bg-[#f7f5f3] hover:text-ink")}
                  >
                    <span className="flex items-center gap-2.5"><Icon size={16} aria-hidden="true" />{link.label}</span>
                    {link.count && <span className={"rounded-full px-2 py-0.5 text-[11px] font-bold " + (active ? "bg-white text-ink" : "bg-[#f3f1ef] text-muted")}>{link.count}</span>}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 hidden border-t border-line pt-3 lg:block">
              <Link href="/" className="flex min-h-10 items-center justify-between rounded-xl px-3 text-sm font-medium text-muted transition hover:bg-[#f7f5f3] hover:text-ink">
                Return to UpNext
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      )}
    </div>
  );
}

export function OrganizationWorkspace({ children }: { children: ReactNode }) {
  return <WorkspaceFrame type="organization">{children}</WorkspaceFrame>;
}

export function AdminWorkspace({ children }: { children: ReactNode }) {
  return <WorkspaceFrame type="admin">{children}</WorkspaceFrame>;
}
