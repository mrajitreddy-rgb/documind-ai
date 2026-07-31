"use client";

import { useMemo, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";

import DeleteDialog from "./DeleteDialog";

import { UploadHistoryItem } from "@/types/history";

interface Props {
  uploads: UploadHistoryItem[];
  loading: boolean;
  onOpen: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function UploadHistoryTable({
  uploads,
  loading,
  onOpen,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");

  const [selected, setSelected] =
    useState<UploadHistoryItem | null>(null);

  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    return uploads.filter((upload) =>
      upload.filename
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [uploads, search]);

  async function confirmDelete() {
    if (!selected) return;

    try {
      setDeleting(true);

      await onDelete(selected.id);

      setSelected(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <DeleteDialog
        open={!!selected}
        filename={selected?.filename ?? ""}
        deleting={deleting}
        onCancel={() => setSelected(null)}
        onConfirm={confirmDelete}
      />

      <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h2 className="text-3xl font-bold text-cyan-400">
            Upload History
          </h2>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="rounded-xl bg-slate-800 py-2 pl-10 pr-4 text-white outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400">
            Loading uploads...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            No uploads found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-700">

                <tr>

                  <th className="py-3 text-left">
                    File
                  </th>

                  <th className="text-center">
                    Pages
                  </th>

                  <th className="text-center">
                    Invoices
                  </th>

                  <th className="text-right">
                    Total
                  </th>

                  <th className="text-center">
                    Date
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((upload) => (

                  <tr
                    key={upload.id}
                    className="border-b border-slate-800 hover:bg-slate-800"
                  >

                    <td className="py-4">
                      {upload.filename}
                    </td>

                    <td className="text-center">
                      {upload.pages}
                    </td>

                    <td className="text-center">
                      {upload.invoice_count}
                    </td>

                    <td className="text-right text-green-400 font-semibold">
                      ₹{" "}
                      {upload.total_amount.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td className="text-center">
                      {new Date(
                        upload.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            onOpen(upload.id)
                          }
                          className="rounded-lg bg-cyan-600 p-2 hover:bg-cyan-500"
                          title="Open"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            setSelected(upload)
                          }
                          className="rounded-lg bg-red-600 p-2 hover:bg-red-500"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>
    </>
  );
}