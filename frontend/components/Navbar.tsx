export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          DocuMind <span className="text-cyan-400">AI</span>
        </h1>

        <div className="flex gap-6 text-slate-300">
          <a href="#features" className="hover:text-cyan-400">
            Features
          </a>

          <a href="#pricing" className="hover:text-cyan-400">
            Pricing
          </a>

          <a href="#contact" className="hover:text-cyan-400">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}