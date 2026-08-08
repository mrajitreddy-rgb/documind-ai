export default function Demo() {
  const videoUrl = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-28">
      <div className="text-center">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          🎥 SEE DOCUMIND AI IN ACTION
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-white">
          From Scanned PDFs to
          <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Structured Data in Seconds
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-400">
          Watch DocuMind AI process a real scanned PDF, extract invoice data,
          make it searchable, and prepare it for Excel or CSV export.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900 shadow-2xl shadow-cyan-500/10">
          {videoUrl ? (
            <video
              className="aspect-video w-full bg-black object-contain"
              controls
              playsInline
              preload="metadata"
              poster="/demo-poster.png"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-slate-950 p-8 text-center">
              <div>
                <p className="text-xl font-semibold text-white">
                  Demo video coming soon
                </p>
                <p className="mt-3 text-slate-400">
                  Add NEXT_PUBLIC_DEMO_VIDEO_URL in Vercel to display the demo.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <p className="text-3xl font-extrabold text-cyan-400">33</p>
            <p className="mt-1 text-slate-400">Invoices processed</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <p className="text-3xl font-extrabold text-cyan-400">29</p>
            <p className="mt-1 text-slate-400">PDF pages</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <p className="text-3xl font-extrabold text-cyan-400">15–20s</p>
            <p className="mt-1 text-slate-400">Approx. processing time</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <p className="text-3xl font-extrabold text-cyan-400">Excel + CSV</p>
            <p className="mt-1 text-slate-400">Instant export</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h3 className="text-2xl font-bold text-white">
            What you will see in the demo
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Scanned PDF invoice processing",
              "AI extraction of invoice numbers, dates, dealers, customers and amounts",
              "Search invoices instantly",
              "Export the extracted data to Excel",
              "Export the extracted data to CSV",
              "Process multi-page invoice batches in one operation",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-slate-300">
                <span className="text-cyan-400">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
