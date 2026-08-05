export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Invoice Extraction",
      description:
        "Automatically extracts invoice numbers, invoice dates, GST details, dealer names, customer names and total invoice values using advanced AI.",
    },
    {
      icon: "📄",
      title: "Multi-page PDF Processing",
      description:
        "Upload a single PDF containing dozens or even hundreds of invoices and extract everything in one operation.",
    },
    {
      icon: "📊",
      title: "Excel Export",
      description:
        "Export structured invoice data directly into Microsoft Excel for accounting, finance and auditing.",
    },
    {
      icon: "📁",
      title: "CSV Export",
      description:
        "Download clean CSV files that can be imported into ERP, accounting software and custom systems.",
    },
    {
      icon: "🔍",
      title: "Smart Invoice Search",
      description:
        "Quickly search invoices by invoice number, dealer, customer or amount without manually opening PDFs.",
    },
    {
      icon: "🔒",
      title: "Secure Processing",
      description:
        "Documents are processed securely and are never shared with third parties. Designed with business privacy in mind.",
    },
  ];

  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          Powerful Features
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-white">
          Everything You Need to Process Invoices
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-400">
          DocuMind AI automatically converts PDF invoices into structured,
          searchable business data, helping finance teams save hours of manual
          work every day.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div className="mb-6 text-5xl">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {feature.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}