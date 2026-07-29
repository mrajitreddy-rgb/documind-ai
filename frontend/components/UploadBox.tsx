"use client";

import { useState } from "react";

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
  const [exporting, setExporting] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
      setResult(null);
      setError("");
    }
  };
  const handleExcelExport = async () => {
  if (!result) return;

  try {
    setExporting(true);

    const response = await fetch(
      "http://127.0.0.1:8000/api/export/excel",
      {
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
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
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

      const response = await fetch(
        "http://127.0.0.1:8000/api/export/csv",
        {
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

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6">

      <div className="rounded-3xl border-2 border-dashed border-cyan-500 bg-slate-900 p-10">

        <h2 className="text-center text-3xl font-bold text-white">
          Upload Your Document
        </h2>

        <p className="mt-3 text-center text-slate-400">
          Upload a PDF and extract invoice information using AI.
        </p>

        <div className="mt-8 text-center">

          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="pdf-upload"
            className="cursor-pointer rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"
          >
            Choose PDF
          </label>

        </div>

        {selectedFile && (

          <div className="mt-6 text-center">

            <p className="text-green-400">
              Selected File
            </p>

            <p className="mt-2 text-white">
              {selectedFile.name}
            </p>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50"
            >
              {loading ? "Analyzing PDF..." : "Analyze Document"}
            </button>

          </div>

        )}

        {error && (

          <div className="mt-8 rounded-lg bg-red-900 p-4 text-red-200">
            {error}
          </div>

        )}

        {result && (

          <div className="mt-10 space-y-8">

            {/* PDF Information */}

            <div className="rounded-xl bg-slate-800 p-6">

              <h3 className="mb-4 text-2xl font-bold text-cyan-400">
                📄 PDF Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div>
                  <span className="font-bold text-white">
                    Filename
                  </span>

                  <p className="text-slate-300">
                    {result.filename}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-white">
                    Characters
                  </span>

                  <p className="text-slate-300">
                    {result.text_length.toLocaleString()}
                  </p>
                </div>

              </div>

              <div className="mt-6">

                <span className="font-bold text-white">
                  Preview
                </span>

                <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-sm text-green-300">
                  {result.preview}
                </pre>

              </div>

            </div>

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
                        {/* Invoice Table */}

            <div className="rounded-xl bg-slate-800 p-6">

              <div className="mb-6 flex items-center justify-between">

                <h3 className="text-2xl font-bold text-green-400">
                  📋 Extracted Invoices ({result.invoice_count})
                </h3>

              <div className="flex gap-3">

                <button
                  onClick={handleExcelExport}
                  disabled={exporting || loading}
                  className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                >
                  {exporting ? "Exporting..." : "📊 Export Excel"}
                  
                </button>

                <button
                  onClick={handleCsvExport}
                  disabled={exporting || loading}
                  className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {exporting ? "Exporting..." : "📄 Export CSV"}
                </button>

              </div>

            </div>

              {result.invoices.length === 0 ? (

                <div className="rounded-lg bg-slate-900 p-6 text-center text-slate-400">
                  No invoices were detected.
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

                      {result.invoices.map((invoice, index) => (

                        <tr
                          key={`${invoice.invoice_number}-${index}`}
                          className="hover:bg-slate-700"
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

      </div>

    </section>
  );
}