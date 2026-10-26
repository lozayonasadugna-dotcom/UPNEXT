"use client";
import Image from "next/image";
import { useState } from "react";

export default function Photo({ src, alt, sizes, priority = false, tone, label, className = "" }: {
  src: string; alt: string; sizes: string; priority?: boolean; tone?: string; label?: string; className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"overflow-hidden " + className} style={{ background: tone ?? "#fff0e8" }}>
      {failed ? (
        <div role="img" aria-label={alt} className="absolute inset-0 flex items-end p-3 text-xs font-semibold text-muted">{label}</div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      )}
    </div>
  );
}
