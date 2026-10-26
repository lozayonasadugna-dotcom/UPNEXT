"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/discover", label: "Discover", match: (p: string) => p === "/discover" },
  { href: "/#featured", label: "Opportunities", match: (p: string) => p.startsWith("/opportunities") },
  { href: "/#how", label: "How it works", match: () => false },
  { href: "/for-organizations", label: "For Organizations", match: (p: string) => p.startsWith("/for-organizations") || p.startsWith("/organization") },
  { href: "/my-next-move", label: "My Next Move", match: (p: string) => p === "/my-next-move" },
  { href: "/premium", label: "Premium", match: (p: string) => p === "/premium" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }
    const sections = ["featured", "how"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        setActiveSection(current?.target.id ?? "");
      },
      { rootMargin: "-18% 0px -68% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  function scrollToAnchor(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const id = href.slice(2);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", "#" + id);
    setActiveSection(id);
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setOpen(false);
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/organization/")) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" aria-label="UpNext home"><Logo /></Link>
          <ul className="hidden items-center gap-4 md:flex lg:gap-5">
            {links.map((l) => {
              const sectionId = l.href.startsWith("/#") ? l.href.slice(2) : "";
              const active = l.match(pathname) || (pathname === "/" && sectionId !== "" && activeSection === sectionId);
              return (
                <li key={l.label}>
                  <Link href={l.href} onClick={(event) => scrollToAnchor(event, l.href)} aria-current={active ? (l.match(pathname) ? "page" : "location") : undefined} className={"relative block py-2 text-sm font-medium transition-colors lg:text-[15px] " + (active ? "text-ink" : "text-muted hover:text-ink")}>
                    {l.label}
                    {active && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-tangerine" transition={{ duration: 0.25 }} />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/profile" className="text-sm font-medium hover:underline lg:text-[15px]">Profile</Link>
            <Link href="/discover" className="btn btn-primary">Get started</Link>
          </div>
          <div className="md:hidden">
            <button type="button" className="btn" aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop" className="fixed inset-0 z-[45] bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.aside key="drawer" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-xs flex-col bg-white p-5" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.28, ease: "easeOut" }}>
              <div className="flex items-center justify-between">
                <Logo />
                <button type="button" className="btn" aria-label="Close menu" onClick={() => setOpen(false)} autoFocus><X size={22} /></button>
              </div>
              <ul className="mt-6 flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.label}><Link href={l.href} onClick={(event) => { scrollToAnchor(event, l.href); setOpen(false); }} className="block rounded-lg px-3 py-3 text-lg font-medium hover:bg-peach">{l.label}</Link></li>
                ))}
                <li><Link href="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg font-medium hover:bg-peach">Profile</Link></li>
              </ul>
              <Link href="/discover" onClick={() => setOpen(false)} className="btn btn-primary mt-auto w-full">Get started</Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
