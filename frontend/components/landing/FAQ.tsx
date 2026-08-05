"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What types of PDF documents does DocuMind AI support?",
    answer:
      "DocuMind AI is designed for invoice PDFs and also works well with many purchase bills, financial documents and multi-page invoice batches.",
  },
  {
    question: "Can it process scanned invoices?",
    answer:
      "Yes. AI analyzes both digital PDFs and most scanned invoice documents. Higher-quality scans generally produce better extraction results.",
  },
  {
    question: "How long does invoice extraction take?",
    answer:
      "Most documents are processed within a few seconds. Large PDF files with many pages may take slightly longer depending on their size.",
  },
  {
    question: "Can I export the extracted data?",
    answer:
      "Yes. Extracted invoice data can be exported directly to Microsoft Excel and CSV for accounting, ERP systems and reporting.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your uploaded documents are processed securely. We recommend avoiding highly confidential documents unless you are using a deployment that meets your organization's security requirements.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No. DocuMind AI runs entirely in your web browser. Simply upload your PDF and begin processing.",
  },
  {
    question: "Can my team use DocuMind AI?",
    answer:
      "Yes. Professional and Enterprise plans are intended for teams that process invoices collaboratively.",
  },
  {
    question: "Do you offer enterprise solutions?",
    answer:
      "Yes. If your organization processes large invoice volumes or requires custom integrations, contact us for an enterprise solution.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-5xl px-6 py-28"
    >
      <div className="text-center">

        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          Frequently Asked Questions
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-white">
          Everything You Need To Know
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-400">
          Have questions? Here are the answers to the most common ones.
        </p>

      </div>

      <div className="mt-16 space-y-5">

        {faqs.map((faq, index) => (

          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >

            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between px-8 py-6 text-left"
            >

              <span className="text-lg font-semibold text-white">
                {faq.question}
              </span>

              {open === index ? (
                <ChevronUp className="text-cyan-400" />
              ) : (
                <ChevronDown className="text-cyan-400" />
              )}

            </button>

            {open === index && (

              <div className="border-t border-slate-800 px-8 py-6">

                <p className="leading-8 text-slate-400">
                  {faq.answer}
                </p>

              </div>

            )}

          </div>

        ))}

      </div>

      <div className="mt-20 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-12 text-center">

        <h3 className="text-3xl font-bold text-white">
          Still have questions?
        </h3>

        <p className="mt-6 text-xl text-slate-300">
          We'd be happy to show you a live demo and discuss how DocuMind AI
          can fit into your workflow.
        </p>

        <a
          href="mailto: Mr.AjitReddy@gmail.com"
          className="mt-8 inline-flex rounded-xl bg-cyan-500 px-8 py-4 text-lg font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-400"
        >
          Contact Our Team
        </a>

      </div>

    </section>
  );
}