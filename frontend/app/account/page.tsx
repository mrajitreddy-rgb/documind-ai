"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl p-10">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-white">Account</h1>
      <p className="mt-4 text-slate-400">
        Account settings will be available soon.
      </p>
    </div>
  );
}
