import clsx from "clsx";

interface Tx {
  _id: string;
  title: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  date: Date | string;
  status: string;
  source: string;
}

interface Props { transactions: Tx[] }

const categoryIcon: Record<string, string> = {
  Revenue: "🏢", Subscription: "🔄", Payroll: "👥",
  Software: "💻", Infrastructure: "☁️", Marketing: "📣",
};

export function RecentTxTable({ transactions }: Props) {
  if (!transactions.length) {
    return <p className="text-sm text-gray-400 py-4 text-center">No transactions yet.</p>;
  }

  return (
    <div>
      <div className="flex gap-4 border-b border-gray-100 mb-3 text-xs text-gray-500">
        {["All","Income","Expenses","Pending"].map((t, i) => (
          <button key={t} className={clsx("pb-2 border-b-2 transition-colors", i === 0 ? "border-brand-500 text-brand-500 font-medium" : "border-transparent hover:text-gray-700")}>
            {t}
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-50">
        {transactions.map(tx => (
          <div key={tx._id?.toString()} className="flex items-center gap-3 py-2.5">
            <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0",
              tx.type === "credit" ? "bg-green-50" : "bg-gray-50")}>
              {categoryIcon[tx.category] ?? "💰"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{tx.title}</p>
              <p className="text-[11px] text-gray-400">
                {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                {" · "}
                <span className="capitalize">{tx.source}</span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className={clsx("text-xs font-semibold", tx.type === "credit" ? "text-green-600" : "text-gray-700")}>
                {tx.type === "credit" ? "+" : "−"}${tx.amount.toLocaleString()}
              </p>
              <span className={clsx("text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                tx.status === "completed" ? "bg-green-50 text-green-600" :
                tx.status === "pending"   ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-500")}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
