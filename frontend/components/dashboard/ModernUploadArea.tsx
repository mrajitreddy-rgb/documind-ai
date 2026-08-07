"use client";

interface ModernUploadAreaProps {
  loading: boolean;
  dragActive: boolean;
  selectedFile: File | null;
  error: string;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
}

export default function ModernUploadArea({
  loading,
  dragActive,
  selectedFile,
  error,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  onUpload,
}: ModernUploadAreaProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl">

      <h2 className="text-center text-3xl font-bold text-white">
        Upload Your Document
      </h2>

      <p className="mt-3 text-center text-slate-400">
        Drag & drop a PDF or choose one from your computer.
      </p>

      <div
        className={`mt-8 rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
          dragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-slate-700"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          hidden
          onChange={onFileChange}
        />

        <label
          htmlFor="pdf-upload"
          className="cursor-pointer rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
        >
          Choose PDF
        </label>

        <p className="mt-5 text-slate-400">
          or drag & drop here
        </p>
      </div>

        {selectedFile && (
            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-6">

                <div className="flex flex-col items-center">

                <div className="text-green-400 font-semibold text-lg">
                    Selected File
                </div>

                <div className="mt-3 max-w-xl truncate text-center text-white">
                    {selectedFile.name}
                </div>

                <button
                    onClick={onUpload}
                    disabled={loading}
                    className="mt-6 w-64 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Analyze Document"}
                </button>

                </div>

            </div>
        )}

      {error && (
        <div className="mt-8 rounded-xl bg-red-900/40 p-4 text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}