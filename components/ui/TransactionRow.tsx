import type { Transaction } from "@/types";
import clsx from "clsx";

const categoryColors: Record<string, string> = {
  Stripe: "bg-brand-50 text-brand-500",
  Payroll: "bg-amber-50 text-amber-700",
  Infrastructure: "bg-red-50 text-red-600",
  Software: "bg-purple-50 text-purple-700",
  Marketing: "bg-green-50 text-green-700",
};

export default function TransactionRow({ tx }: { tx: Transaction }) {
  const color = categoryColors[tx.category] ?? "bg-gray-50 text-gray-600";
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <div className={clsx("w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold flex-shrink-0", color)}>
        {tx.category.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{tx.title}</p>
        <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {tx.source}</p>
      </div>
      <div className="text-right">
        <p className={clsx("text-sm font-semibold", tx.type === "credit" ? "text-green-700" : "text-gray-900 dark:text-white")}>
          {tx.type === "credit" ? "+" : "−"}${Math.abs(Number(tx.amount)).toLocaleString()}
        </p>
        <span className={clsx("text-xs px-1.5 py-0.5 rounded-full",
          tx.status === "completed" ? "bg-green-50 text-green-700" :
          tx.status === "pending"   ? "bg-amber-50 text-amber-700" :
                                      "bg-red-50 text-red-600"
        )}>
          {tx.status}
        </span>
      </div>
    </div>
  );
}
