"use client";

import { Check, Star, ShieldCheck, Zap, Mail } from "lucide-react";
import Link from "next/link";
import { startPayment } from "@/services/lib/payment";

const features = [
  "Unlimited PDF Uploads",
  "Unlimited Invoice Extraction",
  "AI Invoice Processing",
  "Excel Export",
  "CSV Export",
  "Upload History",
  "Commercial Usage",
  "Priority Email Support",
  "12 Months of Free Updates",
  "Future AI Improvements",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      {/* Header */}

      <div className="text-center">

        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-bold text-cyan-300">
          🚀 LIMITED-TIME LAUNCH OFFER
        </span>

        <h2 className="mt-8 text-5xl font-extrabold text-white">
          Automate Invoice Processing Forever.
          <br />
          One Payment. Lifetime Access.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-slate-400">
          Stop manually typing invoice data into Excel.
          Upload PDF invoices and let AI extract invoice data
          in seconds.
        </p>

      </div>

      {/* Pricing Card */}

      <div className="mx-auto mt-20 max-w-2xl">

        <div className="relative rounded-3xl border border-cyan-500 bg-slate-900 p-10 shadow-2xl shadow-cyan-500/20">

          {/* Badge */}

          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-6 py-2 font-bold text-slate-950">

            <div className="flex items-center gap-2">
              <Star size={16} />
              Best Value
            </div>

          </div>

          <h3 className="text-center text-4xl font-bold text-white">
            Lifetime Launch License
          </h3>

          <p className="mt-4 text-center text-slate-400">
            One-time payment • Lifetime access
          </p>

          {/* Prices */}

          <div className="mt-10 rounded-2xl bg-slate-950 p-8">

            {/* International */}

            <div className="text-center">

              <p className="text-lg text-slate-400">
                🌍 International
              </p>

              <p className="mt-3 text-2xl text-slate-500 line-through">
                US$299
              </p>

              <p className="text-6xl font-extrabold text-cyan-400">
                US$149
              </p>

            </div>

            <div className="my-10 border-t border-slate-800"></div>

            {/* India */}

            <div className="text-center">

              <p className="text-lg text-slate-400">
                🇮🇳 India
              </p>

              <p className="mt-3 text-2xl text-slate-500 line-through">
                ₹9,999
              </p>

              <p className="text-6xl font-extrabold text-cyan-400">
                ₹4,999
              </p>

            </div>

          </div>

          {/* Features */}

          <ul className="mt-12 space-y-5">

            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3"
              >
                <Check className="h-5 w-5 text-cyan-400" />

                <span className="text-lg text-slate-300">
                  {feature}
                </span>

              </li>
            ))}

          </ul>

          {/* CTA */}

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            <button
                onClick={() => startPayment("international")}
                className="rounded-xl bg-cyan-500 py-5 text-center text-xl font-bold text-slate-950 transition duration-300 hover:scale-[1.02] hover:bg-cyan-400"
            >
                🌍 Pay US$149
            </button>

            <button
                onClick={() => startPayment("india")}
                className="rounded-xl border border-cyan-500 py-5 text-center text-xl font-bold text-cyan-400 transition duration-300 hover:bg-cyan-500 hover:text-slate-950"
            >
                🇮🇳 Pay ₹4,999
            </button>

            </div>

          {/* Trust Box */}

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-6">

            <div className="space-y-3 text-center text-slate-300">

              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={18} className="text-cyan-400" />
                Secure checkout with Razorpay
              </div>

              <div className="flex items-center justify-center gap-2">
                <Zap size={18} className="text-cyan-400" />
                Instant access after successful payment
              </div>

              <div className="flex items-center justify-center gap-2">
                <Mail size={18} className="text-cyan-400" />
                Priority email support included
              </div>

            </div>

          </div>

          {/* Footer Note */}

          <p className="mt-8 text-center text-sm leading-7 text-slate-400">
            🌍 International customers:
            <strong> US$149</strong>

            <br />

            🇮🇳 Indian customers:
            <strong> ₹4,999</strong> via Razorpay

            <br />

            <span className="font-semibold text-cyan-300">
              Limited-time launch pricing.
            </span>

          </p>

        </div>

      </div>

      {/* Enterprise */}

      <div className="mt-24 text-center">

        <h3 className="text-3xl font-bold text-white">
          Need Enterprise Licensing?
        </h3>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Looking to deploy DocuMind AI across your organization?
          Contact us for custom enterprise pricing,
          onboarding, and priority support.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-block rounded-xl border border-cyan-500 px-8 py-4 text-lg font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
        >
          Contact Sales
        </Link>

      </div>

    </section>
  );
}