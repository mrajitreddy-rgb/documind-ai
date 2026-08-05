export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-slate-300">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Privacy Policy
      </h1>

      <div className="space-y-8">

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Information We Collect
          </h2>

          <p>
            DocuMind AI collects only the information required to provide
            AI-powered invoice extraction services. This may include uploaded
            PDF documents, account information, and usage data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            How We Use Your Data
          </h2>

          <p>
            Uploaded documents are processed solely to extract invoice data and
            generate downloadable Excel and CSV reports.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Data Security
          </h2>

          <p>
            We take reasonable technical and organizational measures to protect
            your information from unauthorized access or disclosure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
            Contact
          </h2>

          <p>
            For any privacy-related questions, please contact us using the
            details on the Contact page.
          </p>
        </section>

      </div>
    </main>
  );
}