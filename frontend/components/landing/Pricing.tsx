import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for freelancers and small businesses.",
    featured: false,
    button: "Start Free Trial",
    features: [
      "Up to 500 invoices / month",
      "AI Invoice Extraction",
      "Excel Export",
      "CSV Export",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Best for growing businesses and finance teams.",
    featured: true,
    button: "Get Started",
    features: [
      "Unlimited invoices",
      "Multi-page PDF Processing",
      "Invoice Search",
      "Upload History",
      "Priority Support",
      "Future Updates Included",
    ],
  },
  {
    name: "Founder's Lifetime",
    price: "$499",
    period: "one-time",
    description: "Limited launch offer for early adopters.",
    featured: false,
    button: "Contact Sales",
    features: [
      "Lifetime Software Access",
      "12 Months Updates",
      "Priority Support",
      "Commercial Usage",
      "Limited Early Adopter Offer",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      <div className="text-center">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          Pricing
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-white">
          Simple & Transparent Pricing
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-400">
          Choose the plan that fits your business today.
          Upgrade anytime as your invoice volume grows.
        </p>
      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
              plan.featured
                ? "border-cyan-500 bg-slate-900 shadow-2xl shadow-cyan-500/20"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950">
                <div className="flex items-center gap-2">
                  <Star size={16} />
                  Most Popular
                </div>
              </div>
            )}

            <h3 className="text-3xl font-bold text-white">
              {plan.name}
            </h3>

            <p className="mt-4 text-slate-400">
              {plan.description}
            </p>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-6xl font-extrabold text-white">
                {plan.price}
              </span>

              <span className="pb-2 text-slate-400">
                {plan.period}
              </span>
            </div>

            <ul className="mt-10 space-y-4">

              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check className="h-5 w-5 text-cyan-400" />

                  <span className="text-slate-300">
                    {feature}
                  </span>
                </li>
              ))}

            </ul>

            <button
              className={`mt-10 w-full rounded-xl py-4 text-lg font-bold transition ${
                plan.featured
                  ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  : "border border-slate-700 text-white hover:border-cyan-500 hover:bg-slate-800"
              }`}
            >
              {plan.button}
            </button>

          </div>
        ))}

      </div>

      <div className="mt-16 text-center">

        <p className="text-slate-400">
          Need a custom solution for your organization?
        </p>

        <a
          href="mailto:Mr.AjitReddy@Gmail.com"
          className="mt-4 inline-block text-lg font-semibold text-cyan-400 hover:text-cyan-300"
        >
          Contact Sales →
        </a>

      </div>
    </section>
  );
}