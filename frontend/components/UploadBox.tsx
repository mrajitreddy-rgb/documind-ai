"use client";

import { useState } from "react";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <section className="mx-auto mt-16 max-w-3xl px-6">
      <div className="rounded-3xl border-2 border-dashed border-cyan-500 bg-slate-900 p-10 text-center">

        <h2 className="text-2xl font-bold text-white">
          Upload Your Document
        </h2>

        <p className="mt-3 text-slate-400">
          Select an invoice, receipt or contract in PDF format.
        </p>

        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="pdf-upload"
          className="mt-8 inline-block cursor-pointer rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Choose PDF
        </label>

        {selectedFile && (
          <div className="mt-6">

            <p className="text-green-400">
              Selected File:
            </p>

            <p className="mt-2 text-white font-medium">
              {selectedFile.name}
            </p>

            <button
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
            >
              Analyze Document
            </button>

          </div>
        )}

      </div>
    </section>
  );
}