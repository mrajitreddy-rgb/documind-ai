"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-white">Settings</h1>
      <p className="mt-3 text-slate-400">Settings coming soon.</p>
    </div>
  );
}
