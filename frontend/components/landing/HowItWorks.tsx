import { Upload, Sparkles, FileSpreadsheet } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload Your PDF",
      description:
        "Drag & drop one or multiple invoice PDFs. DocuMind AI supports multi-page documents and large invoice batches.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Extracts Everything",
      description:
        "Our AI identifies invoice numbers, dates, GST details, dealer names, customer names and totals in seconds.",
    },
    {
      number: "03",
      icon: FileSpreadsheet,
      title: "Export Instantly",
      description:
        "Download clean Excel or CSV files ready for accounting, ERP systems, audits and business reporting.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      {/* Heading */}

      <div className="text-center">

        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          How It Works
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-white">
          Three Simple Steps
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-400">
          From raw PDF invoices to structured Excel reports in under a minute.
          No manual typing. No spreadsheets. Just AI.
        </p>

      </div>

      {/* Steps */}

      <div className="relative mt-24 grid gap-10 md:grid-cols-3">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (

            <div
              key={step.number}
              className="relative rounded-3xl border border-slate-800 bg-slate-900 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10"
            >

              {/* Step Number */}

              <div className="absolute right-6 top-6 text-5xl font-black text-slate-800">

                {step.number}

              </div>

              {/* Icon */}

              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/15">

                <Icon className="h-8 w-8 text-cyan-400" />

              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-white">

                {step.title}

              </h3>

              {/* Description */}

              <p className="mt-5 leading-7 text-slate-400">

                {step.description}

              </p>

              {/* Arrow */}

              {index < 2 && (
                <div className="absolute -right-5 top-1/2 hidden -translate-y-1/2 md:block">

                  <div className="text-5xl text-cyan-500">

                    →

                  </div>

                </div>
              )}

            </div>

          );

        })}

      </div>
    </section>
  );
}