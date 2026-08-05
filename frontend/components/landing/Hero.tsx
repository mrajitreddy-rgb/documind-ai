"use client";

import Link from "next/link";
import { ArrowRight, FileText, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-600 blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-36 pb-24 text-center">

        {/* Badge */}

        <div className="mb-8 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">

          ✨ AI Powered Invoice Extraction Platform

        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">

          Extract Invoice Data

          <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            In Seconds Using AI

          </span>

        </h1>

        {/* Subtitle */}

        <p className="mt-8 max-w-3xl text-xl leading-8 text-slate-300">

          Upload PDF invoices.

          Our AI automatically extracts invoice numbers,
          dates, dealers, customers and totals.

          Export everything directly to Excel or CSV
          in just one click.

        </p>

        {/* CTA */}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/dashboard"
            className="rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
        >
            Try Free Now →
        </Link>

        <a
            href="mailto:Mr.AjitReddy@gmail.com?subject=DocuMind AI Demo"
            className="rounded-2xl border border-slate-700 px-8 py-4 text-lg font-semibold text-white transition hover:border-cyan-500"
        >
                Book Demo
        </a>

        </div>

        {/* Stats */}

        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">

            <FileText className="mx-auto h-10 w-10 text-cyan-400" />

            <h3 className="mt-4 text-4xl font-bold text-white">

              Unlimited

            </h3>

            <p className="mt-2 text-slate-400">

              PDF Upload Support

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">

            <Sparkles className="mx-auto h-10 w-10 text-green-400" />

            <h3 className="mt-4 text-4xl font-bold text-white">

              AI Powered

            </h3>

            <p className="mt-2 text-slate-400">

              Invoice Extraction

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">

            <ShieldCheck className="mx-auto h-10 w-10 text-yellow-400" />

            <h3 className="mt-4 text-4xl font-bold text-white">

              Secure

            </h3>

            <p className="mt-2 text-slate-400">

              Your Files Stay Private

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}