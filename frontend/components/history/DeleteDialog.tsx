"use client";

interface DeleteDialogProps {
  open: boolean;
  filename: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  filename,
  deleting,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-red-400">
          Delete Upload
        </h2>

        <p className="mt-5 text-slate-300">
          Are you sure you want to permanently delete:
        </p>

        <p className="mt-3 rounded-lg bg-slate-800 p-3 font-mono text-cyan-300 break-all">
          {filename}
        </p>

        <p className="mt-5 text-sm text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="rounded-xl border border-slate-600 px-5 py-2 text-white hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-500 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}