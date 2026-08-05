export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-slate-300">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Terms & Conditions
      </h1>

      <div className="space-y-8">

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Acceptance of Terms
          </h2>

          <p>
            By accessing or using DocuMind AI, you agree to these Terms &
            Conditions.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Use of Service
          </h2>

          <p>
            DocuMind AI provides AI-powered invoice extraction from PDF
            documents. Users are responsible for ensuring they have the right to
            upload and process the documents they submit.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Intellectual Property
          </h2>

          <p>
            All software, branding, and content associated with DocuMind AI
            remain the property of DocuMind AI.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Limitation of Liability
          </h2>

          <p>
            While we strive for accurate AI extraction, users should review
            extracted data before using it for accounting or business purposes.
          </p>
        </section>

      </div>
    </main>
  );
}