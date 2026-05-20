import { DashboardMetrics } from "@/types";

function fmt(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return "$" + (n / 1_000).toFixed(1) + "k";
  return "$" + n.toFixed(0);
}

interface Props { metrics: DashboardMetrics }

export function MetricCards({ metrics }: Props) {
  const cards = [
    { label: "Total Balance",        value: fmt(metrics.totalBalance),   change: metrics.balanceChange,       icon: "💼", bg: "bg-blue-50",   fg: "text-blue-600"   },
    { label: "Revenue (MTD)",        value: fmt(metrics.revenueMTD),     change: metrics.revenueChange,       icon: "📈", bg: "bg-green-50",  fg: "text-green-600"  },
    { label: "Expenses (MTD)",       value: fmt(metrics.expensesMTD),    change: metrics.expensesChange,      icon: "📉", bg: "bg-red-50",    fg: "text-red-500"    },
    { label: "Active Subscriptions", value: metrics.activeSubscriptions.toLocaleString(), change: 2.7, icon: "🔄", bg: "bg-purple-50", fg: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(card => (
        <div key={card.label} className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">{card.label}</span>
            <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center text-base`}>
              {card.icon}
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 leading-none mb-1.5">{card.value}</p>
          <p className={`text-xs font-medium ${card.change >= 0 ? "text-green-600" : "text-red-500"}`}>
            {card.change >= 0 ? "▲" : "▼"} {Math.abs(card.change).toFixed(1)}% vs last month
          </p>
        </div>
      ))}
    </div>
  );
}
