"use client";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":              { title: "Overview",      subtitle: "Welcome back — here's what's happening" },
  "/dashboard/payments":     { title: "Payments",      subtitle: "Manage Stripe payments and billing" },
  "/dashboard/transactions": { title: "Transactions",  subtitle: "All account activity" },
  "/dashboard/invoices":     { title: "Invoices",      subtitle: "Track and send invoices" },
  "/dashboard/reports":      { title: "Reports",       subtitle: "Analytics and insights" },
  "/dashboard/settings":     { title: "Settings",      subtitle: "Account and workspace settings" },
};

export default function Topbar() {
  const pathname = usePathname();
  const info = pageTitles[pathname] ?? { title: "Dashboard", subtitle: "" };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white">{info.title}</h1>
        <p className="text-xs text-gray-400 mt-0.5">{info.subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="h-8 px-3 text-xs font-medium bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New payment
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  );
}
