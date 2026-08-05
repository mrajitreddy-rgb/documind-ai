import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}

          <div>

            <Link
              href="/"
              className="text-3xl font-extrabold"
            >
              <span className="text-white">DocuMind</span>
              <span className="text-cyan-400"> AI</span>
            </Link>

            <p className="mt-5 text-slate-400 leading-7">
              AI-powered invoice extraction that converts PDF invoices into
              structured Excel and CSV files in seconds.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <a href="#features">
                  Features
                </a>
              </li>

              <li>
                <a href="#pricing">
                  Pricing
                </a>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Product
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/history">
                  Upload History
                </Link>
              </li>

            </ul>

          </div>

          {/* Legal */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Legal
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/refund">
                  Refund Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* Contact */}

        <div className="mt-16 border-t border-slate-800 pt-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="space-y-3">

              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={18} />
                <span>Mr.AjitReddy@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={18} />
                <span>India</span>
              </div>

            </div>

            <div className="text-sm text-slate-500">

              © 2026 DocuMind AI. All rights reserved.

              <div className="mt-2">
                Built with ❤️ in India
              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}