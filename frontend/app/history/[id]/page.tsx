"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  Search,
  Receipt,
  IndianRupee,
} from "lucide-react";

import { getUpload } from "@/services/api";
import {
  Invoice,
  UploadHistoryResponse,
} from "@/types/history";

export default function UploadDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const uploadId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [upload, setUpload] =
    useState<UploadHistoryResponse | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadUpload() {
      try {
        setLoading(true);

        const data = await getUpload(uploadId);

        setUpload(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load upload.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(uploadId)) {
      loadUpload();
    }
  }, [uploadId]);

  const invoices = upload?.invoices ?? [];

  const filteredInvoices = useMemo(() => {
    const term = search.toLowerCase();

    return invoices.filter((invoice) => {
      return (
        invoice.invoice_number
          .toLowerCase()
          .includes(term) ||
        invoice.customer
          .toLowerCase()
          .includes(term) ||
        invoice.dealer
          .toLowerCase()
          .includes(term)
      );
    });
  }, [search, invoices]);

  const totalAmount = useMemo(() => {
    return filteredInvoices.reduce((sum, invoice) => {
      const value = Number(invoice.amount);

      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, [filteredInvoices]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl text-slate-400">
        Loading upload...
      </div>
    );
  }

  if (error || !upload) {
    return (
      <div className="mx-auto max-w-5xl p-10">

        <button
          onClick={() => router.push("/history") }
          className="mb-8 flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back to Upload History
        </button>

        <div className="rounded-xl border border-red-600 bg-red-900/20 p-6 text-red-300">
          {error || "Upload not found."}
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-8 flex items-center justify-between">

        <button
          onClick={() => router.push("/history") }
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back to Upload History
        </button>

      </div>

      <h1 className="text-4xl font-bold text-white">
        {upload.upload.filename}
      </h1>

      <p className="mt-2 text-slate-400">
        Processed on{" "}
        {new Date(upload.upload.created_at).toLocaleString()}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6">

          <Receipt
            className="mb-3 text-cyan-400"
            size={32}
          />

          <div className="text-3xl font-bold">
            {filteredInvoices.length}
          </div>

          <div className="text-slate-400">
            Invoices
          </div>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <FileText
            className="mb-3 text-cyan-400"
            size={32}
          />

          <div className="text-3xl font-bold">
            {upload.upload.pages}
          </div>

          <div className="text-slate-400">
            Pages
          </div>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <IndianRupee
            className="mb-3 text-green-400"
            size={32}
          />

          <div className="text-3xl font-bold text-green-400">
            ₹
            {totalAmount.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>

          <div className="text-slate-400">
            Total Amount
          </div>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <FileSpreadsheet
            className="mb-3 text-cyan-400"
            size={32}
          />

          <div className="text-3xl font-bold">
            {upload.upload.batch_count}
          </div>

          <div className="text-slate-400">
            AI Batches
          </div>

        </div>

      </div>

      <div className="mt-10 relative">

        <Search
          className="absolute left-3 top-3 text-slate-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search invoice number, dealer or customer..."
          className="w-full rounded-xl bg-slate-900 py-3 pl-10 pr-4 text-white outline-none"
        />

      </div>

      <div className="mt-8 overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-700">

            <tr>

              <th className="py-3 text-left">
                Invoice No
              </th>

              <th className="text-left">
                Date
              </th>

              <th className="text-left">
                Dealer
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-right">
                Amount
              </th>

              <th className="text-center">
                Page
              </th>

            </tr>

          </thead>

          <tbody>
                      {filteredInvoices.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-slate-400"
              >
                No invoices found.
              </td>
            </tr>
          ) : (
            filteredInvoices.map((invoice: Invoice, index) => (
              <tr
                key={`${invoice.invoice_number}-${index}`}
                className="border-b border-slate-800 hover:bg-slate-900/50 transition"
              >
                <td className="py-4 font-medium text-cyan-300">
                  {invoice.invoice_number || "-"}
                </td>

                <td>
                  {invoice.invoice_date || "-"}
                </td>

                <td>
                  {invoice.dealer || "-"}
                </td>

                <td>
                  {invoice.customer || "-"}
                </td>

                <td className="text-right font-semibold text-green-400">
                  ₹
                  {Number(invoice.amount || 0).toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </td>

                <td className="text-center">
                  {invoice.page ?? "-"}
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}