import clsx from "clsx";

interface Props {
  label: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  iconBg: string;
}

export default function MetricCard({ label, value, change, icon, iconBg }: Props) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
        <div className={clsx("w-7 h-7 rounded-lg flex items-center justify-center", iconBg)}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{value}</p>
      {change !== undefined && (
        <p className={clsx("text-xs flex items-center gap-1", isPositive ? "text-green-700" : "text-red-600")}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
          </svg>
          {Math.abs(change).toFixed(1)}% vs last month
        </p>
      )}
    </div>
  );
}
