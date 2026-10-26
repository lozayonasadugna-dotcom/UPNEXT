"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
import Tilt from "./Tilt";
import { categoryImages } from "@/lib/images";
import { CATEGORIES } from "@/lib/types";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } } };

export default function CategoryTiles() {
  return (
    <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
      {CATEGORIES.map((c) => {
        const img = categoryImages[c];
        return (
          <motion.li key={c} variants={item}>
            <Tilt>
              <Link href={"/discover?category=" + encodeURIComponent(c)} className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-line transition-[box-shadow,border-color] duration-300 hover:border-tangerine hover:shadow-xl focus-visible:ring-2 focus-visible:ring-tangerine">
                <Photo src={img.src} alt={img.alt} tone={img.tone} label={c} sizes="(min-width: 768px) 25vw, 50vw" className="absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-display text-lg font-bold text-white">
                  {c}<ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={18} aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" aria-hidden="true" />
              </Link>
            </Tilt>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
