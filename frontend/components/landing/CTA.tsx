"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-blue-600/10 p-12 text-center">

        <h2 className="text-4xl font-bold text-white">
          Ready to Automate Your Invoice Processing?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
          Extract invoices in seconds using AI. Export to Excel or CSV with a
          single click. Save hours every week.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/dashboard"
            className="rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
          >
            Start Free Trial
          </Link>

          <Link
            href="#pricing"
            className="rounded-xl border border-slate-700 px-8 py-4 text-lg font-semibold text-white transition hover:border-cyan-500"
          >
            View Pricing
          </Link>

        </div>

      </div>
    </section>
  );
}