"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <a
          href="/"
          className="text-3xl font-extrabold tracking-tight"
        >
          <span className="text-white">
            DocuMind
          </span>

          <span className="text-cyan-400">
            {" "}AI
          </span>

        </a>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          {menuItems.map((item) => (

            <a
              key={item.label}
              href={item.href}
              className="font-medium text-slate-300 transition hover:text-cyan-400"
            >
              {item.label}
            </a>

          ))}

        </nav>

        {/* CTA */}

        

        <Link
            href="/dashboard"
            className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black hover:scale-105 transition"
        >
            Try Free
        </Link>

      </div>
    </header>
  );
}