import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-white">
              DocuMind
              <span className="text-cyan-400"> AI</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              AI-powered invoice extraction that converts PDF invoices into
              structured Excel and CSV reports in seconds.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-xl font-bold text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link href="#features" className="text-slate-400 hover:text-cyan-400">
                  Features
                </Link>
              </li>

              <li>
                <Link href="#pricing" className="text-slate-400 hover:text-cyan-400">
                  Pricing
                </Link>
              </li>

              <li>
                <Link href="#faq" className="text-slate-400 hover:text-cyan-400">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="#upload" className="text-slate-400 hover:text-cyan-400">
                  Upload Demo
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400">
                  Terms
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-5">

              <div className="flex items-center gap-3">

                <Mail className="h-5 w-5 text-cyan-400" />

                <span className="text-slate-400">
                  Mr.AjitReddy@Gmail.com
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone className="h-5 w-5 text-cyan-400" />

                <span className="text-slate-400">
                  +91 8328364393
                </span>

              </div>

              <div className="flex items-start gap-3">

                <MapPin className="mt-1 h-5 w-5 text-cyan-400" />

                <span className="text-slate-400">
                  Hyderabad, India
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">

          <span>
            © 2026 DocuMind AI. All rights reserved.
          </span>

          <span>
            Built with Next.js • FastAPI • Gemini AI
          </span>

        </div>

      </div>

    </footer>
  );
}