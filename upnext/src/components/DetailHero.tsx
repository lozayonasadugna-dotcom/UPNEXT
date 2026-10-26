"use client";
import { motion } from "motion/react";
import Photo from "./Photo";
import { categoryImages } from "@/lib/images";
import type { Category } from "@/lib/types";

export default function DetailHero({ category }: { category: Category }) {
  const img = categoryImages[category];
  return (
    <motion.div
      className="mt-6"
      initial={{ clipPath: "inset(0 0 100% 0 round 20px)" }}
      animate={{ clipPath: "inset(0 0 0% 0 round 20px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Photo src={img.src} alt={img.alt} tone={img.tone} label={category} sizes="(min-width: 768px) 768px, 100vw" priority className="relative h-56 w-full md:h-80" />
    </motion.div>
  );
}
