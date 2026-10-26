import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="marquee-row" aria-hidden={duplicate || undefined}>
      {CATEGORIES.map((category) => (
        <li key={category}>
          <Link href={"/discover?category=" + encodeURIComponent(category)} tabIndex={duplicate ? -1 : undefined}>
            {category}<span className="marquee-dot" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <nav className="marquee" aria-label="Browse opportunity categories">
      <div className="marquee-track"><Row /><Row duplicate /></div>
    </nav>
  );
}
