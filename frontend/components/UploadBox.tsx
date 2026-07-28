"use client";

import { useState } from "react";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      setMessage(
`✅ Document analyzed successfully!

📄 Filename:
${data.filename}

📑 Pages:
${data.pages}

📝 Characters:
${data.text_length}

📖 Preview:

${data.preview}`
      );

    } catch (error) {
      console.error("Upload Error:", error);

      if (error instanceof Error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setMessage("❌ Unknown error occurred.");
      }
    } finally {
      setLoading(false);
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

            <p className="mt-2 font-medium text-white">
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

        {message && (
          <div className="mt-8 whitespace-pre-wrap rounded-lg bg-slate-800 p-5 text-left text-green-400">
            {message}
          </div>
        )}

      </div>
    </section>
  );
}