"use client";

import { useRouter } from "next/navigation";
import UploadHistoryTable from "@/components/history/UploadHistoryTable";
import { useUploadHistory } from "@/hooks/useUploadHistory";

export default function HistoryPage() {
  const router = useRouter();

  const {
    uploads,
    loading,
    error,
    removeUpload,
    reload,
  } = useUploadHistory();

  function openUpload(id: number) {
    router.push(`/history/${id}`);
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Upload History
          </h1>

          <p className="mt-2 text-slate-400">
            Browse every processed PDF and reopen extracted invoices.
          </p>
        </div>

        <button
          onClick={reload}
          className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500"
        >
          Refresh
        </button>

      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-700 bg-red-900/30 p-4 text-red-300">
          {error}
        </div>
      )}

      <UploadHistoryTable
        uploads={uploads}
        loading={loading}
        onOpen={openUpload}
        onDelete={removeUpload}
      />
    </div>
  );
}