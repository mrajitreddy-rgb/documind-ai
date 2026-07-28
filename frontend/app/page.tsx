export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-6xl font-extrabold">
          DocuMind <span className="text-cyan-400">AI</span>
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-slate-300">
          AI-powered document intelligence for invoices, receipts, contracts,
          and financial statements.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400">
            Upload Document
          </button>

          <button className="rounded-xl border border-slate-600 px-6 py-3 hover:bg-slate-800">
            Live Demo
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Invoice Extraction</h2>
          <p className="mt-3 text-slate-400">
            Automatically extract invoice numbers, totals, GST details and dates.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Receipt OCR</h2>
          <p className="mt-3 text-slate-400">
            Convert scanned receipts into structured digital data.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Export Data</h2>
          <p className="mt-3 text-slate-400">
            Download extracted information as JSON or CSV.
          </p>
        </div>
      </section>
    </main>
  );
}