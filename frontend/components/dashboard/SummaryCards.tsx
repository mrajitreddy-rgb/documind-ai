interface SummaryCardsProps {
  invoiceCount: number;
  totalAmount: number;
  uniqueDealers: number;
  uniqueCustomers: number;
}

export default function SummaryCards({
  invoiceCount,
  totalAmount,
  uniqueDealers,
  uniqueCustomers,
}: SummaryCardsProps) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl bg-slate-800 p-6 text-center shadow-lg">
        <h4 className="text-lg font-semibold text-cyan-400">
          📄 Invoices
        </h4>

        <p className="mt-3 text-4xl font-bold text-white">
          {invoiceCount}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-6 text-center shadow-lg">
        <h4 className="text-lg font-semibold text-green-400">
          💰 Total Value
        </h4>

        <p className="mt-3 text-3xl font-bold text-white">
          ₹ {totalAmount.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-6 text-center shadow-lg">
        <h4 className="text-lg font-semibold text-yellow-400">
          🏢 Dealers
        </h4>

        <p className="mt-3 text-4xl font-bold text-white">
          {uniqueDealers}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-6 text-center shadow-lg">
        <h4 className="text-lg font-semibold text-purple-400">
          👥 Customers
        </h4>

        <p className="mt-3 text-4xl font-bold text-white">
          {uniqueCustomers}
        </p>
      </div>
    </div>
  );
}