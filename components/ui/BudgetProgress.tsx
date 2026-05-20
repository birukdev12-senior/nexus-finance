interface Budget {
  name:  string;
  spent: number;
  total: number;
  color: string;
}

interface Props { budgets: Budget[] }

export function BudgetProgress({ budgets }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Budget usage</h2>
        <span className="text-xs text-gray-400">
          {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
      </div>

      <div className="space-y-3.5">
        {budgets.map(b => {
          const pct = Math.min(100, (b.spent / b.total) * 100);
          return (
            <div key={b.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">{b.name}</span>
                <span className="text-xs font-medium text-gray-700">
                  ${b.spent.toLocaleString()} / ${(b.total / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct.toFixed(1)}%`, background: b.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
