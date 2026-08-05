import {
  Building2,
  Calculator,
  Factory,
  Truck,
  Car,
  BadgeCheck,
} from "lucide-react";

import Link from "next/link";

export default function SocialProof() {
  const industries = [
    {
      icon: Calculator,
      title: "Accounting Firms",
      description:
        "Reduce manual invoice entry and speed up bookkeeping with AI-powered extraction.",
    },
    {
      icon: Car,
      title: "Automobile Dealerships",
      description:
        "Process large dealership invoice batches and export structured data in seconds.",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description:
        "Digitize supplier invoices and simplify finance and procurement workflows.",
    },
    {
      icon: Truck,
      title: "Distributors",
      description:
        "Handle high invoice volumes efficiently without repetitive manual data entry.",
    },
    {
      icon: Building2,
      title: "Finance Teams",
      description:
        "Create clean, searchable invoice records for reporting, auditing and compliance.",
    },
    {
      icon: BadgeCheck,
      title: "Business Ready",
      description:
        "Built for organizations that need fast, accurate and repeatable invoice processing.",
    },
  ];

  return (
    <section
      id="industries"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      {/* Heading */}

      <div className="text-center">

        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          Built For Modern Businesses
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-white">
          Trusted Workflow For Every Finance Team
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-400">
          Whether you're processing ten invoices a day or thousands each month,
          DocuMind AI helps automate repetitive document work so your team can
          focus on higher-value tasks.
        </p>

      </div>

      {/* Industry Cards */}

      <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {industries.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10"
            >

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                <Icon className="h-8 w-8 text-cyan-400" />

              </div>

              <h3 className="text-2xl font-bold text-white">

                {item.title}

              </h3>

              <p className="mt-4 leading-7 text-slate-400">

                {item.description}

              </p>

            </div>

          );

        })}

      </div>

      {/* Bottom CTA */}

      <div className="mt-24 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-12 py-16 text-center">

        <h3 className="text-4xl font-bold text-white">

          Spend Less Time Typing.
          <br />
          Spend More Time Growing Your Business.

        </h3>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">

          Upload your invoices, let AI extract the data automatically,
          and export everything to Excel in just a few clicks.

        </p>

        <div className="mt-10 flex justify-center">
            <Link
                href="/dashboard"
                className="rounded-xl bg-cyan-500 px-10 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
            >
                Try DocuMind AI Free
            </Link>
        </div>

      </div>
    </section>
  );
}