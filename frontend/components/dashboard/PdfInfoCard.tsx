interface PdfInfoCardProps {
  filename: string;
  pages: number;
  textLength: number;
  preview: string;
}

export default function PdfInfoCard({
  filename,
  pages,
  textLength,
  preview,
}: PdfInfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📄 PDF Information
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <div>
          <p className="text-sm text-slate-400">Filename</p>
          <p className="mt-2 font-semibold text-white">
            {filename}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Pages</p>
          <p className="mt-2 text-2xl font-bold text-cyan-400">
            {pages}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Characters</p>
          <p className="mt-2 text-2xl font-bold text-green-400">
            {textLength.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm text-slate-400">
          Preview
        </p>

        <pre className="max-h-72 overflow-auto rounded-xl bg-slate-950 p-5 text-sm text-green-300 whitespace-pre-wrap">
          {preview}
        </pre>
      </div>

    </div>
  );
}