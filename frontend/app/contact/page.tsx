export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-slate-300">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Contact Us
      </h1>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

        <p className="mb-6">
          We'd love to hear from you.
        </p>

        <div className="space-y-4">

          <div>
            <strong>Email:</strong><br />
            Mr.AjitReddy@Gmail.com
          </div>

          <div>
            <strong>Business:</strong><br />
            DocuMind AI
          </div>

          <div>
            <strong>Product:</strong><br />
            AI-powered PDF Invoice Extraction
          </div>

        </div>

      </div>
    </main>
  );
}