"use client";

import { useRef, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function ModernUploadBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  function handleFile(selected: File | null) {
    if (!selected) return;

    setFile(selected);

    // Temporary demo animation.
    // Later we'll connect this to your existing upload API.
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
    }, 2000);
  }

  return (
    <section className="mb-10">

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`
            relative overflow-hidden rounded-3xl
            border-2 border-dashed
            transition-all duration-300
            ${
              dragging
                ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
                : "border-slate-700 bg-slate-900/60"
            }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />

        <div className="relative flex flex-col items-center px-12 py-20">

          <div className="mb-8 rounded-full bg-cyan-500/15 p-7">
            <Upload
              size={60}
              className="text-cyan-400"
            />
          </div>

          <h2 className="text-4xl font-bold text-white">
            Upload Your Documents
          </h2>

          <p className="mt-4 max-w-xl text-center text-lg text-slate-400">
            Drag & drop invoices here or browse your computer.
            AI extracts invoices, dealers, customers and totals automatically.
          </p>

          <button
            onClick={() => inputRef.current?.click()}
            className="mt-10 rounded-2xl bg-cyan-500 px-10 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-cyan-400"
          >
            Choose PDF
          </button>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept=".pdf"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />

          <div className="mt-5 text-sm text-slate-500">
            Supports PDF • Max 100 MB
          </div>

          {file && (
            <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-950/60 p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-cyan-500/10 p-3">
                  <FileText className="text-cyan-400" />
                </div>

                <div className="flex-1">

                  <div className="font-semibold text-white">
                    {file.name}
                  </div>

                  <div className="text-sm text-slate-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>

                </div>

                {processing ? (
                  <Loader2
                    className="animate-spin text-cyan-400"
                  />
                ) : (
                  <div className="font-semibold text-green-400">
                    Ready
                  </div>
                )}
              </div>

              {processing && (
                <div className="mt-6">

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                    <div className="h-full w-full animate-pulse bg-gradient-to-r from-cyan-400 to-blue-500" />

                  </div>

                  <div className="mt-3 text-center text-sm text-slate-400">
                    AI is preparing your document...
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </section>
  );
}