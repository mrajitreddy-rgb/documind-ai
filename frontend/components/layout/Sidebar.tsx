"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Upload History", href: "/history" },
  { name: "Settings", href: "/settings" },
  { name: "Account", href: "/account" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 p-6">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400 hover:text-cyan-300"
        >
          DocuMind AI
        </Link>

        <p className="mt-2 text-sm text-slate-500">
          AI Invoice Extraction
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-2 block rounded-xl px-4 py-3 transition ${
              pathname === item.href
                ? "bg-cyan-500 text-black font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-800 p-4">
        <Link
            href="/"
            className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800"
        >
               ← Back to Home
        </Link>
      </div>
      <div className="border-t border-slate-800 p-4 text-xs text-slate-500">
        Version 1.0
      </div>
    </aside>
  );
}