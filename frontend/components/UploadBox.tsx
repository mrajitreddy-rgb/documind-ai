"use client";

import PdfInfoCard from "@/components/dashboard/PdfInfoCard";
import ModernUploadArea from "@/components/dashboard/ModernUploadArea";
import LoadingOverlay from "@/components/dashboard/LoadingOverlay";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { useState } from "react";
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

interface Invoice {
  invoice_number: string;
  invoice_date: string;
  dealer: string;
  customer: string;
  amount: string;
  page: number | null;
}

interface UploadResult {
  success: boolean;
  filename: string;
  pages: number;
  text_length: number;
  preview: string;
  batch_count: number;
  invoice_count: number;
  invoices: Invoice[];
}

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
      setResult(null);
      setError("");
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setDragActive(false);
};

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setDragActive(false);

  const file = e.dataTransfer.files?.[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    setError("Please upload a PDF file.");
    return;
  }

  setSelectedFile(file);
  setResult(null);
  setError("");
};

  const handleExcelExport = async () => {
  if (!result) return;

  try {
    setExporting(true);

    const response = await fetch(`${API}/api/export/excel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoices: result.invoices,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to export Excel.");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "DocuMind_Invoices.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Failed to export Excel.");
    }
  } finally {
    setExporting(false);
  }
};
  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${API}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      if (!data.success) {
        setResult(null);
        setError(data.error || "Analysis failed.");
        return;
      }

      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCsvExport = async () => {
    if (!result) return;

    try {
      setExporting(true);

      const response = await fetch(`${API}/api/export/csv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoices: result.invoices,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export CSV.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "DocuMind_Invoices.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to export CSV.");
      }
    } finally {
      setExporting(false);
    }
  };
  const filteredInvoices =
    result?.invoices.filter((invoice) => {
      const search = searchTerm.toLowerCase();

      return (
        invoice.invoice_number.toLowerCase().includes(search) ||
        invoice.invoice_date.toLowerCase().includes(search) ||
        invoice.dealer.toLowerCase().includes(search) ||
        invoice.customer.toLowerCase().includes(search) ||
        invoice.amount.toLowerCase().includes(search) ||
        String(invoice.page ?? "").includes(search)
      );
    }) ?? [];

  const totalAmount = filteredInvoices.reduce((sum, invoice) => {
    const amount = Number(invoice.amount.replace(/[^0-9.]/g, "")) || 0;
    return sum + amount;
  }, 0);

  const uniqueDealers = new Set(
    filteredInvoices
      .map((invoice) => invoice.dealer.trim())
      .filter(Boolean)
  ).size;

  const uniqueCustomers = new Set(
    filteredInvoices
      .map((invoice) => invoice.customer.trim())
      .filter(Boolean)
  ).size;
    

  return (
    <section
      id="upload"
      className="mx-auto mt-16 max-w-7xl px-6"
    >

    <LoadingOverlay loading={loading} />

      <ModernUploadArea
        loading={loading}
        dragActive={dragActive}
        selectedFile={selectedFile}
        error={error}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
      />

        {result && (

          <div className="mt-10 space-y-8">

            <PdfInfoCard
              filename={result.filename}
              pages={result.pages}
              textLength={result.text_length}
              preview={result.preview}
            />
            

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-3">

              <div className="rounded-xl bg-slate-800 p-6 text-center">

                <h4 className="text-lg font-semibold text-cyan-400">
                  Pages
                </h4>

                <p className="mt-3 text-4xl font-bold text-white">
                  {result.pages}
                </p>

              </div>

              <div className="rounded-xl bg-slate-800 p-6 text-center">

                <h4 className="text-lg font-semibold text-green-400">
                  Batches
                </h4>

                <p className="mt-3 text-4xl font-bold text-white">
                  {result.batch_count}
                </p>

              </div>

              <div className="rounded-xl bg-slate-800 p-6 text-center">

                <h4 className="text-lg font-semibold text-yellow-400">
                  Invoices Found
                </h4>

                <p className="mt-3 text-4xl font-bold text-white">
                  {result.invoice_count}
                </p>

              </div>

            </div>
            {/* Invoice Summary */}

      
              <SummaryCards
                invoiceCount={filteredInvoices.length}
                totalAmount={totalAmount}
                uniqueDealers={uniqueDealers}
                uniqueCustomers={uniqueCustomers}
              />
                        {/* Invoice Table */}

            <div className="rounded-xl bg-slate-800 p-6">

              <div className="mb-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <h3 className="text-2xl font-bold text-green-400">
                    📋 Extracted Invoices ({filteredInvoices.length} of {result.invoice_count})
                  </h3>

                  <div className="flex flex-col gap-3 md:flex-row md:items-center">

                    <input
                      type="text"
                      placeholder="🔍 Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white placeholder:text-slate-400 md:w-80"
                    />

                    <button
                      onClick={handleExcelExport}
                      disabled={exporting || loading}
                      className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                    >
                      {exporting ? "Exporting..." : "📊 Excel"}
                    </button>

                    <button
                      onClick={handleCsvExport}
                      disabled={exporting || loading}
                      className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                    >
                      {exporting ? "Exporting..." : "📄 CSV"}
                    </button>

                  </div>

                </div>

              </div>

              {filteredInvoices.length === 0 ? (

                <div className="rounded-lg bg-slate-900 p-6 text-center text-slate-400">
                  {searchTerm
                    ? "No invoices match your search."
                    : "No invoices were detected."}
                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="min-w-full border border-slate-700">

                    <thead className="bg-slate-700">

                      <tr>

                        <th className="border border-slate-600 px-4 py-3 text-left text-white">
                          #
                        </th>

                        <th className="border border-slate-600 px-4 py-3 text-left text-white">
                          Invoice Number
                        </th>

                        <th className="border border-slate-600 px-4 py-3 text-left text-white">
                          Date
                        </th>

                        <th className="border border-slate-600 px-4 py-3 text-left text-white">
                          Dealer
                        </th>

                        <th className="border border-slate-600 px-4 py-3 text-left text-white">
                          Customer
                        </th>

                        <th className="border border-slate-600 px-4 py-3 text-right text-white">
                          Amount
                        </th>

                        <th className="border border-slate-600 px-4 py-3 text-center text-white">
                          Page
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredInvoices.map((invoice, index) => (

                        <tr
                          key={`${invoice.invoice_number}-${index}`}
                          className={`${
                            index % 2 === 0 ? "bg-slate-800" : "bg-slate-900"
                          } hover:bg-slate-700`}
                        >

                          <td className="border border-slate-700 px-4 py-3">
                            {index + 1}
                          </td>

                          <td className="border border-slate-700 px-4 py-3 font-mono text-cyan-300">
                            {invoice.invoice_number || "-"}
                          </td>

                          <td className="border border-slate-700 px-4 py-3">
                            {invoice.invoice_date || "-"}
                          </td>

                          <td className="border border-slate-700 px-4 py-3">
                            {invoice.dealer || "-"}
                          </td>

                          <td className="border border-slate-700 px-4 py-3">
                            {invoice.customer || "-"}
                          </td>

                          <td className="border border-slate-700 px-4 py-3 text-right text-green-400 font-semibold">
                            {invoice.amount ? `₹ ${invoice.amount}` : "-"}
                          </td>

                          <td className="border border-slate-700 px-4 py-3 text-center font-semibold text-cyan-300">
                            {invoice.page ?? "-"}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        )}

      

    </section>
  );
}