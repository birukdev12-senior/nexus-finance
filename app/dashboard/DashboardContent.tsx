import MetricCard from "@/components/ui/MetricCard";
import RevenueChart from "@/components/charts/RevenueChart";
import SpendingDonut from "@/components/charts/SpendingDonut";
import TransactionRow from "@/components/ui/TransactionRow";
import type { DashboardMetrics, MonthlyData, Transaction } from "@/types";

// Static fallback data for demo / before MongoDB is seeded
const MOCK_METRICS: DashboardMetrics = {
  totalBalance: 284712, revenueMTD: 97440, expensesMTD: 34280,
  activeSubscriptions: 1284, revenueChange: 8.1, expensesChange: 3.2, balanceChange: 12.4,
};

const MOCK_MONTHLY: MonthlyData[] = [
  { month: "Dec", revenue: 58000, expenses: 28000, profit: 30000 },
  { month: "Jan", revenue: 62000, expenses: 31000, profit: 31000 },
  { month: "Feb", revenue: 71000, expenses: 34000, profit: 37000 },
  { month: "Mar", revenue: 84000, expenses: 38000, profit: 46000 },
  { month: "Apr", revenue: 91000, expenses: 33000, profit: 58000 },
  { month: "May", revenue: 97440, expenses: 34280, profit: 63160 },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { _id: "1", userId: "u1", title: "Acme Corp — Invoice #1042", amount: 12500, type: "credit", category: "Stripe",         date: new Date("2026-05-18"), status: "completed", source: "Stripe" },
  { _id: "2", userId: "u1", title: "Vercel Pro subscription",   amount: 240,   type: "debit",  category: "Software",       date: new Date("2026-05-17"), status: "completed", source: "Card ····4821" },
  { _id: "3", userId: "u1", title: "Payroll — May 15",          amount: 28400, type: "debit",  category: "Payroll",        date: new Date("2026-05-15"), status: "completed", source: "ACH" },
  { _id: "4", userId: "u1", title: "Beta Industries — Sub",     amount: 4200,  type: "credit", category: "Stripe",         date: new Date("2026-05-14"), status: "completed", source: "Stripe" },
  { _id: "5", userId: "u1", title: "AWS — Cloud services",      amount: 3980,  type: "debit",  category: "Infrastructure", date: new Date("2026-05-13"), status: "completed", source: "Card ····9903" },
  { _id: "6", userId: "u1", title: "Globex LLC — Milestone",    amount: 22000, type: "credit", category: "Stripe",         date: new Date("2026-05-12"), status: "completed", source: "Wire" },
];

const SPENDING = [
  { name: "Software & Tools", amount: 11655,  percentage: 34 },
  { name: "Payroll",          amount: 9597,   percentage: 28 },
  { name: "Marketing",        amount: 6170,   percentage: 18 },
  { name: "Other",            amount: 6858,   percentage: 20 },
];

const BUDGET = [
  { name: "Marketing",      spent: 8400,  budget: 12000, color: "bg-brand-500" },
  { name: "Engineering",    spent: 21000, budget: 25000, color: "bg-purple-500" },
  { name: "Operations",     spent: 4800,  budget: 8000,  color: "bg-green-600" },
  { name: "Infrastructure", spent: 3980,  budget: 4000,  color: "bg-red-500" },
];

async function fetchDashboardData() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/dashboard`, { next: { revalidate: 60 }, cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    return res.json();
  } catch {
    return { metrics: MOCK_METRICS, monthlyData: MOCK_MONTHLY, stripeBalance: { available: 42881.5, pending: 8240 } };
  }
}

export default async function DashboardContent() {
  const { metrics, monthlyData, stripeBalance } = await fetchDashboardData();

  const metricCards = [
    { label: "Total Balance",         value: `$${metrics.totalBalance.toLocaleString()}`,  change: metrics.balanceChange, iconBg: "bg-brand-50",   icon: <WalletIcon /> },
    { label: "Revenue (MTD)",         value: `$${metrics.revenueMTD.toLocaleString()}`,    change: metrics.revenueChange,  iconBg: "bg-green-50",   icon: <TrendUpIcon /> },
    { label: "Expenses (MTD)",        value: `$${metrics.expensesMTD.toLocaleString()}`,   change: metrics.expensesChange, iconBg: "bg-red-50",     icon: <TrendDownIcon /> },
    { label: "Active Subscriptions",  value: metrics.activeSubscriptions.toLocaleString(), change: undefined,              iconBg: "bg-purple-50",  icon: <RepeatIcon /> },
  ];

  return (
    <div className="space-y-5">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(c => <MetricCard key={c.label} {...c} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue vs Expenses</h2>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-brand-500 inline-block" />Revenue</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500 inline-block" />Expenses</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-600 inline-block" />Profit</span>
            </div>
          </div>
          <RevenueChart data={monthlyData} />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending by category</h2>
          <SpendingDonut data={SPENDING} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Stripe + budget */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stripe card */}
          <div className="bg-brand-500 rounded-xl p-5 text-white relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
            <div className="absolute -bottom-4 right-4 w-16 h-16 rounded-full bg-white/5" />
            <p className="text-xs text-white/60 mb-1">Stripe balance</p>
            <p className="text-2xl font-semibold mb-4">${stripeBalance.available.toLocaleString()}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-white/60">Pending</p>
                <p className="text-sm font-semibold">${stripeBalance.pending.toLocaleString()}</p>
              </div>
              <span className="text-xs bg-white/15 px-2 py-1 rounded-full">Live mode</span>
            </div>
          </div>

          {/* Budget usage */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Budget usage</h2>
            <div className="space-y-3">
              {BUDGET.map(b => (
                <div key={b.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500 dark:text-gray-400">{b.name}</span>
                    <span className="font-medium text-gray-900 dark:text-white">${b.spent.toLocaleString()} / ${(b.budget / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: `${(b.spent / b.budget) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent transactions</h2>
            <a href="/dashboard/transactions" className="text-xs text-brand-500 hover:underline">View all</a>
          </div>
          <div>
            {MOCK_TRANSACTIONS.map(tx => <TransactionRow key={tx._id} tx={tx} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline SVG icon components
function WalletIcon() {
  return <svg className="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
}
function TrendUpIcon() {
  return <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
}
function TrendDownIcon() {
  return <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>;
}
function RepeatIcon() {
  return <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
}
