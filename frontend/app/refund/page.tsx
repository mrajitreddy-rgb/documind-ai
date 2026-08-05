export default function RefundPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-slate-300">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Refund Policy
      </h1>

      <div className="space-y-8">

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Digital Product
          </h2>

          <p>
            DocuMind AI is a digital software product delivered online. No
            physical goods are shipped.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Refund Requests
          </h2>

          <p>
            If you experience a technical issue that prevents you from using the
            product, please contact us. We will investigate and work with you to
            resolve the issue.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Contact
          </h2>

          <p>
            For refund-related questions, please contact us through the Contact
            page.
          </p>
        </section>

      </div>
    </main>
  );
}