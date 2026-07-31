"use client";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h2 className="text-xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          AI Invoice Processing Platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium text-white">
            Welcome
          </p>

          <p className="text-sm text-slate-400">
            DocuMind User
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
          D
        </div>
      </div>
    </header>
  );
}