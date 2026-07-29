"use client";

import { useState } from "react";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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

  return (
    <section className="mx-auto mt-16 max-w-4xl px-6">
      <div className="rounded-3xl border-2 border-dashed border-cyan-500 bg-slate-900 p-10">

        <h2 className="text-center text-3xl font-bold text-white">
          Upload Your Document
        </h2>

        <p className="mt-3 text-center text-slate-400">
          Select an invoice, receipt or contract in PDF format.
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
              {loading ? "Analyzing..." : "Analyze Document"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-lg bg-red-900 p-4 text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">

            <div className="rounded-xl bg-slate-800 p-6">
              <h3 className="mb-4 text-xl font-bold text-cyan-400">
                📄 PDF Information
              </h3>

              <p><strong>Filename:</strong> {result.filename}</p>
              <p><strong>Pages:</strong> {result.pages}</p>
              <p><strong>Characters:</strong> {result.text_length}</p>

              <div className="mt-4">
                <strong>Preview</strong>

                <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded bg-slate-900 p-3 text-sm text-green-300">
                  {result.preview}
                </pre>
              </div>
            </div>

            <div className="rounded-xl bg-slate-800 p-6">
              <h3 className="mb-4 text-xl font-bold text-green-400">
                🤖 AI Extracted Information
              </h3>

              {result.structured_data?.error ? (
                <div className="text-red-400">
                  {result.structured_data.error}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <span className="font-bold">Document Type</span>
                    <p>{result.structured_data?.document_type}</p>
                  </div>

                  <div>
                    <span className="font-bold">Invoice Number</span>
                    <p>{result.structured_data?.invoice_number}</p>
                  </div>

                  <div>
                    <span className="font-bold">Invoice Date</span>
                    <p>{result.structured_data?.invoice_date}</p>
                  </div>

                  <div>
                    <span className="font-bold">Dealer</span>
                    <p>{result.structured_data?.dealer}</p>
                  </div>

                  <div>
                    <span className="font-bold">Customer</span>
                    <p>{result.structured_data?.customer}</p>
                  </div>

                  <div>
                    <span className="font-bold">Amount</span>
                    <p>{result.structured_data?.amount}</p>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}