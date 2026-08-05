interface LoadingOverlayProps {
  loading: boolean;
}

export default function LoadingOverlay({
  loading,
}: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-2xl">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

        <h2 className="mt-8 text-center text-2xl font-bold text-white">
          AI is analyzing your document...
        </h2>

        <p className="mt-4 text-center text-slate-400">
          Please wait while Gemini extracts invoice information.
        </p>

      </div>
    </div>
  );
}