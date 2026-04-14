"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function FilterLinks({ selected }: { selected: string[] }) {
  const searchParams = useSearchParams();

  function href(toggle: string) {
    const p = new URLSearchParams(searchParams.toString());
    const cur = p.getAll("color");
    p.delete("color");
    const next = cur.includes(toggle)
      ? cur.filter((c) => c !== toggle)
      : [...cur, toggle];
    next.forEach((c) => p.append("color", c));
    const qs = p.toString();
    return qs ? `/?${qs}` : "/";
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {["red", "blue"].map((color) => (
        <Link
          key={color}
          href={href(color)}
          style={{
            padding: "6px 12px",
            background: selected.includes(color) ? color : "#eee",
            color: selected.includes(color) ? "white" : "black",
            textDecoration: "none",
          }}
        >
          {selected.includes(color) ? `✕ ${color}` : `+ ${color}`}
        </Link>
      ))}
    </div>
  );
}
