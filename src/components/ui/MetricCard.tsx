export default function MetricCard({ title, value, change }: { title: string; value: string; change: string }) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className={isPositive ? "text-green-500" : "text-red-500"}>{change}</p>
    </div>
  );
}
