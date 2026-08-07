export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <div className="max-w-lg rounded-3xl border border-cyan-500 bg-slate-900 p-10 text-center shadow-2xl">

        <div className="text-6xl">
          🎉
        </div>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Payment Successful
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Thank you for purchasing DocuMind AI.
        </p>

        <p className="mt-3 text-slate-400">
          Your payment has been verified successfully.
        </p>

        <a
          href="/dashboard"
          className="mt-10 inline-block rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 hover:bg-cyan-400"
        >
          Go to Dashboard
        </a>

      </div>

    </main>
  );
}