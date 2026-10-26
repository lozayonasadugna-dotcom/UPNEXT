"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Photo from "./Photo";
import { categoryImages } from "@/lib/images";
import { CATEGORIES, type Category } from "@/lib/types";

const blurbs: Record<Category, string> = {
  Jobs: "Find roles by skill, location, and work mode.",
  Internships: "Start your career with a place to learn.",
  Scholarships: "Look for study funding and fellowships.",
  "Online Courses": "Build skills from anywhere at your own pace.",
  Volunteer: "Give your time and gain real experience.",
  Competitions: "Test your ideas against other teams.",
  Grants: "Search funded programs for your project.",
  Events: "Meet people at creative and technology events.",
};

export default function DiscoverCarousel() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const n = CATEGORIES.length;

  const go = useCallback((d: number) => {
    setDir(d);
    setI((x) => (x + d + n) % n);
  }, [n]);

  useEffect(() => {
    if (paused || hold || reduce) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused, hold, reduce, go]);

  const c = CATEGORIES[i];
  const img = categoryImages[c];

  return (
    <section className="mx-auto max-w-6xl px-4 py-6" aria-roledescription="carousel" aria-label="Discover by category">
      <div
        className="relative isolate overflow-hidden rounded-3xl"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocusCapture={() => setHold(true)}
        onBlurCapture={() => setHold(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div key={c} className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1, scale: [1, 1.06, 1] }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 0.8 }, scale: { duration: 16, repeat: Infinity, ease: "easeInOut" } }} aria-hidden="true">
            <Photo src={img.src} alt="" tone={img.tone} sizes="100vw" className="absolute inset-0 scale-125 blur-2xl" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden="true" />

        <div className="grid min-h-[520px] items-center gap-8 p-6 text-white md:min-h-[580px] md:grid-cols-2 md:p-12">
          <div aria-live={paused || hold ? "polite" : "off"}>
            <p className="badge !bg-white/90">Discover</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={c} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <h2 className="mt-4 text-4xl font-extrabold md:text-6xl">{c}</h2>
                <p className="mt-3 max-w-md text-lg text-white/90">{blurbs[c]}</p>
                <Link href={"/discover?category=" + encodeURIComponent(c)} className="btn btn-primary mt-6">
                  Discover {c} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-md [perspective:1200px]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={c}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, rotateY: d * 8, rotateX: 3 }),
                  center: { opacity: 1, x: 0, rotateY: 0, rotateX: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, rotateY: d * -8, rotateX: -3 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                whileDrag={{ scale: 0.98 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="absolute inset-0 cursor-grab overflow-hidden rounded-2xl border border-white/50 shadow-2xl active:cursor-grabbing"
              >
                <Photo src={img.src} alt={img.alt} tone={img.tone} label={c} sizes="(min-width: 768px) 448px, 90vw" priority={i === 0} className="absolute inset-0" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-6 text-white md:px-12">
          <div className="flex" role="group" aria-label="Choose slide">
            {CATEGORIES.map((x, k) => (
              <button key={x} type="button" aria-label={"Show " + x} aria-current={k === i} onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} className="flex h-11 items-center px-1">
                <span className={"block h-2 rounded-full transition-all duration-300 " + (k === i ? "w-6 bg-tangerine" : "w-2 bg-white/60")} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="btn !border !border-white/60 !px-3 text-white hover:bg-white/10"><ChevronLeft size={20} /></button>
            <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)} className="btn !border !border-white/60 !px-3 text-white hover:bg-white/10">{paused ? <Play size={18} /> : <Pause size={18} />}</button>
            <button type="button" aria-label="Next slide" onClick={() => go(1)} className="btn !border !border-white/60 !px-3 text-white hover:bg-white/10"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
